<template>
  <div class="absolute">
    <Tldraw :style="inverseTransformStyle" />
  </div>
</template>

<script setup lang="ts">
import { Tldraw as TldrawReact } from 'tldraw'
import { ref } from 'vue';
import { createReactWrapper } from 'vue-react-wrapper'
import './tldraw.css'

const props = ref({
  persistenceKey: 'slidev-tldraw',
  // hideUi: true,
})

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

const Tldraw = createReactWrapper(TldrawReact, props)
</script>