
async function scanBookmarkTree(): Promise<ScanResult> {
  const result: ScanResult = {
    itemsMap: {},
    counters: {
      bookmarks: 0,
      folders: 0,
      online: 0,
      offline: 0,
      timeOut: 0
    }
  }
  const tree = await chrome.bookmarks.getTree()
  tree.forEach(() => {})
  // TODO: CONTINUE process tree and generate the corresponding object to store in local storage
  return result
}