import { createTLStore, TLAssetStore, uniqueId } from "tldraw";

// convert files to dataURLs to send them as a string
const encodeFileToDataURL = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// custom asset store that communicates with the vite plugin
const assets: TLAssetStore = {
  async upload(_, file) {
    const objectName = `${uniqueId()}-${file.name}`;
    const imagePath = `tldraw/assets/${encodeURIComponent(objectName)}`;
    const encodedFile = await encodeFileToDataURL(file);

    // store the asset on disk via the vite plugin
    if (import.meta.hot) {
      import.meta.hot.send("tldraw:store-file", {
        path: imagePath,
        content: encodedFile,
	type: 'file',
      });

      // wait for the file to be stored
      await new Promise((resolve) => {
        const callback = (data: { path: string }) => {
          // TODO check if the path matches?
          import.meta.hot.off("tldraw:file-stored", callback);
          resolve(data.path);
        };
        import.meta.hot.on("tldraw:file-stored", callback);
      });
    }

    return "/" + imagePath;
  },

  resolve(asset) {
    return asset.props.src;
  },
};

export function useStore() {
  return createTLStore({ assets });
}
