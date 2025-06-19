import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    // First await the auth check
    const { userId } = await auth();
    
    

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Proper way to handle params in Next.js 13+
    const courseId = (await params).courseId;

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const { url, name } = body;

    if (!url || !name) {
      return new NextResponse("Bad Request - Missing required fields", { 
        status: 400 
      });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name,
        courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.error("[COURSE_ID_ATTACHMENTS_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}