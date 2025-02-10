import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
import { useIsSlideActive } from "@slidev/client";

export function useIsEditable() {
  const context = useSlideContext();
  const isSlideActive = useIsSlideActive();

  // editor is editable only in dev mode, when rendered as 'slide' and active
  return computed(
    () =>
      isSlideActive.value && context.$renderContext.value === "slide" && __DEV__
  );
}
