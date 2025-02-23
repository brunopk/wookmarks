/// <reference types="./utils.d.ts" />

/**
 * Scan the bookmarks tree based on the BFS algorithm, making useful for batch processing by setting a pre-fixed
 * `maxNodes` number.
 * @param n Number of nodes to retrieve in result
 */
async function scanBookmarkTree(maxNodes: number): Promise<BookmarksTreeScanResult> {
  const tree = await chrome.bookmarks.getTree()
  console.log(tree)
  // TODO: continue here
}