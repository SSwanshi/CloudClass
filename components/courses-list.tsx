import { Category, Course } from "@/lib/generated/prisma";
import { CourseCard } from "./course-card";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({
  items
}: CoursesListProps) => {
  // Deduplicate by course ID
  const uniqueItems = Array.from(
    new Map(items.map(item => [item.id, item])).values()
  );

  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {uniqueItems.map((item) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title ?? "Title not available"}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            progress={item.progress}
            category={item.category?.name ?? "Uncategorized"}
          />
        ))}
      </div>
      {uniqueItems.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No course found. Go to Browse tab to explore courses.
        </div>
      )}
    </div>
  );
};