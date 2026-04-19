"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { useGetCoursesQuery } from "@/store/services/courseApi";
import type { Course } from "@/store/services/courseApi";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CourseCard from "@/components/course/CourseCard";
import BannerCourse from "@/components/course/BannerCourse";
import PopularCourse from "@/components/landing/PopularCourse";

const COURSES_PER_PAGE = 12;

export default function CoursePage() {
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useGetCoursesQuery();
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMobileFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const courses: Course[] = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data.content ?? []);
  }, [data]);

  const filtered = useMemo(() => {
    let result = courses;
    if (selectedCategoryId !== null) {
      result = result.filter(
        (c) => (c.categoryId ?? c.category?.id) === selectedCategoryId,
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.categoryName?.toLowerCase().includes(q) ||
          c.category?.name?.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return result;
  }, [search, selectedCategoryId, courses]);

  // Reset to page 1 whenever filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategoryId]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / COURSES_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * COURSES_PER_PAGE;
    return filtered.slice(start, start + COURSES_PER_PAGE);
  }, [filtered, currentPage]);

  const activeCategoryName =
    selectedCategoryId === null
      ? "All"
      : (categoriesData.find((c) => c.id === selectedCategoryId)?.name ??
        "All");

  const handleSelectCategory = (id: number | null) => {
    setSelectedCategoryId(id);
    setMobileFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <BannerCourse />
      <div id="popular-courses">
        <PopularCourse />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 md:px-10 lg:px-20 py-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          All Courses
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Explore our full library of courses
        </p>

        <div className="flex gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
            />
          </div>

          {/* Mobile Filter */}
          <div className="relative sm:hidden" ref={dropdownRef}>
            <button
              onClick={() => setMobileFilterOpen((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition ${
                mobileFilterOpen || selectedCategoryId !== null
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="max-w-[80px] truncate">
                {activeCategoryName}
              </span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${mobileFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {mobileFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-20 overflow-hidden py-1"
                >
                  <CategoryOption
                    label="All"
                    active={selectedCategoryId === null}
                    onClick={() => handleSelectCategory(null)}
                  />
                  {categoriesData.map((cat) => (
                    <CategoryOption
                      key={cat.id}
                      label={cat.name}
                      active={selectedCategoryId === cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Pills */}
        <div className="hidden sm:flex flex-wrap gap-2 mt-5">
          <CategoryPill
            label="All"
            active={selectedCategoryId === null}
            onClick={() => handleSelectCategory(null)}
          />
          {categoriesData.map((cat) => (
            <CategoryPill
              key={cat.id}
              label={cat.name}
              active={selectedCategoryId === cat.id}
              onClick={() => handleSelectCategory(cat.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Body */}
      <div className="px-4 sm:px-8 md:px-10 lg:px-20 py-8 " id="all-courses">
        {!isLoading && !isError && (
          <motion.p layout className="text-sm text-gray-400 mb-4">
            Showing {(currentPage - 1) * COURSES_PER_PAGE + 1}–
            {Math.min(currentPage * COURSES_PER_PAGE, filtered.length)} of{" "}
            {filtered.length} course
            {filtered.length !== 1 ? "s" : ""}
            {selectedCategoryId !== null && (
              <span className="ml-1">
                in{" "}
                <span className="text-blue-500 font-medium">
                  {activeCategoryName}
                </span>
              </span>
            )}
          </motion.p>
        )}

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {paginated.map((course) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  layout: { duration: 0.3 },
                }}
                className="transform-gpu"
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {!isLoading && !isError && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <p className="text-gray-400 text-lg font-medium">
              No courses found
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = useMemo(() => {
    const items: (number | "…")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      items.push(1);
      if (currentPage > 3) items.push("…");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) items.push(i);
      if (currentPage < totalPages - 2) items.push("…");
      items.push(totalPages);
    }
    return items;
  }, [currentPage, totalPages]);

  const handleChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-1.5 mt-10"
    >
      {/* Prev */}
      <button
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="px-2 text-gray-400 select-none"
          >
            …
          </span>
        ) : (
          <motion.button
            key={p}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
              currentPage === p
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {p}
          </motion.button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// ─── Category helpers ─────────────────────────────────────────────────────────

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
        active
          ? "bg-blue-600 text-white border-blue-600 shadow-md"
          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400"
      }`}
    >
      {label}
    </motion.button>
  );
}

function CategoryOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition ${
        active
          ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
      }`}
    >
      {label}
      {active && <Check className="w-4 h-4" />}
    </button>
  );
}
