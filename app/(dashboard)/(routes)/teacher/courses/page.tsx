import { auth } from "@clerk/nextjs/server";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";


const CoursesPage = async () => {

    const {userId} = await auth();

    if(!userId) {
        return redirect("/");
    };

    const course = await db.course.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    });


    return (
        <div className="p-6">
            <DataTable columns={columns} data={course} />
        </div>
    );
}

export default CoursesPage;