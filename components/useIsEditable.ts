import { computed } from "vue";
import { useSlideContext } from "@slidev/client";

export function useIsEditable() {
  const context = useSlideContext();
  return computed(() => context.$renderContext.value === "slide" && __DEV__);
}

