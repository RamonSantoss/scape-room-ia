/* Design reminder: telemetry is guidance, not decoration; it must answer where the learner is. */

import { Radio } from "lucide-react";

type TelemetryProps = {
  label: string;
  status?: string;
  tone?: string;
};

export function Telemetry({ label, status = "SINAL ATIVO", tone = "signal" }: TelemetryProps) {
  return (
    <div className={`telemetry telemetry--${tone}`}>
      <Radio size={13} strokeWidth={2.1} aria-hidden="true" />
      <span>{label}</span>
      <i aria-hidden="true" />
      <span>{status}</span>
    </div>
  );
}
