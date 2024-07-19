<template>
  <div class="absolute">
    <div class="inverse-transform" ref="wrapperEl">
      <Tldraw @mount="onMount" :components="components" :store="store" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  createTLStore,
  debounce,
  Editor,
  loadSnapshot,
  TLComponents,
  Tldraw as TldrawReact,
  TLStoreSnapshot,
} from "tldraw";
import { computed, ref, shallowRef, useSlots } from "vue";
import { applyPureReactInVue } from "veaury";
import { useResizeObserver } from "@vueuse/core";
import { useSaveSnapshot } from "./useSaveSnapshot";
import "./tldraw.css";

// create Vue component from React component
const Tldraw = applyPureReactInVue(TldrawReact);

// get snapshot from default slot
const slots = useSlots();
const slotText = computed(
  () => slots.default && (slots.default()[0].children as string)
);

// create store and load snapshot
const store = createTLStore();
try {
  if (slotText.value !== undefined) {
    const snapshot = JSON.parse(slotText.value) as TLStoreSnapshot;
    loadSnapshot(store, snapshot);
  }
} catch (e) {
  console.error("[slidev-addon-tldraw] Failed to load snapshot", e);
}

// disable several UI components
const components: TLComponents = {
  ContextMenu: null,
  HelpMenu: null,
  NavigationPanel: null,
  MainMenu: null,
  PageMenu: null,
  DebugPanel: null,
};

// create editor ref
const editorRef = shallowRef<Editor>();

// zoom to fit bounds
const updateZoom = () => {
  const editor = editorRef.value;
  if (!editor) return;

  const bounds = {
    x: 0,
    y: 0,
    w: 600,
    h: 600,
  };

  // force doesn't work in tldraw@2.2.1 until next release, so explicitly unlock/lock camera
  editor.setCameraOptions({
    isLocked: false,
  });
  editor.zoomToBounds(bounds, { force: true, immediate: true });
  editor.centerOnPoint({ x: 250, y: 250 }, { force: true, immediate: true });
  editor.setCameraOptions({
    isLocked: true,
  });
};

// when component resizes, update zoom
const wrapperEl = ref(null);
useResizeObserver(wrapperEl, debounce(updateZoom, 200));

const debouncedSaveSnapshot = debounce(useSaveSnapshot(store), 500);
const onMount = (editor: Editor) => {
  if (!editorRef.value) {
    // listen to changes and save snapshot after debouncing
    store.listen(debouncedSaveSnapshot, { source: "user", scope: "all" });
  }
  editorRef.value = editor;

  // initial zoom to fit
  updateZoom();
};
</script>
