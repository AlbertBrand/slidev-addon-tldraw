<template>
  <div class="absolute" :class="{ isEditable, isNotEditable: !isEditable }">
    <div class="inverse-transform" ref="wrapperEl">
      <Tldraw
        @mount="onMount"
        :autoFocus="false"
        :components="components"
        :store="store"
        :hideUi="!isEditable"
        :options="options"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  debounce,
  Editor,
  getUserPreferences,
  loadSnapshot,
  setUserPreferences,
  TLComponents,
  TldrawOptions,
  Tldraw as TldrawReact,
  TLUiMainMenuProps,
  uniqueId,
} from "tldraw";
import { reactive, ref, shallowRef, watch, Component } from "vue";
import { applyPureReactInVue, applyPureVueInReact } from "veaury";
import { useCssVar, useResizeObserver } from "@vueuse/core";
import { useDarkMode, useSlideContext } from "@slidev/client";
import { useSaveSnapshot } from "./useSaveSnapshot";
import { useIsEditable } from "./useIsEditable";
import { useStore } from "./useStore.ts";
import CustomMainMenuVue from "./CustomMainMenu.vue";
import "./tldraw.css";

type Props = {
  doc: string;
};

export type State = {
  doc?: string;
};

function toReact<C>(vueComponent: Component) {
  return applyPureVueInReact(vueComponent) as React.ComponentType<C>;
}

// create Vue component from React component
const Tldraw = applyPureReactInVue(TldrawReact);

// computed editable state
const isEditable = useIsEditable();

// props for this component
const props = defineProps<Partial<Props>>();

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

// unique doc path based on simple unique id
const createUniqueDocPath = () => "tldraw/doc-" + uniqueId() + ".json";

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
  MainMenu: toReact<TLUiMainMenuProps>(CustomMainMenuVue),
  PageMenu: null,
  DebugPanel: null,
};

// disable multiple pages
const options: Partial<TldrawOptions> = {
  maxPages: 1,
};

// hook up color scheme
const darkMode = useDarkMode();
watch(
  darkMode.isDark,
  (isDark) => {
    setUserPreferences({
      ...getUserPreferences(),
      colorScheme: isDark ? "dark" : "light",
    });
  },
  { immediate: true }
);

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
  editor.zoomToBounds(bounds, { force: true, immediate: true, inset: 0 });
};

// update zoom when wrapper resizes
const wrapperEl = ref<HTMLElement>();
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

  // initial zoom to fit
  updateZoom();
  editor.setCameraOptions({ isLocked: true });

  // always provide scale to component as CSS variable, even in print mode
  watch(
    context.$scale,
    (newScale) => {
      scale.value = String(newScale);
    },
    { immediate: true }
  );

  // update editor based on editable state
  watch(
    isEditable,
    (editable) => {
      // make readonly when not editable
      editor.updateInstanceState({
        isReadonly: !editable,
      });

      // focus editor when editable,
      // similar to https://tldraw.dev/examples/basic/multiple
      if (editable) {
        editor.focus();
      } else {
        editor.blur();
      }
    },
    { immediate: true }
  );
};
</script>
