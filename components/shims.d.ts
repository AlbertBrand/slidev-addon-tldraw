declare global {
  const __DEV__: boolean

  interface ImportMeta {
    hot: {
      send: (event: any, data: any) => void
    }
  }
}
export { }