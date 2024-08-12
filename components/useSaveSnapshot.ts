import {
  getSnapshot,
  TLStore,
} from "tldraw";
import { watchEffect } from "vue";
import { useSlideContext } from "@slidev/client";
import { useDynamicSlideInfo } from "@slidev/client/composables/useSlideInfo.ts";

export function useSaveSnapshot(store: TLStore) {
  const context = useSlideContext();
  const { info, update } = useDynamicSlideInfo(context.$page);

  // get the current slide content
  let content: string | undefined;
  watchEffect(() => (content = info.value?.content));

  // return function that saves the snapshot in the slide content
  return async () => {
    if (content === undefined) return;

    const { document } = getSnapshot(store);
    const json = JSON.stringify(document, null, 2);
    // const yml = yaml.dump(document);

    // update the slide content
    const newContent = replaceContent(content, json);

    if (content === newContent) return;

    await update({
      content: newContent,
      skipHmr: true,
    });
  };
}

// Replace slide contents with new json as a child of Tldraw component.
// Currently only supports a single Tldraw component per slide.
// TODO: when Slidev support server hooks for addons, store the snapshot in a separate file
export function replaceContent(content: string, json: string) {
  const openCloseRegex = /(<tldraw[^>]*>)(.*?)(<\/tldraw>)/is;

  if (openCloseRegex.test(content)) {
    return content.replace(openCloseRegex, `$1\n${json}\n$3`);
  }

  const selfCloseRegex = /<(tldraw)(.*)(\/>)/is;
  if (selfCloseRegex.test(content)) {
    return content.replace(selfCloseRegex, `<$1$2>\n${json}\n</$1>`);
  }

  return content;
}