import { defineConfig } from "vite";
import { writeFile, mkdir } from "node:fs/promises"
import { dirname } from "node:path";
import { cwd } from "node:process";

type StoreFileData = {
  path: string;
  content: string;
  type: 'file' | 'json';
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
	    let content: Blob;
	    if (data.type === 'json) {
	      // convert json data to a blob
	      content = new Blob([data.content], { type: 'application/json;charset=utf-8' });
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
