"use client";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  return (
    <div
      className="prose dark:prose-invert max-w-none bg-white dark:bg-slate-700 p-4 rounded-lg"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};
