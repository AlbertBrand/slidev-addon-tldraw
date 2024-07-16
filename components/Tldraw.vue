<template>
  <div class="absolute">
    <button class="me-4" @click="saveSnapshot">Save Snapshot</button>
    <button @click="loadSnapshot">Load Snapshot</button>
    <div :style="inverseTransformStyle">
      <Tldraw :hideUi="true" @mount="onMount" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Editor, Tldraw as TldrawReact, TLStoreSnapshot } from "tldraw";
import { shallowRef, watch } from "vue";
import { applyPureReactInVue } from "veaury";
import snapshot from "./snapshot.json";
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

const editorRef = shallowRef<Editor>();
const onMount = (editor: Editor) => {
  if (!editorRef.value) {
    // ready
    editor.loadSnapshot(snapshot as TLStoreSnapshot);
  }

  editorRef.value = editor;
};

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

const saveSnapshot = () => {
  const editor = editorRef.value;
  if (!editor) return;

  const { document } = editor.getSnapshot();
  console.log(JSON.stringify(document));
};

const loadSnapshot = () => {
  const editor = editorRef.value;
  if (!editor) return;

  editor.loadSnapshot(snapshot as TLStoreSnapshot);
};
</script>
