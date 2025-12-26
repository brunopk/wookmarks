/**************************************************************************************************/
/*                                           TYPES                                                */
/**************************************************************************************************/

type BookmarkTreeItemStatus = 'ONLINE' | 'TIME_OUT' | 'OFFLINE'

/**************************************************************************************************/
/*                                  EXPORTED FUNCTIONS AND TYPES                                  */
/**************************************************************************************************/

export type BookmarksTreeItem = {
  id: number
  name: string
  status?: BookmarkTreeItemStatus
  isFolder: boolean
  isAnySubFolder: boolean
  children?: BookmarksTreeItem[]
}

export type BookmarksTree = BookmarksTreeItem

/**
 * Navigates a tree to find a node
 * @param tree Root node that represents the tree that will be navigated to search the node
 * @param nodeId ID of the node to be searched to obtain its children
 * @returns Returns the node if it was found in the tree, otherwise returns `undefined`
 */
export function getChildren(
  tree: BookmarksTreeItem,
  nodeId: number
): BookmarksTreeItem | undefined {
  if (tree.id == nodeId) {
    return tree
  }

  let foundNode
  for (const child of tree.children ?? [])
    if ((foundNode = getChildren(child, nodeId))) return foundNode

  return foundNode
}

// TODO: modify in order to return a mocked tree if it's invoked in a development environment or the the real tree using Chrome libraries if it's invoked in production environment (Chrome extension)

/**
 * Generates the tree to represent the bookmarks structure.
 * @returns Returns the root node (it's not a real folder or link)
 */
export function buildBookmarksTree(): BookmarksTreeItem {
  return {
    id: 0,
    name: '',
    isFolder: true,
    isAnySubFolder: true,
    children: [
      {
        name: 'Folder 1',
        id: 11,
        isFolder: true,
        isAnySubFolder: true,
        children: [
          {
            name: 'Folder 1 A',
            id: 5,
            isFolder: true,
            isAnySubFolder: true,
            children: [
              {
                name: 'Folder 1 A I',
                id: 2,
                isFolder: true,
                isAnySubFolder: false,
                children: [
                  {
                    name: 'Link 1 A I 1',
                    id: 1,
                    status: 'ONLINE',
                    isFolder: false,
                    isAnySubFolder: false
                  }
                ]
              },
              {
                name: 'Folder 1 A II',
                id: 3,
                isFolder: true,
                isAnySubFolder: false
              },
              {
                name: 'Folder 1 A III',
                id: 4,
                isFolder: true,
                isAnySubFolder: false
              }
            ]
          },
          {
            name: 'Folder 1 B',
            id: 10,
            isFolder: true,
            isAnySubFolder: true,
            children: [
              {
                name: 'Folder 1 B I',
                id: 9,
                isFolder: true,
                isAnySubFolder: false,
                children: [
                  {
                    name: 'Link A',
                    id: 6,
                    status: 'OFFLINE',
                    isFolder: false,
                    isAnySubFolder: false
                  }
                ]
              },
              {
                name: 'Link B',
                id: 7,
                status: 'ONLINE',
                isFolder: false,
                isAnySubFolder: false
              },
              {
                name: 'Link C',
                id: 8,
                status: 'OFFLINE',
                isFolder: false,
                isAnySubFolder: false
              }
            ]
          },
          {
            name: 'Link D',
            id: 13,
            status: 'OFFLINE',
            isFolder: false,
            isAnySubFolder: false
          }
        ]
      },
      {
        name: 'Folder 2',
        id: 12,
        isFolder: true,
        isAnySubFolder: false
      }
    ]
  }
}
