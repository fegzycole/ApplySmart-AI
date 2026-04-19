import type { PdfPage, PositionedText } from './pdf-extraction.service';

export interface ReplacementMapping {
  originalIndex: number;
  newText: string;
}

/**
 * Map optimized text back to original positions
 * This is the core of the cloning approach - we keep positions, just swap text
 */
export function mapOptimizedText(
  pages: PdfPage[],
  originalText: string,
  optimizedText: string
): ReplacementMapping[] {
  const mappings: ReplacementMapping[] = [];

  // Split both texts into lines
  const originalLines = originalText.split('\n').filter(line => line.trim());
  const optimizedLines = optimizedText.split('\n').filter(line => line.trim());

  // Build a map of original text items
  const allTextItems: PositionedText[] = [];
  pages.forEach(page => {
    allTextItems.push(...page.textItems);
  });

  // Group text items by line
  const lineGroups = groupTextItemsByLine(allTextItems);

  // Match optimized lines to original lines by similarity
  let textItemIndex = 0;

  optimizedLines.forEach((optimizedLine, lineIdx) => {
    if (lineIdx >= lineGroups.length) return;

    const lineGroup = lineGroups[lineIdx];
    const originalLineText = lineGroup.map(item => item.text).join('');

    // If the lines are similar enough, replace
    if (shouldReplace(originalLineText, optimizedLine)) {
      // Distribute the new text across the original text items in this line
      const distribution = distributeTextAcrossItems(optimizedLine, lineGroup);

      distribution.forEach((newText, idx) => {
        const itemIndex = textItemIndex + idx;
        if (itemIndex < allTextItems.length) {
          mappings.push({
            originalIndex: itemIndex,
            newText,
          });
        }
      });
    }

    textItemIndex += lineGroup.length;
  });

  return mappings;
}

/**
 * Group text items that belong to the same line
 */
function groupTextItemsByLine(textItems: PositionedText[]): PositionedText[][] {
  if (textItems.length === 0) return [];

  const groups: PositionedText[][] = [];
  let currentGroup: PositionedText[] = [];
  let currentLineIndex = textItems[0].lineIndex;

  textItems.forEach(item => {
    if (item.lineIndex === currentLineIndex) {
      currentGroup.push(item);
    } else {
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = [item];
      currentLineIndex = item.lineIndex;
    }
  });

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }

  return groups;
}

/**
 * Determine if two lines are similar enough to warrant replacement
 */
function shouldReplace(original: string, optimized: string): boolean {
  const origClean = original.toLowerCase().replace(/[^\w]/g, '');
  const optClean = optimized.toLowerCase().replace(/[^\w]/g, '');

  // If they share at least 50% of characters, consider them the same line
  const overlap = calculateOverlap(origClean, optClean);
  return overlap > 0.4;
}

/**
 * Calculate character overlap between two strings
 */
function calculateOverlap(str1: string, str2: string): number {
  const set1 = new Set(str1.split(''));
  const set2 = new Set(str2.split(''));

  let intersection = 0;
  set1.forEach(char => {
    if (set2.has(char)) intersection++;
  });

  const union = set1.size + set2.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Distribute new text across original text items
 * This maintains the visual structure
 */
function distributeTextAcrossItems(
  newText: string,
  originalItems: PositionedText[]
): string[] {
  if (originalItems.length === 0) return [];
  if (originalItems.length === 1) return [newText];

  const words = newText.split(/\s+/);
  const distribution: string[] = [];

  // Simple distribution: divide words evenly
  const wordsPerItem = Math.ceil(words.length / originalItems.length);

  for (let i = 0; i < originalItems.length; i++) {
    const start = i * wordsPerItem;
    const end = Math.min(start + wordsPerItem, words.length);
    const text = words.slice(start, end).join(' ');
    distribution.push(text);
  }

  return distribution;
}

/**
 * Apply replacements to text items
 */
export function applyReplacements(
  pages: PdfPage[],
  replacements: ReplacementMapping[]
): PdfPage[] {
  const allTextItems: PositionedText[] = [];
  pages.forEach(page => {
    allTextItems.push(...page.textItems);
  });

  // Apply replacements
  const replacementMap = new Map(replacements.map(r => [r.originalIndex, r.newText]));

  allTextItems.forEach((item, idx) => {
    if (replacementMap.has(idx)) {
      item.text = replacementMap.get(idx)!;
    }
  });

  // Rebuild pages with updated text
  let itemIndex = 0;
  return pages.map(page => {
    const pageItems = allTextItems.slice(itemIndex, itemIndex + page.textItems.length);
    itemIndex += page.textItems.length;

    return {
      ...page,
      textItems: pageItems,
    };
  });
}
