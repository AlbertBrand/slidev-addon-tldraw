import { defineConfig } from "vite";
import { writeFile, mkdir } from "node:fs/promises"
import { dirname } from "node:path";
import { cwd } from "node:process";

type StoreFileData = {
  path: string;
  content: string;
}

export default defineConfig({
  optimizeDeps: {
    include: [
      "slidev-addon-tldraw > veaury",
      "slidev-addon-tldraw > tldraw"
    ],
  },
  plugins: [
    {
      name: 'tldraw-storage',
      configureServer(server) {
        server.ws.on('tldraw:store-file', async (data: StoreFileData, client) => {
          const docPath = cwd() + '/public/' + decodeURIComponent(data.path);
          const folderPath = dirname(docPath);
          try {
            // use fetch to convert the dataURL to a blob
            const res = await fetch(data.content);
            const content = await res.blob();
            // write the blob to the file system
            await mkdir(folderPath, { recursive: true });
            await writeFile(docPath, content.stream());
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
