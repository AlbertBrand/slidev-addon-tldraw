<template>
  <div class="absolute">
    <div class="inverse-transform" ref="wrapperEl">
      <Tldraw
        @mount="onMount"
        :components="components"
        :store="store"
        :acceptedImageMimeTypes="acceptedImageMimeTypes"
        :acceptedVideoMimeTypes="acceptedVideoMimeTypes"
        :hideUi="!isDev"
      />
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
import { computed, isReadonly, ref, shallowRef, useSlots } from "vue";
import { applyPureReactInVue } from "veaury";
import { useResizeObserver } from "@vueuse/core";
import { useSaveSnapshot } from "./useSaveSnapshot";
import "./tldraw.css";

const isDev = __DEV__;

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

// TODO create custom asset store for binary data
// For now, disable big blobs:
const acceptedImageMimeTypes = ["image/svg+xml"];
const acceptedVideoMimeTypes = [];

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

  // square bounds, size makes text still readable
  const bounds = {
    x: 0,
    y: 0,
    w: 600,
    h: 600,
  };
  editor.zoomToBounds(bounds, { force: true, immediate: true, inset: 0 });
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
  editorRef.value.updateInstanceState({
    isReadonly: !isDev,
  });

  // initial zoom to fit
  updateZoom();
};
</script>
