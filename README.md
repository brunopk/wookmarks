# Wookmarks

Chrome extension to manage bookmarks. It is implemented as a React application plus a [service worker](src/service-worker.ts). For more information about service workers refer to the [Google official documentation](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers).

## Usage

1. Build the code :

   ```shell
   yarn build
   ```

2. Install generated content in *dist/* folder through *chrome://extensions*

### Development with hot reloading

```bash
yarn dev
```

## Links

- [Creating a Chrome Extension with React and Vite (Boilerplate provided)](https://medium.com/@5tigerjelly/creating-a-chrome-extension-with-react-and-vite-boilerplate-provided-db3d14473bf6).
- [React + TypeScript + Vite](./doc/vite_readme.md)
- [Service workers](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers).
- [Cannot read property ‘onClicked’ of undefined [Fixed]](https://medium.com/@liang.shang/cannot-read-property-onclicked-of-undefined-fixed-6d5458f46563)
- [How to launch a new window in Google Chrome Extension](https://stackoverflow.com/questions/28799892/how-to-launch-a-new-window-in-google-chrome-extension).
