<template>
  <div class="absolute">
    <div class="inverse-transform" ref="wrapperEl">
      <Tldraw
        @mount="onMount"
        :components="components"
        :store="store"
        :hideUi="!isEditable"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  debounce,
  Editor,
  loadSnapshot,
  TLComponents,
  Tldraw as TldrawReact,
  uniqueId,
} from "tldraw";
import { reactive, ref, shallowRef, watchEffect } from "vue";
import { applyPureReactInVue } from "veaury";
import { useCssVar, useResizeObserver } from "@vueuse/core";
import { useSlideContext } from "@slidev/client";
import { useSaveSnapshot } from "./useSaveSnapshot";
import { useIsEditable } from "./useIsEditable";
import { useStore } from "./useStore.ts";
import "./tldraw.css";

type Props = {
  doc: string;
};

export type State = {
  doc?: string;
};

// create Vue component from React component
const Tldraw = applyPureReactInVue(TldrawReact);

// get editable state from dev mode and slide view
const isEditable = useIsEditable();

// props for this component
const props = defineProps<Partial<Props>>();

const createUniqueDocPath = () => "tldraw/doc-" + uniqueId() + ".json";

// internal state
const state = reactive<State>({
  doc: props.doc,
});

// create store
const store = useStore();

const fetchSnapshot = async (doc: string) => {
  const res = await fetch("/" + doc);
  const snapshot = await res.json();
  loadSnapshot(store, snapshot);

  // zoom to fit after snapshot is loaded
  updateZoom();
};

// load initial snapshot from doc path (if set)
if (props.doc) {
  // TODO wait on fetch
  fetchSnapshot(props.doc).catch((e) => {
    console.error("[slidev-addon-tldraw] Failed to load snapshot", e);
    // fallback to new doc, else the failed document is overwritten later
    state.doc = createUniqueDocPath();
  });
} else {
  state.doc = createUniqueDocPath();
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

  // square bounds, size makes text still readable
  const bounds = {
    x: 0,
    y: 0,
    w: 800,
    h: 800,
  };
  editor.setCameraOptions({
    isLocked: true,
    constraints: {
      bounds,
      behavior: "inside",
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
const debouncedSaveSnapshot = debounce(useSaveSnapshot(store, state), 500);
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
