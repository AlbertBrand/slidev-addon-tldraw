<template>
  <div class="absolute">
    <div :style="inverseTransformStyle">
      <Tldraw persistenceKey="slidev-tldraw" :hideUi="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tldraw as TldrawReact } from 'tldraw'
import { applyReactInVue } from 'veaury'
import './tldraw.css'

// the slide is CSS transformed at parent level, and Tldraw does not support such transformation
// so we need to inverse the transformation to make Tldraw work correctly
const inverseTransformStyle = { 
  width: 'calc(var(--slidev-slide-scale) * 100%)', 
  height: 'calc(var(--slidev-slide-scale) * 100%)', 
  transform: `
    scale(calc(1 / var(--slidev-slide-scale))) 
    translate(calc(calc(var(--slidev-slide-scale) - 1) * -50%), calc(calc(var(--slidev-slide-scale) - 1) * -50%))
  ` 
}

const Tldraw = applyReactInVue(TldrawReact)
</script>