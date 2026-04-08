import CourseCard from "@/components/course/CourseCard";
import CourseDetail from "@/components/course/CourseDetail";
import LoginForm from "@/components/forms/LoginForm";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
      <CourseDetail />
      <LoginForm/>
    </div>
  );
}
