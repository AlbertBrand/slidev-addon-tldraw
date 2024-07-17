<template>
  <div class="absolute">
    <div class="inverse-transform">
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
import { computed, shallowRef, useSlots, watch } from "vue";
import { applyPureReactInVue } from "veaury";
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

// get editor ref
const editorRef = shallowRef<Editor>();
watch(editorRef, (editor) => {
  if (!editor) return;

  // const bounds = {
  //   x: 0,
  //   y: 0,
  //   w: 2000,
  //   h: 2000,
  // };

  editor.setCameraOptions({
    isLocked: true,

    // constraints: {
    //   bounds,
    //   behavior: "fixed",
    //   initialZoom: "default",
    //   baseZoom: "default",
    //   origin: { x: 0, y: 0 },
    //   padding: { x: 0, y: 0 },
    // },
  });

  // editor.setCamera({ x: 0, y: 0 });
  // editor.zoomToBounds(bounds, { force: true });
});

const debouncedSaveSnapshot = debounce(useSaveSnapshot(store), 500);

const onMount = (editor: Editor) => {
  if (!editorRef.value) {
    // listen to changes and save snapshot after debouncing
    store.listen(debouncedSaveSnapshot, { source: "user", scope: "all" });
  }

  editorRef.value = editor;
};
</script>
