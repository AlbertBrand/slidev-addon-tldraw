import {
  getSnapshot,
  TLStore,
} from "tldraw";
import { watchEffect } from "vue";
import { useSlideContext } from "@slidev/client";
import { useDynamicSlideInfo } from "@slidev/client/composables/useSlideInfo.ts";
import { State } from "./Tldraw.vue";

export function useSaveSnapshot(store: TLStore, state: State) {
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

    // send the snapshot as a data URL
    const dataURL = "data:text/plain;base64," + btoa(json);

    // store the snapshot on disk via the vite plugin
    if (import.meta.hot) {
      import.meta.hot.send("tldraw:store-file", { path: state.doc, content: dataURL });
    }

    // update the slide content to include the doc prop
    const newContent = updateTldrawProps(content, state);

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
export function updateTldrawProps(content: string, state: State) {
  const openCloseRegex = /<tldraw[^>]*>.*<\/tldraw>/is;

  if (openCloseRegex.test(content)) {
    return content.replace(openCloseRegex, (match) => updateAttrs(match, state));
  }

  const selfCloseRegex = /<tldraw.*\/>/is;
  if (selfCloseRegex.test(content)) {
    return content.replace(selfCloseRegex, (match) => updateAttrs(match, state));
  }

  return content;
}

export function updateAttrs(component: string, state: State) {
  const doc = new DOMParser().parseFromString(component, 'text/html');
  doc.body.firstElementChild?.setAttribute('doc', state.doc ?? '');
  return doc.body.innerHTML;
}