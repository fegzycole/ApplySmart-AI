import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

interface TableWrapperProps {
  title: string;
  description: string;
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

export function TableWrapper({
  title,
  description,
  isLoading,
  isError,
  isEmpty,
  emptyMessage = "No data available",
  children,
}: TableWrapperProps) {
  return (
    <Card className="border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32 text-zinc-500">
            Loading...
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-32 text-zinc-500">
            Failed to load data
          </div>
        ) : isEmpty ? (
          <div className="flex items-center justify-center h-32 text-zinc-500">
            {emptyMessage}
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
}
