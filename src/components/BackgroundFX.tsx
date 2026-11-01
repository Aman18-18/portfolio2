export function BackgroundFX() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <div className="bg-orb bg-orb-a" />
      <div className="bg-orb bg-orb-b" />
      <div className="bg-orb bg-orb-c" />
    </div>
  );
}
