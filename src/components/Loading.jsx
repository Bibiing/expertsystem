import { Loader2 } from "lucide-react";

export default function LoadingOverlay({ message, desc }) {
  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <Loader2 className="loading-spinner" />
        <h3 className="loading-title">{message}</h3>
        <p className="loading-desc">{desc}</p>
      </div>
    </div>
  );
}
