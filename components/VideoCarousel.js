'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './VideoCarousel.module.css';
import dynamic from 'next/dynamic';

const LazyVideo = dynamic(() => import('./LazyVideo'), { ssr: false });

const GridItem = ({ videoSrc, index, isActive, shouldPreload, onMouseEnter, onMouseLeave }) => {
    const videoRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!videoRef.current) return;

        // Clear any pending play timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (isActive) {
            // Stagger playback to prevent main thread freezing
            // 30ms delay per item = ~750ms for 25 items
            timeoutRef.current = setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play().catch(() => { });
                }
            }, index * 30);
        } else {
            videoRef.current.pause();
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isActive, index]);

    return (
        <div
            className={styles.gridItem}
            onMouseEnter={(e) => onMouseEnter(videoSrc, index, e)}
            onMouseLeave={onMouseLeave}
        >
            <video
                ref={videoRef}
                src={videoSrc}
                loop
                muted
                playsInline
                preload={shouldPreload ? "auto" : "none"}
            />
            {/* Preload action curve for this video */}
            <video
                src={`action_curves/${videoSrc}`}
                className={styles.hiddenPreload}
                preload={shouldPreload ? "auto" : "none"}
                muted
                playsInline
            />
        </div>
    );
};

export default function VideoCarousel({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredVideo, setHoveredVideo] = useState(null); // { src, rect, index }
    const [portalContainer, setPortalContainer] = useState(null);
    const [backgroundLoad, setBackgroundLoad] = useState(false);

    useEffect(() => {
        setPortalContainer(document.body);

        // Delay background loading to allow initial render to be smooth
        const timer = setTimeout(() => {
            setBackgroundLoad(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleMouseEnter = (videoSrc, index, e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        // Capture specific frame to prevent white/invisible flash
        let placeholder = null;
        const videoElement = e.currentTarget.querySelector('video');
        if (videoElement) {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                placeholder = canvas.toDataURL();
            } catch (error) {
                console.error('Error generating placeholder:', error);
            }
        }

        setHoveredVideo({
            src: videoSrc,
            rect,
            index,
            placeholder,
            startTime: videoElement ? videoElement.currentTime : 0
        });
    };

    const handleMouseLeave = () => {
        setHoveredVideo(null);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    return (
        <div className={styles.carouselContainer}>


            <div className={styles.slideContainer} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} className={styles.slide}>
                        <div className={styles.gridContainer}>
                            {slide.videos.map((videoSrc, vidIndex) => {
                                // Optimization: Always render but only play current slide
                                const isActive = slideIndex === currentIndex;
                                // Load if active slide OR if background loading is enabled
                                const shouldPreload = isActive || backgroundLoad;

                                return (
                                    <GridItem
                                        key={vidIndex}
                                        videoSrc={videoSrc}
                                        index={vidIndex}
                                        isActive={isActive}
                                        shouldPreload={shouldPreload}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>


            {/* Grid Overlay to focus on expanded video */}
            <div
                className={`${styles.gridOverlay} ${hoveredVideo ? styles.gridOverlayVisible : ''}`}
            />

            {/* Portal for the popped-out video */}
            {hoveredVideo && portalContainer && createPortal(
                <div
                    key={hoveredVideo.src}
                    className={styles.overlay}
                    style={{
                        top: hoveredVideo.rect.top,
                        left: hoveredVideo.rect.left,
                        width: hoveredVideo.rect.width,
                        // Remove fixed height to allow expansion for action curve
                        height: 'auto',
                        minHeight: hoveredVideo.rect.height,
                        backgroundImage: hoveredVideo.placeholder ? `url(${hoveredVideo.placeholder})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: 'black',
                    }}
                >
                    <div className={styles.overlayContent}>
                        <video
                            className={styles.robotVideo}
                            src={hoveredVideo.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            onLoadedMetadata={(e) => {
                                if (hoveredVideo.startTime) {
                                    e.currentTarget.currentTime = hoveredVideo.startTime;
                                }
                            }}
                            onTimeUpdate={(e) => {
                                const actionVideo = e.currentTarget.parentElement.querySelector(`.${styles.actionCurveVideo}`);
                                if (actionVideo && Math.abs(actionVideo.currentTime - e.currentTarget.currentTime) > 0.1) {
                                    actionVideo.currentTime = e.currentTarget.currentTime;
                                }
                            }}
                        />
                        <video
                            className={styles.actionCurveVideo}
                            src={`action_curves/${hoveredVideo.src}`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            onLoadedMetadata={(e) => {
                                if (hoveredVideo.startTime) {
                                    e.currentTarget.currentTime = hoveredVideo.startTime;
                                }
                            }}
                        />
                    </div>
                </div>,
                portalContainer
            )}

            <div className={styles.controls}>
                <button className={styles.navButton} onClick={prevSlide} aria-label="Previous Video">
                    <svg viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                </button>
                <button className={styles.navButton} onClick={nextSlide} aria-label="Next Video">
                    <svg viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                </button>
            </div>
        </div >
    );
}
