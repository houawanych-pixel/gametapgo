import { Gamepad } from "./Icons";

/** The one GameTapGo logo: Game (white) Tap (blue) Go (green). */
export default function Logo({ size = 26, icon = true }: { size?: number; icon?: boolean }) {
  return (
    <span className="logo" style={{ fontSize: size }}>
      {icon && <Gamepad size={size * 1.15} />}
      <span className="lword"><span className="lw">Game</span><span className="lt">Tap</span><span className="lg">Go</span></span>
    </span>
  );
}
