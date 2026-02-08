import { useState, useEffect, useRef } from 'react';
import styles from '../app/page.module.css';

const LazyVideo = ({ src, title, defaultVolume, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);
  const videoElementRef = useRef(null);
  const playerRef = useRef(null);
  const hlsRef = useRef(null);

  // Helper function to check if the source is an HLS stream
  const isHlsSource = (src) => {
    return typeof src === 'string' && (src.endsWith('.m3u8') || src.includes('m3u8'));
  };

  useEffect(() => {
    // Import Plyr dynamically only on the client side
    import('plyr').then(({ default: Plyr }) => {
      // Create intersection observer on client side
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(videoRef.current);
          }
        },
        { threshold: 0.1 } // Start loading when 10% of the element is visible
      );

      if (videoRef.current) {
        observer.observe(videoRef.current);
      }

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }

        // Destroy Plyr instance on unmount
        if (playerRef.current) {
          playerRef.current.destroy();
        }

        // Destroy HLS instance if it exists
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }
      };
    });
  }, []);

  // Auto-play video when it becomes visible or when src changes
  useEffect(() => {
    if (!isVisible || !videoElementRef.current || typeof window === 'undefined') return;

    // Clean up previous HLS instance before setting up new one
    // This is critical when src changes to prevent race conditions
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Reset loading state when src changes
    setIsLoading(true);

    // Track if this effect is still current (not stale from rapid changes)
    let isCurrent = true;

    const setupVideo = async () => {
      // Check if effect was cancelled during async operations
      if (!isCurrent || !videoElementRef.current) return;

      // First check if we need to use HLS.js
      if (isHlsSource(src)) {
        try {
          // Import HLS.js
          const Hls = (await import('hls.js')).default;

          // Check again after async import
          if (!isCurrent || !videoElementRef.current) return;

          if (Hls.isSupported()) {
            const hls = new Hls({
              maxBufferLength: 30,
              maxMaxBufferLength: 60,
              startLevel: -1, // Auto quality selection
              debug: false
            });

            hls.loadSource(src);
            hls.attachMedia(videoElementRef.current);

            // Store the HLS instance for cleanup
            hlsRef.current = hls;

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log('HLS manifest loaded, levels available:', hls.levels.length);
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
              if (data.fatal) {
                console.error('HLS error:', data);
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    console.log('HLS network error - trying to recover...');
                    hls.startLoad();
                    break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    console.log('HLS media error - trying to recover...');
                    hls.recoverMediaError();
                    break;
                  default:
                    console.error('Fatal HLS error, cannot recover');
                    hls.destroy();
                    break;
                }
              }
            });
          } else if (videoElementRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            // For Safari which has built-in HLS support
            videoElementRef.current.src = src;
          }
        } catch (error) {
          console.error('Error initializing HLS:', error);
          // Fallback to regular video source
          if (videoElementRef.current) {
            videoElementRef.current.src = src;
          }
        }
      } else {
        // Regular video source
        if (videoElementRef.current) {
          videoElementRef.current.src = src;
        }
      }

      // Check if effect was cancelled
      if (!isCurrent || !videoElementRef.current) return;

      // If Plyr is already set up, just reload the video
      if (playerRef.current) {
        try {
          videoElementRef.current.load();
          videoElementRef.current.muted = true;
          setIsLoading(false);
          const playPromise = videoElementRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log('Auto-play prevented:', error);
            });
          }
        } catch (e) {
          console.log('Error reloading video:', e);
        }
        return;
      }

      // Continue with Plyr setup (first time only)
      const { default: Plyr } = await import('plyr');
      // Also import the CSS
      await import('plyr/dist/plyr.css');

      // Check again after async imports
      if (!isCurrent || !videoElementRef.current) return;

      playerRef.current = new Plyr(videoElementRef.current, {
        controls: [
          'play-large', // The large play button in the center
          'play', // Play/pause button
          'progress', // The progress bar
          'current-time', // The current time
          'mute', // Toggle mute button
          'volume', // Volume control
          'fullscreen', // Fullscreen button
        ],
        hideControls: true, // Hide controls when playing
        resetOnEnd: false,
        autoplay: true,
        muted: true,
        loop: { active: true },
        storage: { enabled: false }, // Don't store user preferences
        invertTime: false,
        fullscreen: { enabled: true, fallback: true, iosNative: true },
        disableContextMenu: false,
        blankVideo: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        loadSprite: true,
        iconUrl: 'https://cdn.plyr.io/3.7.8/plyr.svg',
        tooltips: { controls: true, seek: true },
        i18n: {
          restart: 'Restart',
          play: 'Play',
          pause: 'Pause',
          seekLabel: 'Seek',
          played: 'Played',
          buffered: 'Buffered',
          currentTime: 'Current time',
          duration: 'Duration',
          volume: 'Volume',
          mute: 'Mute',
          unmute: 'Unmute',
          enableCaptions: 'Enable captions',
          disableCaptions: 'Disable captions',
          enterFullscreen: 'Enter fullscreen',
          exitFullscreen: 'Exit fullscreen',
        }
      });

      // Set custom volume if specified
      if (playerRef.current && defaultVolume <= 1.0) {
        playerRef.current.volume = defaultVolume;
        // Also set it directly on the video element
        if (videoElementRef.current) {
          videoElementRef.current.volume = defaultVolume;
        }
      }

      // Check video element is still valid
      if (!videoElementRef.current) return;

      // Set muted to true to enable autoplay on most browsers
      videoElementRef.current.muted = true;

      // Handle video loading state
      videoElementRef.current.addEventListener('loadeddata', () => {
        if (isCurrent) {
          setIsLoading(false);
        }
      });

      // Start playing the video
      const playPromise = videoElementRef.current.play();

      // Handle potential play failures (like if user hasn't interacted with the page yet)
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Auto-play prevented:', error);
          // Video auto-play was prevented, we'll leave controls visible for user to play manually
        });
      }
    };

    setupVideo();

    // Cleanup function - runs when src changes or component unmounts
    return () => {
      isCurrent = false;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isVisible, src]);

  return (
    <div className={`${styles.videoWrapper} ${styles.customPlayer}`} ref={videoRef}>
      {isVisible ? (
        <>
          {/* Note: No src attribute here, as it will be set via HLS.js if needed */}
          <video
            ref={videoElementRef}
            title={title}
            playsInline
            className={`${props.className || ''} ${styles.plyrVideo}`}
            data-poster=""
          />
          {isLoading && (
            <div className={styles.videoLoading}>
              <div className={styles.spinner}></div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.videoPlaceholder}>
          <div className={styles.loadingText}>Loading video...</div>
        </div>
      )}
    </div>
  );
};

export default LazyVideo;
