function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

function batchProbeLinks(partialResult: BookmarkScanning.Result) {
  Object.keys(partialResult.links).map(() => {
    probeLink().then((statusCode) => {
      if (statusCode < 300) {
        partialResult.counters.online++
      } else {
        partialResult.counters.offline++
      }
    })
  })
}

async function bookmarkTreeRecursiveScanning(
  partialResult: BookmarkScanning.Result,
  node: chrome.bookmarks.BookmarkTreeNode
) {
  if (typeof node.url !== 'undefined') {
    partialResult.counters.totalBookmarks++
    partialResult.links[node.id] = {
      url: node.url,
      parentFolderId: node.parentId!
    }
  } else {
    partialResult.folders[node.id] = {
      id: node.id,
      name: node.title,
      online: 0,
      offline: 0,
      timeOut: 0
    }
  }

  node.children?.forEach((childNode) => {
    bookmarkTreeRecursiveScanning(partialResult, childNode)
  })
}

async function bookmarkTreeScanning(
  tree: chrome.bookmarks.BookmarkTreeNode[]
): Promise<BookmarkScanning.Result> {
  const partialResult: BookmarkScanning.Result = {
    isFinished: false,
    countersReady: false,
    folders: {},
    links: {},
    counters: {
      totalBookmarks: 0,
      online: 0,
      offline: 0,
      timeOut: 0
    }
  }
  await Promise.all(tree.map((node) => bookmarkTreeRecursiveScanning(partialResult, node)))

  return partialResult
}

/**
 * Probes a link
 * @param url URL that will be probed
 * @return status code will be set in `link.statusCode`
 */
async function probeLink(): Promise<number> {
  // TODO: implement real function
  const t = Math.random() * 8000

  return new Promise((resolve) => {
    setTimeout(() => {
      const n = Math.random()
      if (n <= 0.5) {
        resolve(500)
      } else if (n > 0.5) {
        resolve(200)
      }
    }, t)
  })
}

async function* yieldPartialUpdate(
  partialResult: BookmarkScanning.Result
): AsyncGenerator<BookmarkScanning.Result, void, unknown> {
  let processedLinks =
    partialResult.counters.online + partialResult.counters.offline + partialResult.counters.timeOut
  do {
    processedLinks =
      partialResult.counters.online +
      partialResult.counters.offline +
      partialResult.counters.timeOut
    if (processedLinks < partialResult.counters.totalBookmarks) {
      await delay(1000)
      yield structuredClone(partialResult)
    }
  } while (processedLinks < partialResult.counters.totalBookmarks)
}

export async function* scanBookmarkTree(): AsyncGenerator<BookmarkScanning.Result, void, unknown> {
  let partialResult

  const tree = await chrome.bookmarks.getTree()
  partialResult = await bookmarkTreeScanning(tree)
  yield { ...structuredClone(partialResult), countersReady: true }

  batchProbeLinks(partialResult)

  for await (partialResult of yieldPartialUpdate(partialResult)) {
    yield partialResult
  }

  yield { ...structuredClone(partialResult), isFinished: true }

  // TODO: update counters for all folders
}
