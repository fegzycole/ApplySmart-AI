import { TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  DOCUMENT_TAB_META,
  DOCUMENT_TAB_STYLES,
} from "../constants/documents.constants";
import type { DocumentsTabDefinition } from "../types/documents.types";

interface DocumentsTabsProps {
  tabs: DocumentsTabDefinition[];
}

export function DocumentsTabs({ tabs }: DocumentsTabsProps) {
  return (
    <div className={DOCUMENT_TAB_STYLES.rail}>
      <TabsList className={DOCUMENT_TAB_STYLES.list}>
        {tabs.map(({ id, label, count }) => {
          const Icon = DOCUMENT_TAB_META[id].icon;

          return (
            <TabsTrigger key={id} value={id} className={DOCUMENT_TAB_STYLES.trigger}>
              <Icon className={DOCUMENT_TAB_STYLES.icon} />
              <span className={DOCUMENT_TAB_STYLES.label}>{label}</span>
              <span className={DOCUMENT_TAB_STYLES.count}>{count}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </div>
  );
}
