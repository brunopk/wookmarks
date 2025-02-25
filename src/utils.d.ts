
type BookmarksTreeScanCheckpoint = {
  adjacentNodes: chrome.bookmarks.BookmarkTreeNode[]
  next: number
  queue: string[]
}

type BookmarksTreeScanResult = {
  nodes: chrome.bookmarks.BookmarkTreeNode
  checkpoint: BookmarksTreeScanCheckpoint
}