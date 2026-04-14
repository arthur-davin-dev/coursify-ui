import Banner from "@/components/student/Banner";
import CompletedCourses from "@/components/student/CompletedSection";
import InProgressCourses from "@/components/student/InProgressSection";


export default function StudentDashboardPage() {
  return (
    <>
      <Banner />
      <InProgressCourses />
      <CompletedCourses />
    </>
  );
}