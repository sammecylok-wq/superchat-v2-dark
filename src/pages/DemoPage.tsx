import { ArrowRight, BellRing, CalendarCheck, FileCheck2, MessageSquareText, Mic2 } from "lucide-react";
import { ContactAction } from "../components/ContactAction";
import { VideoPlayer } from "../components/Media";
import { Seo } from "../components/Seo";
import { useLanguage } from "../i18n/useLanguage";

const demoMedia = [
  { src: "/videos/demo-01-faq-screening.mp4", available: true, aspect: "phone" as const, aspectRatio: "1080 / 2384", Icon: MessageSquareText },
  { src: "/videos/faq-live-demo.mp4", available: true, aspect: "phone" as const, aspectRatio: "1080 / 1920", Icon: FileCheck2 },
  { src: "/videos/demo-03-booking.mp4", poster: "/images/video-posters/demo-03-booking-poster.jpg", available: true, aspect: "phone" as const, aspectRatio: "1080 / 2384", Icon: CalendarCheck },
  { src: "/videos/demo-04-voice.mp4", poster: "/images/video-posters/demo-04-voice-poster.jpg", available: true, aspect: "phone" as const, aspectRatio: "1080 / 2384", Icon: Mic2 },
  { src: "/videos/demo-05-telegram.mp4", poster: "/images/video-posters/demo-05-telegram-poster.jpg", available: true, aspect: "phone" as const, aspectRatio: "384 / 848", Icon: BellRing },
];

export function DemoPage() {
  const { currentLanguage, copy } = useLanguage();
  const content = copy.demo;

  return (
    <>
      <Seo title={copy.seo.demo.title} description={copy.seo.demo.description} path="/demo" />
      <section className="border-b border-zinc-200 bg-brand-50 py-16 sm:py-20">
        <div className="container-site">
          <span className="eyebrow !bg-white">{content.eyebrow}</span>
          <h1 className="page-title">{content.title}</h1>
          <p className="lead mt-6 max-w-3xl">{content.intro}</p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">{content.platformNote}</p>
        </div>
      </section>
      <section>
        {content.items.map((item, index) => {
          const media = demoMedia[index];
          const Icon = media.Icon;
          const isReversed = index % 2 === 1;
          return (
            <article
              key={media.src}
              className={`demo-section${isReversed ? " demo-section--alternate" : ""}`}
              data-demo={index + 1}
            >
              <div className="container-site demo-section-grid" data-reversed={isReversed}>
                <div className="demo-video-column">
                  <div className="demo-video-shell">
                    <VideoPlayer
                      src={media.src}
                      poster={media.poster}
                      title={item.title}
                      description={item.description}
                      available={media.available}
                      autoPlay
                      muted
                      loop
                      playsInline
                      controls={false}
                      playWhenVisible
                      preload="metadata"
                      aspect={media.aspect}
                      aspectRatio={media.aspectRatio}
                      fit="contain"
                      className="demo-video"
                    />
                  </div>
                  {currentLanguage === "en" && <p className="mt-3 text-center text-xs leading-5 text-muted">{copy.common.videoChineseSubtitles}</p>}
                </div>
                <div className="demo-copy">
                  <span className="icon-tile"><Icon size={21} aria-hidden="true" /></span>
                  <p className="mt-5 text-sm font-bold tracking-[.14em] text-brand-700">Demo {String(index + 1).padStart(2, "0")}</p>
                  <h2 className="content-title mt-2">{item.title}</h2>
                  <p className="lead mt-4">{item.description}</p>
                  <ul className="mt-6 grid gap-3 text-sm font-semibold text-ink sm:grid-cols-2" aria-label={`${item.title}: ${copy.common.learnMore}`}>
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-600" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <section className="section bg-zinc-50">
        <div className="container-site text-center">
          <h2 className="section-title mx-auto">{content.ctaTitle}</h2>
          <p className="lead mx-auto mt-5 max-w-2xl">{content.ctaText}</p>
          <div className="mt-8"><ContactAction>{content.ctaButton}<ArrowRight size={18} aria-hidden="true" /></ContactAction></div>
        </div>
      </section>
    </>
  );
}
