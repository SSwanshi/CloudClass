import { db } from "@/lib/db";
import { Course, Category } from "@/lib/generated/prisma";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  purchases: { userId: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        ...(title && {
          title: {
            contains: title
          } as never
        }),
        ...(categoryId && { categoryId })
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        chapters: {
          where: { isPublished: true },
          select: { id: true }
        },
        purchases: {
          where: { userId },
          select: { userId: true }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
      courses.map(async (course) => {
        const progress = course.purchases.length
          ? await getProgress(userId, course.id)
          : null;

        return {
          ...course,
          progress
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.error("[GET_COURSES]", error);
    return [];
  }
};