namespace Bookmarks {
  type Item = {
    name: string
    id: number
    isFolder: boolean
    isAnySubFolder: boolean
    children?: Item[]
  }
}

namespace LocalStorage {
  type ItemsMap = {
    [id: number]: Bookmarks.Item
  }

  type Counters = {
    bookmarks: number
    folders: number
    online: number
    timeOut: number
    offline: number
  }
}

type ScanResult = {
  itemsMap: LocalStorage.ItemsMap
  counters: LocalStorage.Counters
}

type SnackBarMessage = {
  text: string
}
