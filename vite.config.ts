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
          const docPath = __dirname + '/public/' + decodeURIComponent(data.path);
          const folderPath = dirname(docPath);
          try {
            // use fetch to convert the dataURL to a blob
            const res = await fetch(data.content);
            const content = await res.blob();
            // write the blob to the file system
            await mkdir(folderPath, { recursive: true });
            const stream = content.stream();
            await writeFile(docPath, stream);
            // pause for a moment to let the file system catch up
            await new Promise((resolve) => setTimeout(resolve, 100));
            // send a message back to the client
            server.ws.send('tldraw:file-stored', { path: data.path })
          } catch (e) {
            console.error(e);
          }
        })
      },
    },
  ]
});
