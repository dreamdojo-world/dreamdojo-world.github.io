'use client';

import Script from 'next/script';
import styles from './page.module.css';
import dynamic from 'next/dynamic';

const LazyVideo = dynamic(() => import('../components/LazyVideo'), { ssr: false });
const VideoCarousel = dynamic(() => import('../components/VideoCarousel'), { ssr: false });

export default function FirstPost() {
  return (
    <>

      {/* Google Analytics - properly implemented with next/script */}
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-FNGN5K40RL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FNGN5K40RL');
        `}
      </Script>

      <article className={styles.blogPost}>
        <div className={styles.center}>
          <h1 className={styles.blogTitle}>
            <br />
            <span className={styles.dreamTitle}>DreamDojo</span>
            <br />
            <span className={styles.subtitleText}>A Generalist Robot World Model from Large-Scale Human Videos</span>
            <br />
            <span className={styles.subtitle}>
              <div className={styles.authors}>
                <div className={styles.authorList}>
                  <span className={styles.authorName}><a href='https://github.com/Little-Podi' className={styles.authorLink}>Shenyuan Gao</a><sup>12†</sup></span>
                  <span className={styles.authorName}><a href='https://willjhliang.github.io/' className={styles.authorLink}>William Liang</a><sup>13†</sup></span>
                  <span className={styles.authorName}><a href='https://www.linkedin.com/in/kaiyuan-zheng-94984a236/' className={styles.authorLink}>Kaiyuan Zheng</a><sup>14*</sup></span>
                  <span className={styles.authorName}><a href='https://www.linkedin.com/in/ayaannaveedmalik/' className={styles.authorLink}>Ayaan Malik</a><sup>15*</sup></span>
                  <span className={styles.authorName}><a href='https://seonghyeonye.github.io/' className={styles.authorLink}>Seonghyeon Ye</a><sup>16</sup></span>
                  <span className={styles.authorName}><a href='https://sihyun.me/' className={styles.authorLink}>Sihyun Yu</a><sup>6</sup></span>
                  <span className={styles.authorName}><a href='https://weichengtseng.github.io/' className={styles.authorLink}>Wei-Cheng Tseng</a><sup>17</sup></span>
                  <span className={styles.authorName}><a href='https://www.linkedin.com/in/yuzhudong/' className={styles.authorLink}>Yuzhu Dong</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://kaichun-mo.github.io/' className={styles.authorLink}>Kaichun Mo</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://chenhsuanlin.bitbucket.io/' className={styles.authorLink}>Chen-Hsuan Lin</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://qianlim.github.io/' className={styles.authorLink}>Qianli Ma</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://seungjunnah.github.io/' className={styles.authorLink}>Seungjun Nah</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://scholar.google.com/citations?user=Ui3eovkAAAAJ&hl=en' className={styles.authorLink}>Loic Magne</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://szxiangjn.github.io/' className={styles.authorLink}>Jiannan Xiang</a><sup>18</sup></span>
                  <span className={styles.authorName}><a href='https://xieleo5.github.io/' className={styles.authorLink}>Yuqi Xie</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://ruijiezheng.com/' className={styles.authorLink}>Ruijie Zheng</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://dantong88.github.io/' className={styles.authorLink}>Dantong Niu</a><sup>13</sup></span>
                  <span className={styles.authorName}><a href='https://youliangtan.github.io/' className={styles.authorLink}>You Liang Tan</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://zentner.io/' className={styles.authorLink}>KR Zentner</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://www.linkedin.com/in/george-kurian-567810a/' className={styles.authorLink}>George Kurian</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://www.linkedin.com/in/suneel-indupuru-13b787/' className={styles.authorLink}>Suneel Indupuru</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://www.linkedin.com/in/pooyaj/' className={styles.authorLink}>Pooya Jannaty</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://www.gujinwei.org/' className={styles.authorLink}>Jinwei Gu</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://eejzhang.people.ust.hk/' className={styles.authorLink}>Jun Zhang</a><sup>2</sup></span>
                  <span className={styles.authorName}><a href='https://people.eecs.berkeley.edu/~malik/' className={styles.authorLink}>Jitendra Malik</a><sup>3</sup></span>
                  <span className={styles.authorName}><a href='https://people.eecs.berkeley.edu/~pabbeel/' className={styles.authorLink}>Pieter Abbeel</a><sup>3</sup></span>
                  <span className={styles.authorName}><a href='https://mingyuliu.net/' className={styles.authorLink}>Ming-Yu Liu</a><sup>1</sup></span>
                  <span className={styles.authorName}><a href='https://yukezhu.me/' className={styles.authorLink}>Yuke Zhu</a><sup>19‡</sup></span>
                  <span className={styles.authorName}><a href='https://joeljang.github.io/' className={styles.authorLink}>Joel Jang</a><sup>1‡</sup></span>
                  <span className={styles.authorName}><a href='https://jimfan.me/' className={styles.authorLink}>Linxi "Jim" Fan</a><sup>1‡</sup></span>
                </div>

                <div className={styles.affiliationContainer}>
                  <span className={styles.affiliationItem}><span className={styles.affiliationNumber}>1</span><span className={styles.affiliationName}>NVIDIA</span></span>
                  <span className={styles.affiliationItem}><span className={styles.affiliationNumber}>2</span>HKUST</span>
                  <span className={styles.affiliationItem}><span className={styles.affiliationNumber}>3</span>UC Berkeley</span>
                  <span className={styles.affiliationItem}><span className={styles.affiliationNumber}>4</span>UW</span>
                  <span className={styles.affiliationItem}><span className={styles.affiliationNumber}>5</span>Stanford</span>
                  <span className={styles.affiliationItem}><span className={styles.affiliationNumber}>6</span>KAIST</span>
                  <span className={styles.affiliationItem}><span className={styles.affiliationNumber}>7</span>UofT</span>
                  <span className={styles.affiliationItem}><span className={styles.affiliationNumber}>8</span>UCSD</span>
                  <span className={styles.affiliationItem}><span className={styles.affiliationNumber}>9</span>UT Austin</span>
                </div>

                <div className={styles.authorNote}>
                  <sup>†</sup>Co-First Authors &nbsp;&nbsp; <sup>*</sup>Core Contributors &nbsp;&nbsp; <sup>‡</sup>Project Leads
                </div>
              </div>
            </span>
          </h1>

          <div className={styles.linkContainer}>
            <a href="https://arxiv.org/abs/2602.06949" className={`${styles.textLink} ${styles.borderedLink}`} target="_blank" rel="noopener noreferrer">
              Paper
            </a>
            <span className={styles.linkDivider}>•</span>
            <a href="https://dreamdojo-world.github.io/#" className={`${styles.textLink} ${styles.borderedLink}`} target="_blank" rel="noopener noreferrer">
              Code (Coming Soon!)
            </a>
            <span className={styles.linkDivider}>•</span>
            <a href="https://dreamdojo-world.github.io/#" className={`${styles.textLink} ${styles.borderedLink}`} target="_blank" rel="noopener noreferrer">
              Thread
            </a>
          </div>
        </div>

        <div className={styles.blogContent}>
          <div className={styles.videoContainer}>
            <LazyVideo
              src={"dreamdojo_demo.mp4"}
              title="Example Video"
              className={styles.videoElement}
              defaultVolume={1.0}
              controls
            />
          </div>

          <h2>Highlights</h2>
          <ol className={styles.highlightsList}>
            <li>
              <span className={styles.highlightTitle}>A large-scale video dataset.</span> 44k hours of diverse human egocentric videos, the largest dataset to date for world model pretraining.
            </li>
            <li>
              <span className={styles.highlightTitle}>A foundation world model.</span> The first robot world model of its kind that demonstrates strong generalization to diverse objects and environments after post-training.
            </li>
            <li>
              <span className={styles.highlightTitle}>A distillation pipeline.</span> After distillation, our model can achieve long-horizon autoregressive generation, with stable real-time interactions at 10 FPS for over 1 minute.
            </li>
          </ol>

          <h2>Method</h2>
          <div className={styles.imageWrapper}>
            <img
              src="overview.png"
              alt="DreamDojo Overview"
              className={styles.projectImage}
            />
          </div>
          <p className={styles.caption}>
            <span className={styles.captionTitle}>Method Overview.</span> DreamDojo acquires comprehensive physical knowledge from large-scale human datasets by pre-training with latent actions, followed by post-training on the target embodiment with continuous robot actions.
          </p>
          <div className={styles.imageWrapper}>
            <img
              src="hv.png"
              alt="DreamDojo-HV Dataset Stats"
              className={styles.projectImage}
            />
          </div>
          <p className={styles.caption}>
            <span className={styles.captionTitle}>DreamDojo-HV Dataset.</span> Our dataset excels in both scale and diversity, encompassing 15x longer duration, 96x more skills, and 2,000x more scenes than the previously largest dataset for world model training.
          </p>

          <h2>Object and Environment Generalization</h2>
          <div className={styles.videoContainer}>
            <VideoCarousel
              slides={[
                {
                  label: "GR-1",
                  videos: [
                    'gr1/gr1_0055_pred.mp4',
                    'gr1/gr1_0071_pred2.mp4',
                    'gr1/gr1_0021_pred.mp4',
                    'gr1/gr1_0008_pred.mp4',
                    'gr1/gr1_0020_pred.mp4',
                    'gr1/gr1_0047_pred.mp4',
                    'gr1/gr1_0078_pred.mp4',
                    'gr1/gr1_0019_pred.mp4',
                    'gr1/gr1_0071_pred.mp4',
                    'gr1/gr1_0043_pred.mp4',
                    'gr1/gr1_0015_pred.mp4',
                    'gr1/gr1_0072_pred.mp4',
                    'gr1/gr1_0046_pred2.mp4',
                    'gr1/gr1_0052_pred.mp4',
                    'gr1/gr1_0040_pred.mp4',
                    'gr1/gr1_0046_pred.mp4',
                    'gr1/gr1_0009_pred.mp4',
                    'gr1/gr1_0007_pred.mp4',
                    'gr1/gr1_0094_pred.mp4',
                    'gr1/gr1_0006_pred.mp4',
                    'gr1/gr1_0097_pred.mp4',
                    'gr1/gr1_0001_pred.mp4',
                    'gr1/gr1_0090_pred.mp4',
                    'gr1/gr1_0066_pred.mp4',
                    'gr1/gr1_0091_pred.mp4'
                  ]
                },
                {
                  label: "G1",
                  videos: [
                    'g1/g1_0044_pred.mp4',
                    'g1/g1_0063_pred2.mp4',
                    'g1/g1_0076_pred.mp4',
                    'g1/g1_0083_pred.mp4',
                    'g1/g1_0026_pred.mp4',
                    'g1/g1_0010_pred.mp4',
                    'g1/g1_0054_pred.mp4',
                    'g1/g1_0069_pred.mp4',
                    'g1/g1_0003_pred.mp4',
                    'g1/g1_0071_pred.mp4',
                    'g1/g1_0014_pred.mp4',
                    'g1/g1_0088_pred.mp4',
                    'g1/g1_0062_pred.mp4',
                    'g1/g1_0015_pred.mp4',
                    'g1/g1_0074_pred.mp4',
                    'g1/g1_0051_pred.mp4',
                    'g1/g1_0068_pred.mp4',
                    'g1/g1_0056_pred.mp4',
                    'g1/g1_0024_pred.mp4',
                    'g1/g1_0090_pred.mp4',
                    'g1/g1_0089_pred.mp4',
                    'g1/g1_0059_pred.mp4',
                    'g1/g1_0047_pred.mp4',
                    'g1/g1_0019_pred.mp4',
                    'g1/g1_0065_pred.mp4'
                  ]
                },
                {
                  label: "AgiBot",
                  videos: [
                    'agibot/agibot_0008_pred.mp4',
                    'agibot/agibot_0279_pred.mp4',
                    'agibot/agibot_0085_pred.mp4',
                    'agibot/agibot_0199_pred.mp4',
                    'agibot/agibot_0262_pred.mp4',
                    'agibot/agibot_0292_pred.mp4',
                    'agibot/agibot_0073_pred.mp4',
                    'agibot/agibot_0297_pred.mp4',
                    'agibot/agibot_0264_pred.mp4',
                    'agibot/agibot_0097_pred.mp4',
                    'agibot/agibot_0270_pred.mp4',
                    'agibot/agibot_0205_pred.mp4',
                    'agibot/agibot_0099_pred.mp4',
                    'agibot/agibot_0229_pred.mp4',
                    'agibot/agibot_0273_pred.mp4',
                    'agibot/agibot_0025_pred.mp4',
                    'agibot/agibot_0222_pred.mp4',
                    'agibot/agibot_0088_pred.mp4',
                    'agibot/agibot_0078_pred.mp4',
                    'agibot/agibot_0267_pred.mp4',
                    'agibot/agibot_0210_pred.mp4',
                    'agibot/agibot_0266_pred.mp4',
                    'agibot/agibot_0011_pred.mp4',
                    'agibot/agibot_0066_pred.mp4',
                    'agibot/agibot_0090_pred.mp4'
                  ]
                },
                {
                  label: "YAM",
                  videos: [
                    'yam/yam_0103_pred.mp4',
                    'yam/yam_0024_pred.mp4',
                    'yam/yam_0016_pred.mp4',
                    'yam/yam_0033_pred.mp4',
                    'yam/yam_0053_pred.mp4',
                    'yam/yam_0107_pred.mp4',
                    'yam/yam_0087_pred.mp4',
                    'yam/yam_0014_pred.mp4',
                    'yam/yam_0072_pred.mp4',
                    'yam/yam_0025_pred.mp4',
                    'yam/yam_0094_pred.mp4',
                    'yam/yam_0265_pred.mp4',
                    'yam/yam_0005_pred.mp4',
                    'yam/yam_0083_pred.mp4',
                    'yam/yam_0065_pred.mp4',
                    'yam/yam_0031_pred.mp4',
                    'yam/yam_0180_pred.mp4',
                    'yam/yam_0044_pred.mp4',
                    'yam/yam_0181_pred.mp4',
                    'yam/yam_0169_pred.mp4',
                    'yam/yam_0032_pred.mp4',
                    'yam/yam_0063_pred.mp4',
                    'yam/yam_0047_pred.mp4',
                    'yam/yam_0074_pred.mp4',
                    'yam/yam_0026_pred.mp4'
                  ]
                }
              ]}
            />
          </div>
          <p className={styles.caption}>
            <span className={styles.captionTitle}>Diverse Environments and Objects.</span> DreamDojo produces realistic action-conditioned rollouts for the GR-1, G1, AgiBot, and YAM across a wide range of environments and object interactions. Videos generated by the post-trained model.
          </p>

          <div className={styles.videoGrid}>
            <LazyVideo
              src={"baseline/1.mp4"}
              title="Baseline Video 1"
              className={styles.videoElement}
              defaultVolume={0.0}
              controls={false}
              muted
              autoPlay
              loop
            />
            <LazyVideo
              src={"baseline/2.mp4"}
              title="Baseline Video 2"
              className={styles.videoElement}
              defaultVolume={0.0}
              controls={false}
              muted
              autoPlay
              loop
            />
            <LazyVideo
              src={"baseline/3.mp4"}
              title="Baseline Video 3"
              className={styles.videoElement}
              defaultVolume={0.0}
              controls={false}
              muted
              autoPlay
              loop
            />
            <LazyVideo
              src={"baseline/4.mp4"}
              title="Baseline Video 4"
              className={styles.videoElement}
              defaultVolume={0.0}
              controls={false}
              muted
              autoPlay
              loop
            />
          </div>
          <p className={styles.caption}>
            <span className={styles.captionTitle}> Baseline vs DreamDojo Comparison.</span> DreamDojo generates more accurate physical interactions due to its large-scale human data pretraining. We compare post-trained Cosmos-Predict 2.5 (left) with post-trained DreamDojo (right).
          </p>

          <h2>Real-Time Long-Horizon Rollouts</h2>
          <div className={styles.videoContainer}>
            <LazyVideo
              src={"real_time.mp4"}
              title="Example Video"
              className={styles.videoElement}
              defaultVolume={1.0}
              controls
            />
          </div>
          <p className={styles.caption}>
            <span className={styles.captionTitle}>Teacher vs Student Comparison.</span> DreamDojo reaches real-time 10 FPS generation through autoregressive few-step distillation. We evaluate on 1-minute long rollouts and compare speeds before (left) and after (right) distillation.
          </p>

          <h2>Downstream Applications</h2>
          <div className={styles.videoGrid3}>
            <LazyVideo
              src={"teleop/1.mp4"}
              title="Teleop Video 1"
              className={styles.videoElement}
              defaultVolume={0.0}
              controls={false}
              muted
              autoPlay
              loop
            />
            <LazyVideo
              src={"teleop/2.mp4"}
              title="Teleop Video 2"
              className={styles.videoElement}
              defaultVolume={0.0}
              controls={false}
              muted
              autoPlay
              loop
            />
            <LazyVideo
              src={"teleop/3.mp4"}
              title="Teleop Video 3"
              className={styles.videoElement}
              defaultVolume={0.0}
              controls={false}
              muted
              autoPlay
              loop
            />
          </div>
          <p className={styles.caption}>
            <span className={styles.captionTitle}>Live Teleoperation.</span> We showcase DreamDojo's real-time capabilities by teleoperating and generating online rollouts.
          </p>
          <div className={styles.imageWrapper}>
            <img
              src="application.png"
              alt="DreamDojo Applications"
              className={styles.projectImage}
            />
          </div>
          <p className={styles.caption}>
            <span className={styles.captionTitle}>Policy Evaluation and Model-based Planning.</span> We demonstrate the key applications of DreamDojo for reliable policy evaluation without real-world deployment and model-based planning for test-time improvement.
          </p>

          <h2>BibTeX</h2>
          <div className={styles.bibtexContainer}>
            <pre className={styles.bibtex}>
              {`@article{gao2026dreamdojo,
    title={DreamDojo: A Generalist Robot World Model from Large-Scale Human Videos},
    author={Shenyuan Gao and William Liang and Kaiyuan Zheng and Ayaan Malik and Seonghyeon Ye and Sihyun Yu and Wei-Cheng Tseng and Yuzhu Dong and Kaichun Mo and Chen-Hsuan Lin and Qianli Ma and Seungjun Nah and Loic Magne and Jiannan Xiang and Yuqi Xie and Ruijie Zheng and Dantong Niu and You Liang Tan and K.R. Zentner and George Kurian and Suneel Indupuru and Pooya Jannaty and Jinwei Gu and Jun Zhang and Jitendra Malik and Pieter Abbeel and Ming-Yu Liu and Yuke Zhu and Joel Jang and Linxi "Jim" Fan},
    journal={arXiv preprint arXiv:2602.06949},
    year={2026}
}`}
            </pre>
          </div>

        </div>

      </article>
    </>
  );
}
