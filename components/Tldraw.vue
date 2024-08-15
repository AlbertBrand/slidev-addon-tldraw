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
  createTLStore,
  debounce,
  Editor,
  loadSnapshot,
  TLAssetStore,
  TLComponents,
  Tldraw as TldrawReact,
  uniqueId,
} from "tldraw";
import { ref, shallowRef, watchEffect } from "vue";
import { applyPureReactInVue } from "veaury";
import { useCssVar, useResizeObserver } from "@vueuse/core";
import { useSlideContext } from "@slidev/client";
import { useSaveSnapshot } from "./useSaveSnapshot";
import { useIsEditable } from "./useIsEditable";
import { encodeFileToDataURL } from "./encodeFileToDataURL.ts";
import "./tldraw.css";

export type Props = {
  doc: string;
};

// create Vue component from React component
const Tldraw = applyPureReactInVue(TldrawReact);

// get editable state from dev mode and slide view
const isEditable = useIsEditable();

// props for this component
const props = defineProps<Partial<Props>>();
let docPath = props.doc;

const createUniqueDocPath = () => "tldraw/doc-" + uniqueId() + ".json";

// create asset store
const assets: TLAssetStore = {
  async upload(_, file) {
    const objectName = `${uniqueId()}-${file.name}`;
    const imagePath = `tldraw/images/${encodeURIComponent(objectName)}`;
    const encodedFile = await encodeFileToDataURL(file);

    // store the asset on disk via the vite plugin
    if (import.meta.hot) {
      import.meta.hot.send("tldraw:store-file", {
        path: imagePath,
        content: encodedFile,
      });
    }

    return "/" + imagePath;
  },

  resolve(asset) {
    return asset.props.src;
  },
};

// create store
const store = createTLStore({ assets });

const fetchSnapshot = async (doc: string) => {
  const res = await fetch("/" + doc);
  const snapshot = await res.json();
  loadSnapshot(store, snapshot);

  // zoom to fit after snapshot is loaded
  updateZoom();
};

// load initial snapshot from doc path (if set)
if (docPath) {
  try {
    fetchSnapshot(docPath);
  } catch (e) {
    console.error("[slidev-addon-tldraw] Failed to load snapshot", e);
    // fallback to new doc, else the failed document is overwritten later
    docPath = createUniqueDocPath();
  }
} else {
  docPath = createUniqueDocPath();
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
const debouncedSaveSnapshot = debounce(
  useSaveSnapshot(store, { doc: docPath }),
  500
);
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
