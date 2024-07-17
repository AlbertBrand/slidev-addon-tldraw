import { vi, expect, test } from 'vitest'
import { replaceContent } from './useSaveSnapshot'

vi.mock('@slidev/client/composables/useSlideInfo.ts', () => ({}))
vi.mock('@slidev/client', () => ({}))

test('replace open tag', () => {
  const content = '# First slide, show TLDraw\n\n<Tldraw class="w-216 h-5/8">\n</Tldraw>'
  expect(replaceContent(content, '{}')).toMatchInlineSnapshot(`
    "# First slide, show TLDraw

    <Tldraw class="w-216 h-5/8">
    {}
    </Tldraw>"
  `);
})

test('replace selfclosed tag', () => {
  const content = '# First slide, show TLDraw\n\n<Tldraw class="w-216 h-5/8"/>'
  expect(replaceContent(content, '{}')).toMatchInlineSnapshot(`
    "# First slide, show TLDraw

    <Tldraw class="w-216 h-5/8">
    {}
    </Tldraw>"
  `);
})

