import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/EmptyState";
import { LoadingSkeleton } from "@/shared/components/skeletons";

type TableState = "loading" | "error" | "empty" | "success";

interface TableWrapperProps {
  title: string;
  description: string;
  state: TableState;
  emptyMessage?: string;
  children: React.ReactNode;
}

const STATE_MESSAGES: Record<
  Exclude<TableState, "success" | "loading">,
  string
> = {
  error: "Failed to load data",
  empty: "No data available",
};

export function TableWrapper({
  title,
  description,
  state,
  emptyMessage,
  children,
}: TableWrapperProps) {
  const renderContent = () => {
    if (state === "loading") {
      return <LoadingSkeleton variant="table" />;
    }

    if (state === "success") {
      return children;
    }

    const message =
      state === "empty" && emptyMessage ? emptyMessage : STATE_MESSAGES[state];

    return <EmptyState message={message} />;
  };

  return (
    <Card className="border-zinc-200 dark:border-zinc-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
