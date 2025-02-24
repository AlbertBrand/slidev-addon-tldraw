<template>
  <DefaultToolbar>
    <SelectToolbarItem />
    <DrawToolbarItem />
    <EraserToolbarItem />
    <ArrowToolbarItem />
    <LineToolbarItem />
    <TextToolbarItem />
    <NoteToolbarItem />
    <AssetToolbarItem />
    <RectangleToolbarItem />
    <EllipseToolbarItem />
    <TriangleToolbarItem />
    <DiamondToolbarItem />
    <HexagonToolbarItem />
    <OvalToolbarItem />
    <RhombusToolbarItem />
    <StarToolbarItem />
    <CloudToolbarItem />
    <XBoxToolbarItem />
    <CheckBoxToolbarItem />
    <ArrowLeftToolbarItem />
    <ArrowUpToolbarItem />
    <ArrowDownToolbarItem />
    <ArrowRightToolbarItem />
    <HighlightToolbarItem />
  </DefaultToolbar>
</template>

<script setup lang="ts">
import * as tldraw from "tldraw";
import { applyPureReactInVue as toVue } from "veaury";

const DefaultToolbar = toVue(tldraw.DefaultToolbar);
const SelectToolbarItem = toVue(tldraw.SelectToolbarItem);
const DrawToolbarItem = toVue(tldraw.DrawToolbarItem);
const EraserToolbarItem = toVue(tldraw.EraserToolbarItem);
const ArrowToolbarItem = toVue(tldraw.ArrowToolbarItem);
const TextToolbarItem = toVue(tldraw.TextToolbarItem);
const NoteToolbarItem = toVue(tldraw.NoteToolbarItem);
const AssetToolbarItem = toVue(tldraw.AssetToolbarItem);
const RectangleToolbarItem = toVue(tldraw.RectangleToolbarItem);
const EllipseToolbarItem = toVue(tldraw.EllipseToolbarItem);
const TriangleToolbarItem = toVue(tldraw.TriangleToolbarItem);
const DiamondToolbarItem = toVue(tldraw.DiamondToolbarItem);
const HexagonToolbarItem = toVue(tldraw.HexagonToolbarItem);
const OvalToolbarItem = toVue(tldraw.OvalToolbarItem);
const RhombusToolbarItem = toVue(tldraw.RhombusToolbarItem);
const StarToolbarItem = toVue(tldraw.StarToolbarItem);
const CloudToolbarItem = toVue(tldraw.CloudToolbarItem);
const XBoxToolbarItem = toVue(tldraw.XBoxToolbarItem);
const CheckBoxToolbarItem = toVue(tldraw.CheckBoxToolbarItem);
const ArrowLeftToolbarItem = toVue(tldraw.ArrowLeftToolbarItem);
const ArrowUpToolbarItem = toVue(tldraw.ArrowUpToolbarItem);
const ArrowDownToolbarItem = toVue(tldraw.ArrowDownToolbarItem);
const ArrowRightToolbarItem = toVue(tldraw.ArrowRightToolbarItem);
const LineToolbarItem = toVue(tldraw.LineToolbarItem);
const HighlightToolbarItem = toVue(tldraw.HighlightToolbarItem);
</script>
