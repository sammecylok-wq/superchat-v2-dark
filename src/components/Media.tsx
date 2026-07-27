import { Image as ImageIcon, Play, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  title: string;
  description: string;
  available?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  playWhenVisible?: boolean;
  preload?: "none" | "metadata" | "auto";
  className?: string;
  aspect?: "phone" | "video";
  aspectRatio?: string;
  fit?: "contain" | "cover";
};

let activeVisibleVideo: HTMLVideoElement | null = null;

export function VideoPlayer({
  src, poster, title, description, available = true, autoPlay = false, muted = false, loop = false,
  controls = true, playsInline = true, playWhenVisible = false, preload = "metadata",
  className = "", aspect = "video", aspectRatio, fit = aspect === "phone" ? "contain" : "cover",
}: VideoPlayerProps) {
  const { copy } = useLanguage();
  const [failed, setFailed] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!available || failed || !video) return;

    video.muted = muted;
    video.defaultMuted = muted;
    if (!playWhenVisible) return;

    const observer = new IntersectionObserver(([entry]) => {
      const shouldPlay = entry.isIntersecting && entry.intersectionRatio >= 0.4;
      if (!shouldPlay) {
        video.pause();
        if (activeVisibleVideo === video) activeVisibleVideo = null;
        setAutoplayBlocked(false);
        return;
      }

      if (activeVisibleVideo && activeVisibleVideo !== video) {
        activeVisibleVideo.pause();
      }
      activeVisibleVideo = video;

      if (autoPlay) {
        void video.play()
          .then(() => setAutoplayBlocked(false))
          .catch(() => setAutoplayBlocked(true));
      }
    }, { threshold: [0, 0.4, 0.75] });

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
      if (activeVisibleVideo === video) activeVisibleVideo = null;
    };
  }, [autoPlay, available, failed, muted, playWhenVisible, src]);

  const ratio = aspectRatio ? "" : aspect === "phone" ? "aspect-[9/16]" : "aspect-video";
  if (!available || failed) {
    return (
      <div
        className={`${ratio} media-placeholder relative flex w-full flex-col items-center justify-center overflow-hidden rounded-[inherit] border border-brand-100 p-6 text-center ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
        role="img"
        aria-label={`${title}：${description}`}
      >
        <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-soft"><Play fill="currentColor" size={22} aria-hidden="true" /></span>
        <span className="mb-2 rounded-full bg-white px-3 py-1 text-xs font-bold tracking-[.12em] text-brand-700">{copy.common.realVideoLocation}</span>
        <strong className="mt-2 text-lg text-ink">{title}</strong>
        <span className="mt-2 max-w-sm text-sm leading-6 text-muted">{description}</span>
      </div>
    );
  }

  return (
    <div
      className={`${ratio} relative w-full overflow-hidden rounded-[inherit] bg-black ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <video
        ref={videoRef}
        className={`h-full w-full rounded-[inherit] bg-black ${fit === "contain" ? "object-contain" : "object-cover"} transition-opacity duration-200 ${canPlay ? "opacity-100" : "opacity-0"}`}
        src={src}
        poster={poster}
        aria-label={title}
        title={title}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        preload={preload}
        {...(controls ? { controls: true } : {})}
        onCanPlay={(event) => {
          setCanPlay(true);
          if (autoPlay && !playWhenVisible) {
            void event.currentTarget.play()
              .then(() => setAutoplayBlocked(false))
              .catch(() => setAutoplayBlocked(true));
          }
        }}
        onPlaying={() => {
          setCanPlay(true);
          setAutoplayBlocked(false);
        }}
        onError={() => setFailed(true)}
      >
        {copy.common.browserNoVideo}
      </video>
      {autoPlay && autoplayBlocked && !failed && (
        <button
          type="button"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
          onClick={() => {
            void videoRef.current?.play()
              .then(() => setAutoplayBlocked(false))
              .catch(() => setAutoplayBlocked(true));
          }}
        >
          {copy.common.clickToPlay}
        </button>
      )}
    </div>
  );
}

type SafeImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  founder?: boolean;
};

export function SafeImage({ src, alt, width = 800, height = 600, className = "", founder = false }: SafeImageProps) {
  const { copy } = useLanguage();
  const [available, setAvailable] = useState<boolean | null>(null);
  useEffect(() => {
    const image = new Image();
    image.onload = () => setAvailable(true);
    image.onerror = () => setAvailable(false);
    image.src = src;
  }, [src]);
  if (!available) {
    const filename = src.split("/").pop();
    return (
      <div className={`media-placeholder flex aspect-[4/3] w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-5 text-center ${className}`} role="img" aria-label={`${alt} — ${copy.common.awaitingRealMedia}`}>
        {founder ? <UserRound size={36} strokeWidth={1.5} className="text-brand-600" aria-hidden="true" /> : <ImageIcon size={32} strokeWidth={1.5} className="text-brand-600" aria-hidden="true" />}
        <strong className="mt-4 text-sm text-ink">{founder ? copy.common.awaitingFounderPhoto : copy.common.awaitingSystemImage}</strong>
        <span className="mt-1 break-all text-xs text-muted">{filename}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className={className} />;
}
