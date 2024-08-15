import { defineConfig } from "vite";
import { writeFile, mkdir } from "node:fs/promises"
import { dirname } from "node:path";

type StoreFileData = {
  path: string;
  content: string;
}

export default defineConfig({
  optimizeDeps: {
    include: ["veaury", "tldraw"],
  },
  plugins: [
    {
      name: 'tldraw-storage',
      configureServer(server) {
        server.ws.on('tldraw:store-file', async (data: StoreFileData, client) => {
          const docPath = __dirname + '/public/' + data.path;
          const folderPath = dirname(docPath);
          try {
            // use fetch to convert the dataURL to a blob
            const res = await fetch(data.content);
            const content = await res.blob();
            // write the blob to the file system
            await mkdir(folderPath, { recursive: true });
            await writeFile(docPath, content.stream());
          } catch (e) {
            console.error(e);
          }
        })
      },
    },
  ]
});
