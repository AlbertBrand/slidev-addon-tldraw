<template>
  <div class="absolute">
    <div :style="inverseTransformStyle">
      <Tldraw @mount="onMount" :components="components" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Editor,
  TLComponents,
  Tldraw as TldrawReact,
  TLEventMapHandler,
  TLStoreSnapshot,
} from "tldraw";
import { computed, shallowRef, useSlots, watch, watchEffect } from "vue";
import { applyPureReactInVue } from "veaury";
import { debounce } from "@antfu/utils";
import { useDynamicSlideInfo } from "@slidev/client/composables/useSlideInfo.ts";
import { DragElementMarkdownSource } from "@slidev/client/composables/useDragElements.ts";
import { useSlideContext } from "@slidev/client";
// import yaml from "js-yaml";
import "./tldraw.css";

// The slide is CSS transformed at parent level, and Tldraw does not support such transformation.
// Inverse the transformation to make Tldraw work correctly. (note that `all: unset` only partially works)
const inverseTransformStyle = {
  width: "calc(var(--slidev-slide-scale) * 100%)",
  height: "calc(var(--slidev-slide-scale) * 100%)",
  transform: `
    scale(calc(1 / var(--slidev-slide-scale))) 
    translate(calc(calc(var(--slidev-slide-scale) - 1) * -50%), calc(calc(var(--slidev-slide-scale) - 1) * -50%))
  `,
};

const Tldraw = applyPureReactInVue(TldrawReact);

const slots = useSlots();
const slotText = computed(() => slots.default!()[0].children as string);

const editorRef = shallowRef<Editor>();
const onMount = (editor: Editor) => {
  if (!editorRef.value) {
    // ready, load snapshot
    // TODO make more robust
    const snapshot = JSON.parse(slotText.value) as TLStoreSnapshot;
    editor.loadSnapshot(snapshot);

    // start listening for changes
    editor.store.listen(handleChangeEvent, { source: "user", scope: "all" });
  }

  editorRef.value = editor;
};

const components: TLComponents = {
  ContextMenu: null,
  HelpMenu: null,
  NavigationPanel: null,
  MainMenu: null,
  PageMenu: null,
  DebugPanel: null,
};

const props = defineProps<{
  pos?: string;
  markdownSource?: DragElementMarkdownSource;
}>();

watch(editorRef, (editor) => {
  if (!editor) return;

  const bounds = {
    x: 0,
    y: 0,
    w: 2000,
    h: 2000,
  };

  editor.setCameraOptions({
    isLocked: true,
    constraints: {
      bounds,
      behavior: "fixed",
      initialZoom: "default",
      baseZoom: "default",
      origin: { x: 0, y: 0 },
      padding: { x: 0, y: 0 },
    },
  });

  editor.setCamera({ x: 0, y: 0 });
  editor.zoomToBounds(bounds, { force: true });
});

// we can get the content and update the slide
const context = useSlideContext();
const { info, update } = useDynamicSlideInfo(context.$page);
let content: string | undefined;
watchEffect(() => (content = info.value?.content));

const handleChangeEvent: TLEventMapHandler<"change"> = (change) =>
  debouncedSaveSnapshot();

const saveSnapshot = async () => {
  const editor = editorRef.value;
  if (!editor) return;

  const { document } = editor.getSnapshot();
  const json = JSON.stringify(document, null, 2);
  // console.log(yaml.dump(document));

  // update the slide content
  // TODO allow for more than one Tldraw component?
  const regex = /(<tldraw[^>]*>)(.*?)(<\/tldraw>)/is;
  // Replace the content inside the <Tldraw> tags with newContent
  const newContent = content!.replace(regex, `$1\n${json}\n$3`);

  await update({
    content: newContent,
    skipHmr: true,
  });
};

const debouncedSaveSnapshot = debounce(500, saveSnapshot);
</script>
