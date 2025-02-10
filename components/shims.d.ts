declare global {
  const __DEV__: boolean;

  interface ImportMeta {
    hot: {
      send: (event: string, data: any) => void;
      on: (event: string, callback: (data: any) => void) => void;
      off: (event: string, callback: (data: any) => void) => void;
    };
  }
}
export {};
