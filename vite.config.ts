import { defineConfig } from "vite";
import { storeFile, type StoreFileData } from "./server/storeFile";

export default defineConfig({
  optimizeDeps: {
    include: ["slidev-addon-tldraw > veaury", "slidev-addon-tldraw > tldraw"],
  },
  plugins: [
    {
      name: "tldraw-storage",
      configureServer(server) {
        server.ws.on("tldraw:store-file", async (data: StoreFileData) => {
          // store the file on disk
          await storeFile(data);
          // send a message back to the client
          server.ws.send("tldraw:file-stored", { path: data.path });
        });
      },
    },
  ],
});
