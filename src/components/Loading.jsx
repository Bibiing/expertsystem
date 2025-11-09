import { Loader2 } from "lucide-react";

export default function LoadingOverlay({ message, desc }) {
  return (
    <div className="loading-overlay fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#5a5f52] rounded-2xl p-8 max-w-md mx-4 border border-[#B7B89F]/20">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#B7B89F] animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#EEEEEE] mb-2">{message}</h3>
          <p className="text-[#CBCBCB] text-sm">{desc}</p>
        </div>
      </div>
    </div>
  );
}
