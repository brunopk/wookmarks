async function scanBookmarkTreeRecursive(
  partialResult: BookmarkScanningResult,
  currentNode: chrome.bookmarks.BookmarkTreeNode
) {
  if (typeof currentNode.url !== 'undefined') {
    partialResult.counters.bookmarks++
  } else {
    partialResult.folders[currentNode.id] = {
      id: currentNode.id,
      name: currentNode.title,
      online: 0,
      offline: 0,
      timeOut: 0
    }
  }

  currentNode.children?.forEach((childNode) => {
    scanBookmarkTreeRecursive(partialResult, childNode)
  })
}

/**
 * Probes links 
 * @param link URL that will be probed
 * @return status code 
 */
async function probeLink(link: string): Promise<number> {
  // TODO: implement 
  const t = Math.random() * 1000
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const n = Math.random()
      if (n <= 0.5) {
        resolve(200)
      } else if (n > 0.5) {
        reject(500)
      }
    }, t)
  })

}

export async function* scanBookmarkTree(): AsyncGenerator<BookmarkScanningResult, void, unknown> {
  const partialResult: BookmarkScanningResult = {
    countersReady: false,
    folders: {},
    links: {},
    counters: {
      bookmarks: 0,
      online: 0,
      offline: 0,
      timeOut: 0
    }
  }

  const tree = await chrome.bookmarks.getTree()
  
  await Promise.all(tree.map(node => scanBookmarkTreeRecursive(partialResult, node)))

  yield {...partialResult, countersReady: true}

  // TODO: CONTINUE : use probeLink

}
