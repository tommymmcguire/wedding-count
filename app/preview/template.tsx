// A template re-mounts on every navigation, so this gives each route a
// smooth crossfade-in (the page-transition system).
export default function PreviewTemplate({ children }: { children: React.ReactNode }) {
  return <div className="journey-page-enter">{children}</div>;
}
