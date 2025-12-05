<template>
  <div
    class="absolute"
    :class="{
      isEditable,
      isNotEditable: !isEditable,
      isVisible,
      isNotVisible: !isVisible,
    }"
  >
    <div ref="wrapperEl" class="inverse-transform" @keydown="wrapperKeydown">
      <Tldraw
        :autoFocus="false"
        :components="components"
        :store="store"
        :hideUi="!isEditable"
        :options="options"
        :overrides="overrides"
        @mount="onMount"
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
  TLUiOverrides,
  uniqueId,
} from "tldraw";
import {
  reactive,
  ref,
  shallowRef,
  watch,
  Component,
  onBeforeUnmount,
} from "vue";
import { applyPureReactInVue, applyPureVueInReact } from "veaury";
import { useCssVar, useResizeObserver } from "@vueuse/core";
import { useDarkMode, useSlideContext } from "@slidev/client";
import { useSaveSnapshot } from "./useSaveSnapshot";
import { useIsEditable } from "./useIsEditable";
import { useStore } from "./useStore";
import CustomMainMenuVue from "./CustomMainMenu.vue";
import CustomToolbarVue from "./CustomToolbar.vue";
import { createRoot } from "react-dom/client";
import { setVeauryOptions } from "veaury";
import "./tldraw.css";

// react-dom >= 19, manually configure createRoot in the veaury configuration
setVeauryOptions({
  react: {
    createRoot,
  },
});

type Props = {
  doc: string;
};

export type State = {
  doc?: string;
};

// convert Vue component to React component
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

// customize/disable several UI components
const components: TLComponents = {
  MainMenu: toReact(CustomMainMenuVue),
  Toolbar: toReact(CustomToolbarVue),
  ContextMenu: null,
  HelpMenu: null,
  NavigationPanel: null,
  PageMenu: null,
  DebugPanel: null,
};

// disable multiple pages
const options: Partial<TldrawOptions> = {
  maxPages: 1,
};

// disable several actions
const overrides: TLUiOverrides = {
  actions(_, actions) {
    delete actions["export-all-as-json"];
    delete actions["export-all-as-png"];
    delete actions["export-all-as-svg"];
    delete actions["export-as-json"];
    delete actions["export-as-png"];
    delete actions["export-as-svg"];
    delete actions["zoom-in"];
    delete actions["zoom-out"];
    delete actions["zoom-to-100"];
    delete actions["zoom-to-fit"];
    delete actions["zoom-to-selection"];
    delete actions["toggle-dark-mode"];
    return actions;
  },
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

// slide context (exposing slide scale and others)
const context = useSlideContext();

// is tldraw React component mounted
const isMounted = ref(false);

// is tldraw React component visible
const isVisible = ref(false);

// zoom to fit bounds function
const updateZoom = () => {
  const editor = editorRef.value;
  if (!editor) return;

  // check if editor is visible
  const viewportScreenBounds = editor.getViewportScreenBounds();
  if (viewportScreenBounds.w <= 1 || viewportScreenBounds.h <= 1) {
    return;
  }

  // square bounds, size makes text still readable
  const bounds = {
    x: 0,
    y: 0,
    w: 800,
    h: 800,
  };
  editor.zoomToBounds(bounds, { force: true, immediate: true, inset: 0 });

  // set visible flag
  isVisible.value = true;
};

const wrapperKeydown = (e: KeyboardEvent) => {
  // prevent slidev from handling character keydown events when tldraw is focused
  if (
    e.key.length > 0 &&
    e.code !== "Backspace" &&
    e.code !== "Delete" &&
    !e.ctrlKey &&
    !e.metaKey &&
    !e.altKey
  ) {
    e.stopPropagation();
  }
};

// update zoom when wrapper resizes
const wrapperEl = ref<HTMLElement>();
useResizeObserver(wrapperEl, debounce(updateZoom, 200));

// create css var ref for slide scale
const scale = useCssVar("--slide-scale", wrapperEl);

// prepare save snapshot on change function
const debouncedSaveSnapshot = debounce(useSaveSnapshot(store, state), 500);

// perform actions after tldraw has mounted
const onMount = (editor: Editor) => {
  if (!isMounted.value) {
    // set mounted flag
    isMounted.value = true;

    // store ref to editor
    editorRef.value = editor;

    // listen to all changes
    store.listen(
      () => {
        // if still mounted, save snapshot after debounce period
        if (isMounted.value) {
          debouncedSaveSnapshot();
        }
      },
      { source: "user", scope: "all" }
    );
  }

  // lock camera
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

onBeforeUnmount(() => {
  // stop pending listeners on unmount
  isMounted.value = false;
});
</script>
