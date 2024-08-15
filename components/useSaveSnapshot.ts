import {
  getSnapshot,
  TLStore,
} from "tldraw";
import { watchEffect } from "vue";
import { useSlideContext } from "@slidev/client";
import { useDynamicSlideInfo } from "@slidev/client/composables/useSlideInfo.ts";
import { Props } from "./Tldraw.vue";

export function useSaveSnapshot(store: TLStore, props: Props) {
  const context = useSlideContext();
  const { info, update } = useDynamicSlideInfo(context.$page);

  // get the current slide content
  let content: string | undefined;
  watchEffect(() => (content = info.value?.content));

  // return function that saves the snapshot in the slide content
  return async () => {
    if (content === undefined) return;

    // get a snapshot of the current document
    const { document } = getSnapshot(store);
    const json = JSON.stringify(document, null, 2);

    // store the snapshot on disk via the vite plugin
    if (import.meta.hot) {
      import.meta.hot.send("tldraw:store-file", { path: props.doc, content: json });
    }

    // update the slide content to include the doc prop
    const newContent = updateTldrawProps(content, props);

    // skip update if content is same
    if (content === newContent) return;

    await update({
      content: newContent,
      skipHmr: true,
    });
  };
}

// Replace slide contents with new props on Tldraw component.
// Currently only supports a single Tldraw component per slide.
export function updateTldrawProps(content: string, props: Props) {
  const openCloseRegex = /<tldraw[^>]*>.*<\/tldraw>/is;

  if (openCloseRegex.test(content)) {
    return content.replace(openCloseRegex, (match) => updateAttrs(match, props));
  }

  const selfCloseRegex = /<tldraw.*\/>/is;
  if (selfCloseRegex.test(content)) {
    return content.replace(selfCloseRegex, (match) => updateAttrs(match, props));
  }

  return content;
}

export function updateAttrs(component: string, props: Props) {
  const doc = new DOMParser().parseFromString(component, 'text/html');
  doc.body.firstElementChild?.setAttribute('doc', props.doc);
  return doc.body.innerHTML;
}