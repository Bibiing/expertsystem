import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Accordion({ items = [] }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleItem = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      pujian: "bg-blue-100 text-blue-700 border-blue-200",
      keluhan: "bg-red-100 text-red-700 border-red-200",
      saran: "bg-emerald-100 text-emerald-700 border-emerald-200",
      lainnya: "bg-amber-100 text-amber-700 border-amber-200",
    };
    return colors[category] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getCategoryLabel = (category) => {
    const labels = {
      pujian: "Pujian",
      keluhan: "Keluhan",
      saran: "Saran",
      lainnya: "Lainnya",
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-slate-200 rounded-lg overflow-hidden bg-white hover:border-emerald-200 transition-all duration-300"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-start sm:items-center justify-between gap-3 px-4 py-3 bg-white hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex-1 min-w-0">
              {item.category && (
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 border ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {getCategoryLabel(item.category)}
                </span>
              )}
              <span className="font-medium text-slate-800 block">
                {item.question}
              </span>
            </div>
            {openIndexes.includes(index) ? (
              <ChevronUp className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            )}
          </button>
          {openIndexes.includes(index) && (
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
