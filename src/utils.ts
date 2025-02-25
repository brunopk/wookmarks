/// <reference types="./utils.d.ts" />

/**
 * Scan the bookmarks tree based on the BFS algorithm, making it useful for batch processing.
 * @param n Number of nodes to retrieve in result, which means that `nodes` array in `BookmarksTreeScanResult` will 
 *  contain between 0 and`maxNodes` entries.
 */
async function scanBookmarkTree(maxNodes: number): Promise<BookmarksTreeScanResult> {
  const tree = await chrome.bookmarks.getTree()
  console.log(tree)
  // TODO: continue here
}