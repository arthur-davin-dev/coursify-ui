"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { useGetCoursesQuery } from "@/store/services/courseApi";
import type { Course } from "@/store/services/courseApi";
import { useGetCategoriesQuery } from "@/store/services/categoryApi";

import { Search, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import CourseCard from "@/components/course/CourseCard";
import BannerCourse from "@/components/course/BannerCourse";

export default function CoursePage() {
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, refetch } = useGetCoursesQuery();
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMobileFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const courses: Course[] = useMemo(() => {
    if (!data) return [];
    return Array.isArray(data) ? data : data.content ?? [];
  }, [data]);

  const filtered = useMemo(() => {
    let result = courses;

    // Filter by category — check all possible fields the API might return
    if (selectedCategoryId !== null) {
      result = result.filter((c) => {
        const id =
          c.categoryId ??        // flat: categoryId
          c.category?.id;        // nested: category.id
        return id === selectedCategoryId;
      });
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.categoryName?.toLowerCase().includes(q) ||
          c.category?.name?.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [search, selectedCategoryId, courses]);

  const activeCategoryName =
    selectedCategoryId === null
      ? "All"
      : categoriesData.find((c) => c.id === selectedCategoryId)?.name ?? "All";

  const handleSelectCategory = (id: number | null) => {
    setSelectedCategoryId(id);
    setMobileFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <BannerCourse />

      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-8 md:px-10 lg:px-20 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          All Courses
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Explore our full library of courses
        </p>

        {/* Search row */}
        <div className="flex gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200
                         dark:border-gray-700 bg-gray-50 dark:bg-gray-800
                         text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
            />
          </div>

          {/* Mobile-only filter button */}
          <div className="relative sm:hidden" ref={dropdownRef}>
            <button
              onClick={() => setMobileFilterOpen((v) => !v)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition
                ${mobileFilterOpen || selectedCategoryId !== null
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="max-w-[80px] truncate">{activeCategoryName}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${mobileFilterOpen ? "rotate-180" : ""}`}
              />
            </button>

            {mobileFilterOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200
                              dark:border-gray-700 rounded-2xl shadow-xl z-20 overflow-hidden py-1">
                <CategoryOption
                  label="All"
                  selected={selectedCategoryId === null}
                  onSelect={() => handleSelectCategory(null)}
                />
                {categoriesData.map((cat) => (
                  <CategoryOption
                    key={cat.id}
                    label={cat.name}
                    selected={selectedCategoryId === cat.id}
                    onSelect={() => handleSelectCategory(cat.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop category pills */}
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
      </div>

      {/* Body */}
      <div className="px-4 sm:px-8 md:px-10 lg:px-20 py-8">
        {/* Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="w-full bg-white dark:bg-gray-800 rounded-3xl border
                           border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse"
              >
                <div className="h-[200px] bg-gray-200 dark:bg-gray-700 m-3 rounded-2xl" />
                <div className="px-5 py-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded-full w-full" />
                  <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded-full w-2/3" />
                  <div className="h-px bg-gray-100 dark:bg-gray-700 my-2" />
                  <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
                    <div className="h-5 bg-gray-100 dark:bg-gray-600 rounded-full w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-red-500 font-medium mb-3">Failed to load courses.</p>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-gray-400 text-lg font-medium">No courses found</p>
            <p className="text-gray-300 text-sm mt-1">
              Try a different search term or category
            </p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && filtered.length > 0 && (
          <>
            <p className="text-sm text-gray-400 mb-4">
              Showing {filtered.length} course{filtered.length !== 1 ? "s" : ""}
              {selectedCategoryId !== null && (
                <span className="ml-1">
                  in <span className="text-blue-500 font-medium">{activeCategoryName}</span>
                </span>
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ── */

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
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border
        ${active
          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
          : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400"
        }`}
    >
      {label}
    </button>
  );
}

function CategoryOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition
        ${selected
          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
    >
      {label}
      {selected && <Check className="w-3.5 h-3.5" />}
    </button>
  );
}
