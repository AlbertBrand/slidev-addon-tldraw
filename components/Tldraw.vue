<template>
  <div class="absolute">
    <div class="inverse-transform" ref="wrapperEl">
      <Tldraw
        @mount="onMount"
        :components="components"
        :store="store"
        :acceptedImageMimeTypes="acceptedImageMimeTypes"
        :acceptedVideoMimeTypes="acceptedVideoMimeTypes"
        :hideUi="!isEditable"
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
import { computed, ref, shallowRef, useSlots, watchEffect } from "vue";
import { applyPureReactInVue } from "veaury";
import { useCssVar, useResizeObserver } from "@vueuse/core";
import { useSlideContext } from "@slidev/client";
import { useSaveSnapshot } from "./useSaveSnapshot";
import { useIsEditable } from "./useIsEditable";
import "./tldraw.css";

// create Vue component from React component
const Tldraw = applyPureReactInVue(TldrawReact);

// get editable state from dev mode and slide view
const isEditable = useIsEditable();

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
  editor.zoomToBounds(bounds, { force: true, immediate: true, inset: 0 });
};

// update zoom when wrapper resizes
const wrapperEl = ref(null);
useResizeObserver(wrapperEl, debounce(updateZoom, 200));

// create css var ref for slide scale
const scale = useCssVar("--slide-scale", wrapperEl);

const context = useSlideContext();
const debouncedSaveSnapshot = debounce(useSaveSnapshot(store), 500);
const onMount = (editor: Editor) => {
  if (!editorRef.value) {
    // listen to all changes and save snapshot after debounce period
    store.listen(debouncedSaveSnapshot, { source: "user", scope: "all" });
  }
  editorRef.value = editor;

  // make readonly when not editable
  editorRef.value.updateInstanceState({
    isReadonly: !isEditable.value,
  });

  // initial zoom to fit
  updateZoom();

  // always provide scale to component as CSS variable, even in print mode
  watchEffect(() => {
    scale.value = String(context.$scale.value);
  });
};
</script>
