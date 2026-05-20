import { useCallback, useLayoutEffect, useRef, useState } from "react";

export const RESUME_PREVIEW_WIDTH = 816;

export function useResumePreviewLayout(previewWidth = RESUME_PREVIEW_WIDTH) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState(0);

  const updatePreviewLayout = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const styles = window.getComputedStyle(container);
    const horizontalPadding =
      Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
    const availableWidth = Math.max(container.clientWidth - horizontalPadding, 0);
    const nextScale = Math.min(1, availableWidth / previewWidth);

    setScale(nextScale);
    setScaledHeight(content.scrollHeight * nextScale);
  }, [previewWidth]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let frameId = 0;

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updatePreviewLayout);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const mutationObserver = new MutationObserver(scheduleUpdate);

    resizeObserver.observe(container);
    resizeObserver.observe(content);
    mutationObserver.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [updatePreviewLayout]);

  return {
    containerRef,
    contentRef,
    previewWidth,
    scale,
    scaledHeight,
  };
}
