"use client"

import { Chapter } from "@/lib/generated/prisma";
import { useEffect, useState } from "react";

import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from "@hello-pangea/dnd";

import { Grip, Pencil } from "lucide-react";
import { clsx } from "clsx";


interface ChaptersListProps {
    items: Chapter[],
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
}


export const ChaptersList = ({
    items,
    onReorder,
    onEdit
}: ChaptersListProps) => {

    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setChapters(items);
    }, [items]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(chapters);
        const [reorderedItems] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItems);

        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedChapters = items.slice(startIndex, endIndex + 1);

        setChapters(items);

        const bulkUpdateData = updatedChapters.map((chapter) => ({
            id: chapter.id,
            position: items.findIndex((item) => item.id === chapter.id),
        }));

        onReorder(bulkUpdateData);
    }

    if (!isMounted) {
        return null;
    }

    return (


        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {chapters.map((chapter, index) => (
                            <Draggable
                                key={chapter.id}
                                draggableId={chapter.id}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        className={`flex items-center gap-x-2 bg-gray-200 border-gray-200 border text-gray-700 rounded-md mb-4 text-sm
                                            ${chapter.isPublished && "bg-blue-100 border-blue-200 text-blue-700"}
                                            dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300
                                            dark:${chapter.isPublished && "bg-blue-800 border-blue-600 text-blue-300"}
                                        `}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div
                                            className={`px-2 py-3 border-r border-r-gray-200 hover:bg-gray-300 rounded-l-md transition
                                                ${chapter.isPublished && "border-r-blue-200 hover:bg-blue-200"}
                                                dark:border-r-slate-800 dark:hover:bg-slate-700
                                                dark:${chapter.isPublished && "border-r-blue-600 hover:bg-blue-800"}
                                            `}
                                            {...provided.dragHandleProps}
                                        >
                                            <Grip
                                                className="h-5 w-5"
                                            />
                                        </div>
                                        {chapter.title}
                                        <div className="ml-auto pr-2 flex items-center gap-x-2">
                                            {chapter.isFree && (
                                                <div className="bg-green-600 text-white rounded-full px-3 py-1 text-xs font-medium">
                                                    Free
                                                </div> 
                                            )}

                                            <div
                                                className={clsx(
                                                    "rounded-full px-3 py-1 text-xs font-medium text-white",
                                                    chapter.isPublished ? "bg-sky-700" : "bg-gray-500"
                                                )}
                                            >
                                                {chapter.isPublished ? "Published" : "Draft"}
                                            </div>

                                            <Pencil
                                                onClick={() => onEdit(chapter.id)}
                                                className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                                            />
                                        </div>

                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>


    )
}
