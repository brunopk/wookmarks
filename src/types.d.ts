declare namespace BookmarkScanning {
  type Folder = {
    id: string
    name: string
    online: number
    timeOut: number
    offline: number
  }

  type Link = {
    url: string
    statusCode?: number
    parentFolderId: string
  }

  type LinksMap = {
    [id: string]: Link
  }

  type FoldersMap = {
    [id: string]: Folder
  }

  export type Counters = {
    totalBookmarks: number
    online: number
    timeOut: number
    offline: number
  }

  type Result = {
    isFinished: boolean
    countersReady: boolean
    folders: BookmarkScanning.FoldersMap
    links: BookmarkScanning.LinksMap
    counters: BookmarkScanning.Counters
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

  namespace Scanning {
    type Stage =
      | 'AWAITING_TRIGGERING'
      | 'INITIATING_PROCESS'
      | 'OBTAINING_COUNTERS'
      | 'PROBING_URLS'
      | 'FINISHING'

    type ScanningResult = {
      folders: BookmarkScanning.FoldersMap
      links: BookmarkScanning.LinksMap
      counters: BookmarkScanning.Counters
    }

    type State = {
      stage: Stage
      startedAt?: Date
      elapsedTime: number
      isFinished: boolean
      scanningResult?: ScanningResult
    }

    type ModalProgressBarProps = {
      value: number
      show: boolean
      showValue: boolean
    }
  }
}
