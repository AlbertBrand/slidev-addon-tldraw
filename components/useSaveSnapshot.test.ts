import { vi, expect, test } from "vitest";
import { updateTldrawProps, updateAttrs } from "./useSaveSnapshot";

vi.mock("@slidev/client/composables/useSlideInfo.ts", () => ({}));
vi.mock("@slidev/client", () => ({}));

test("update props on open tag", () => {
  const content =
    '# First slide, show TLDraw\n\n<Tldraw class="w-216 h-5/8">\n</Tldraw>';
  expect(updateTldrawProps(content, { doc: "doc-123" })).toMatchInlineSnapshot(`
    "# First slide, show TLDraw

    <tldraw class="w-216 h-5/8" doc="doc-123">
    </tldraw>"
  `);
});

test("update props on selfclosed tag", () => {
  const content = '# First slide, show TLDraw\n\n<Tldraw class="w-216 h-5/8"/>';
  expect(updateTldrawProps(content, { doc: "doc-123" })).toMatchInlineSnapshot(`
    "# First slide, show TLDraw

    <tldraw class="w-216 h-5/8" doc="doc-123"></tldraw>"
  `);
});

test("updateAttrs selfclosed", () => {
  const result = updateAttrs("<Tldraw />", { doc: "doc-123" });
  expect(result).toBe('<tldraw doc="doc-123"></tldraw>');
});

test("updateAttrs sets", () => {
  const result = updateAttrs("<tldraw></tldraw>", { doc: "doc-123" });
  expect(result).toBe('<tldraw doc="doc-123"></tldraw>');
});

test("updateAttrs overwrites", () => {
  const result = updateAttrs('<tldraw doc="existing"></tldraw>', {
    doc: "doc-123",
  });
  expect(result).toBe('<tldraw doc="doc-123"></tldraw>');
});
