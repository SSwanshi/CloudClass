import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ courseId: string; attachmentId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;
        const { attachmentId } = await params;


        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id:courseId,
                userId: userId,
            },
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized - Not course owner", { status: 401 });
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId:courseId,
                id:attachmentId,
            },
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.log("[ATTACHMENT_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}