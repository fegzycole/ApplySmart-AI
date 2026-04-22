package ai.applysmart.service.template;

import java.util.List;

public interface SectionRenderer<T> {
    String render(T item);

    default String renderList(List<T> items) {
        if (items == null || items.isEmpty()) {
            return "";
        }
        return items.stream()
                .map(this::render)
                .reduce("", (a, b) -> a + "\n" + b);
    }

    default boolean hasContent(List<T> items) {
        return items != null && !items.isEmpty();
    }
}
