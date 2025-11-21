import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingOverlay({ message, desc }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 max-w-md mx-4 border border-slate-200 shadow-2xl"
      >
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-emerald-600 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">{message}</h3>
          <p className="text-slate-500 text-sm">{desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
