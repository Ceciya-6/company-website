export function HeroVideo() {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover object-center"
      src="/images/factory/index.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
