import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { cwd } from "node:process";

export type StoreFileData = {
  path: string;
  content: string;
  type: "file" | "json";
};

export async function storeFile(data: StoreFileData) {
  const docPath = cwd() + "/public/" + decodeURIComponent(data.path);
  const folderPath = dirname(docPath);
  try {
    let content: Blob;
    if (data.type === "json") {
      // convert json data to a blob
      content = new Blob([data.content], {
        type: "application/json;charset=utf-8",
      });
    } else {
      // use fetch to convert the dataURL to a blob
      const res = await fetch(data.content);
      content = await res.blob();
    }
    // write the blob to the file system
    await mkdir(folderPath, { recursive: true });
    await writeFile(docPath, content.stream());
    // pause for a moment to let the file system catch up
    await new Promise((resolve) => setTimeout(resolve, 200));
  } catch (e) {
    console.error(e);
  }
}
