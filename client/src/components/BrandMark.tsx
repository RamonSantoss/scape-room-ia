/* Design reminder: the mark is the signal-keyhole motif; keep it visible, crisp and never decorative-only. */

type BrandMarkProps = { compact?: boolean };

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`}>
      <span className="brand-device" aria-hidden="true">
        <span className="brand-device__orbit brand-device__orbit--one" />
        <span className="brand-device__orbit brand-device__orbit--two" />
        <img src="/scape-room-mark.svg" alt="" className="brand-mark" />
      </span>
      {!compact && (
        <div className="brand-wordmark">
          <strong>SCAPE ROOM</strong>
          <span><b>IA</b><small>laboratório de prática</small></span>
        </div>
      )}
    </div>
  );
}
