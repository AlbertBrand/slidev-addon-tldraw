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
            await mkdir(folderPath, { recursive: true });
            await writeFile(docPath, data.content);
          } catch (e) {
            console.error(e);
          }
        })
      },
    },
  ]
});
