"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@/lib/generated/prisma";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {TiptapEditor} from "@/components/TiptapEditor"
import { Preview } from "@/components/preview";

interface ChapterDescriptionFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string;
}

const formSchema = z.object({
    description: z.string().min(1),
});

export const ChapterDescriptionForm = ({
    initialData,
    courseId,
    chapterId,
}: ChapterDescriptionFormProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => setIsEditing((current) => !current);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        description: initialData.description ?? "",
    },
});


    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast.success("Chapter updated successfully");
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Description
                <Button onClick={toggleEdit} variant={"ghost"}>
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Description
                        </>
                    )}
                </Button>
            </div>

            {!isEditing && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.description && "text-slate-500 italic"
                )}>
                    {!initialData.description && "No Description"}
                    {initialData.description && (
                        <Preview
                            value={initialData.description}
                        />
                    )}
                    </div>
            )}

            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    
                                    <FormControl>
                                        <TiptapEditor value={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};
