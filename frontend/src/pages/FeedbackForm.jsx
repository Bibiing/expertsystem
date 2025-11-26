import { useState, useEffect } from "react";
import {
  MessageSquare,
  Send,
  AlertCircle,
  ChevronDown,
  User,
  Tag,
  FileText,
  ChevronLeft,
  ChevronRight,
  LayoutList,
  PenLine
} from "lucide-react";

import Accordion from "../components/Accordion";
import feedbackService from "../services/feedbackService";
import { infoService } from "../services/infoService";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitType, setSubmitType] = useState(""); // 'success' or 'error'
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [faqItems, setFaqItems] = useState([]);
  const [isLoadingFaq, setIsLoadingFaq] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('form');

  const categories = [
    { value: "pujian", label: "Pujian" },
    { value: "keluhan", label: "Keluhan" },
    { value: "saran", label: "Saran" },
    { value: "lainnya", label: "Lainnya" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loadFeedbacks = async (page) => {
    try {
      const response = await feedbackService.getAllFeedbacks(page);
      const feedbacks = response.data || [];

      const transformedFaq = feedbacks.map((feedback) => ({
        category: feedback.category,
        question: feedback.name
          ? `Feedback dari ${feedback.name} (${getCategoryLabel(
              feedback.category
            )})`
          : `Feedback ${getCategoryLabel(feedback.category)}`,
        answer: feedback.notes,
      }));

      setFaqItems(transformedFaq);
    } catch (error) {
      console.error("Error loading feedbacks:", error);
      setFaqItems([]);
    }
  };

  const loadStats = async () => {
      try {
          const stats = await infoService.getStats();
          const total = stats.data.totalFeedbacks;
          setTotalPages(Math.ceil(total / 5));
      } catch (error) {
          console.error("Error loading stats:", error);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitType("");

    try {
      await feedbackService.createFeedback({
        category: formData.category,
        notes: formData.notes,
        ...(formData.name && { name: formData.name }),
      });

      setSubmitType("success");
      setFormData({ name: "", category: "", notes: "" });

      setTimeout(() => {
        setSubmitMessage("");
        setSubmitType("");
      }, 5000);

      setCurrentPage(1);
      await loadFeedbacks(1);
      await loadStats();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitMessage(
        error.message || "Gagal mengirim feedback. Silakan coba lagi."
      );
      setSubmitType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch feedbacks
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoadingFaq(true);
      await loadFeedbacks(currentPage);
      await loadStats();
      setIsLoadingFaq(false);
    };

    fetchFeedbacks();
  }, [currentPage]);

  const getCategoryLabel = (value) => {
    const category = categories.find((cat) => cat.value === value);
    return category ? category.label : value;
  };

  const faqCategories = [{ value: "semua", label: "Semua" }, ...categories];

  const filteredFaqItems =
    selectedCategory === "semua"
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50/30 py-6 sm:py-8 md:py-12 px-3 sm:px-4 lg:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-linear-to-br from-emerald-600 to-emerald-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 shadow-xl text-center">
          <div className="inline-block p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full mb-3 sm:mb-4">
            <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">
            Feedback & Saran
          </h1>
          <p className="text-emerald-50 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Bantu kami meningkatkan layanan sistem diagnosis dengan memberikan
            feedback Anda
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-1 mb-6 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'form'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <PenLine className="w-4 h-4" />
            Tulis Feedback
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === 'list'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <LayoutList className="w-4 h-4" />
            Lihat Feedback
          </button>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-200 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          {activeTab === 'form' ? (
            <>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Form Feedback
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                      <span className="text-xs sm:text-sm">Nama (Opsional)</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-800 placeholder-slate-400    "
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                      <span className="text-xs sm:text-sm">
                        Kategori <span className="text-red-500">*</span>
                      </span>
                    </div>
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-800 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="">Pilih kategori feedback</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                      <span className="text-xs sm:text-sm">
                        Feedback <span className="text-red-500">*</span>
                      </span>
                    </div>
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    required
                    minLength={3}
                    rows={5}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-800 placeholder-slate-400 transition-all duration-200 resize-none"
                    placeholder="Tuliskan feedback, saran, atau keluhan Anda di sini..."
                  />
                  <p className="text-xs text-slate-500 mt-1.5 sm:mt-2">
                    Minimal 3 karakter
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 ${
                    isSubmitting
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Kirim Feedback</span>
                    </>
                  )}
                </button>

                {/* if error */}
                {submitType === "error" && (
                  <div className="mt-2 sm:mt-3 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{submitMessage}</span>
                  </div>
                )}
              </form>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-1.5 sm:p-2 bg-emerald-100 rounded-lg">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Feedback dari Pengguna Lain
                </h2>
              </div>

              {/* filter */}
              <div className="mb-4 sm:mb-6 flex flex-wrap gap-1.5 sm:gap-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ${
                      selectedCategory === category.value
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {!isLoadingFaq && (
                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-slate-500">
                    Menampilkan{" "}
                    <span className="font-semibold text-emerald-600">
                      {filteredFaqItems.length}
                    </span>{" "}
                    feedback
                    {selectedCategory !== "semua" &&
                      ` dari kategori ${
                        faqCategories.find((c) => c.value === selectedCategory)
                          ?.label
                      }`}
                  </p>
                </div>
              )}

              {isLoadingFaq ? (
                <div className="text-center py-12">
                  <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-3" />
                  <p className="text-slate-500 text-sm">Memuat feedback...</p>
                </div>
              ) : filteredFaqItems.length > 0 ? (
                <>
                  <Accordion items={filteredFaqItems} />
                  <div className="flex justify-center items-center mt-6 gap-4">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-6 h-6 text-slate-600" />
                    </button>
                    <span className="text-slate-600 font-medium">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-6 h-6 text-slate-600" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 sm:py-12 text-slate-500">
                  <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm sm:text-base">
                    {selectedCategory === "semua"
                      ? "Belum ada feedback. Jadilah yang pertama memberikan feedback!"
                      : `Belum ada feedback dalam kategori ${
                          faqCategories.find((c) => c.value === selectedCategory)
                            ?.label
                        }.`}
                  </p>
                </div>
              )}
            </>
          )}
        </div>



        <div className="mt-6 sm:mt-8 bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-6 border border-emerald-100">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="shrink-0 p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-emerald-900 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">
                Feedback Anda Sangat Berharga
              </h4>
              <p className="text-emerald-700/80 text-xs sm:text-sm leading-relaxed">
                Setiap feedback yang Anda berikan membantu kami untuk terus
                meningkatkan kualitas sistem diagnosis. Kami membaca dan
                mempertimbangkan setiap masukan dengan serius.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
