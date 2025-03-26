declare namespace BookmarkScanning {
  type Folder = {
    id: string
    name: string
    online: number
    timeOut: number
    offline: number
  }

  type Link = {
    statusCode: number
  }

  type Counters = {
    bookmarks: number
    online: number
    timeOut: number
    offline: number
  }
}

declare namespace LocalStorage {
  type Folder = {
    id: string
    name: string
    online: number
    timeOut: number
    offline: number
  }

  type Counters = {
    bookmarks: number
    online: number
    timeOut: number
    offline: number
  }
}

declare namespace UI {
  type SnackBarMessage = {
    text: string
  }

  type Bookmark = {
    name: string
    id: number
    isFolder: boolean
    isAnySubFolder: boolean
    children?: Item[]
  }
}


type BookmarkScanningResult = {
  countersReady: boolean
  folders: { [id: string]: BookmarkScanning.Folder }
  links: { [id: string]: BookmarkScanning.Link }
  counters: BookmarkScanning.Counters
}
