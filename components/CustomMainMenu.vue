<template>
  <DefaultMainMenu>
    <TldrawUiMenuSubmenu id="edit" label="menu.edit">
      <UndoRedoGroup />
      <ClipboardMenuGroup />
      <MiscMenuGroup />
      <TldrawUiMenuGroup id="lock">
        <ToggleLockMenuItem />
        <UnlockAllMenuItem />
      </TldrawUiMenuGroup>
      <TldrawUiMenuGroup id="select-all">
        <SelectAllMenuItem />
      </TldrawUiMenuGroup>
    </TldrawUiMenuSubmenu>

    <ExtrasGroup />
    <TldrawUiMenuGroup id="preferences">
      <TldrawUiMenuSubmenu id="preferences" label="menu.preferences">
        <TldrawUiMenuGroup id="preferences-actions">
          <ToggleSnapModeItem />
          <ToggleToolLockItem />
          <ToggleGridItem />
          <ToggleWrapModeItem />
          <ToggleFocusModeItem />
        </TldrawUiMenuGroup>
      </TldrawUiMenuSubmenu>
      <KeyboardShortcutsMenuItem />
    </TldrawUiMenuGroup>
  </DefaultMainMenu>
</template>

<script setup lang="ts">
import * as tldraw from "tldraw";
import { applyPureReactInVue as toVue } from "veaury";

const DefaultMainMenu = toVue(tldraw.DefaultMainMenu);
const TldrawUiMenuSubmenu = toVue(tldraw.TldrawUiMenuSubmenu);
const UndoRedoGroup = toVue(tldraw.UndoRedoGroup);
const ClipboardMenuGroup = toVue(tldraw.ClipboardMenuGroup);
const MiscMenuGroup = toVue(tldraw.MiscMenuGroup);
const ToggleLockMenuItem = toVue(tldraw.ToggleLockMenuItem);
const UnlockAllMenuItem = toVue(tldraw.UnlockAllMenuItem);
const SelectAllMenuItem = toVue(tldraw.SelectAllMenuItem);
const TldrawUiMenuGroup = toVue(tldraw.TldrawUiMenuGroup);
const ExtrasGroup = toVue(tldraw.ExtrasGroup);
const ToggleSnapModeItem = toVue(tldraw.ToggleSnapModeItem);
const ToggleToolLockItem = toVue(tldraw.ToggleToolLockItem);
const ToggleGridItem = toVue(tldraw.ToggleGridItem);
const ToggleWrapModeItem = toVue(tldraw.ToggleWrapModeItem);
const ToggleFocusModeItem = toVue(tldraw.ToggleFocusModeItem);
const KeyboardShortcutsMenuItem = toVue(tldraw.KeyboardShortcutsMenuItem);
</script>
