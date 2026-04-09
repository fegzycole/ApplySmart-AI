import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { DynamicListItem } from "./DynamicListItem";
import { AddItemButton } from "./AddItemButton";

interface DynamicItemsSectionProps {
  items: Array<{ id: number }>;
  sectionIcon: LucideIcon;
  sectionTitle: string;
  sectionIconColor?: string;
  itemTitle: string;
  gradient: string;
  border: string;
  addButtonLabel: string;
  addButtonBorderColor: string;
  addButtonHoverColor: string;
  onAdd: () => void;
  onDelete: (id: number) => void;
  renderContent: (item: { id: number }, index: number) => ReactNode;
}

export function DynamicItemsSection({
  items,
  sectionIcon,
  sectionTitle,
  sectionIconColor,
  itemTitle,
  gradient,
  border,
  addButtonLabel,
  addButtonBorderColor,
  addButtonHoverColor,
  onAdd,
  onDelete,
  renderContent
}: DynamicItemsSectionProps) {
  return (
    <div className="space-y-5 mt-6">
      <SectionHeader icon={sectionIcon} title={sectionTitle} iconColor={sectionIconColor} />
      {items.map((item, index) => (
        <DynamicListItem
          key={item.id}
          index={index}
          title={itemTitle}
          gradient={gradient}
          border={border}
          canDelete={items.length > 1}
          onDelete={() => onDelete(item.id)}
        >
          {renderContent(item, index)}
        </DynamicListItem>
      ))}
      <AddItemButton
        label={addButtonLabel}
        onClick={onAdd}
        borderColor={addButtonBorderColor}
        hoverColor={addButtonHoverColor}
      />
    </div>
  );
}
