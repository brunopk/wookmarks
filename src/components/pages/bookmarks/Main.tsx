import { useCallback, useMemo, useState } from 'react'
import { MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../style'
import { BookmarksTreeItem, buildBookmarksTree, getChildren } from '../../../utils/tree-utils.ts'
import { Page, PageProps } from '../../Page'
import { Folder, FolderProps } from './Folder'
import MainMenu from './MainMenu'

/**************************************************************************************************/
/*                                           CONSTANTS                                            */
/**************************************************************************************************/

// TODO: this should be a global constant

const PAGE_SIZE = 8

/**************************************************************************************************/
/*                                       EXPORTED COMPONENT                                       */
/**************************************************************************************************/

function Main() {
  // TODO: calculate level dynamically from the tree
  const maxLevel = 3
  // TODO: calculate level lastLevelMaxLengthItem with the tree
  const lastLevelMaxLengthItem = 14
  const menuWidthInRem = maxLevel * MENU_FOLDER_TREE_INDENT_IN_REM + lastLevelMaxLengthItem
  // TODO: CONTINUE Update page content changes whenever a folder on the left menu is clicked (folders which not contains subfolders cant't be rendered )

  const bookmarksTree = useMemo(() => buildBookmarksTree(), [])
  const [bookmarksSubTree, setBookmarksSubTree] = useState(bookmarksTree)
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null)

  const handleSelectItemId = useCallback(
    (id: number) => {
      const subTree = getChildren(bookmarksSubTree, id)!
      setSelectedItemId(id)
      setBookmarksSubTree(subTree)
    },
    [bookmarksSubTree]
  )

  const pageProps: Omit<PageProps, 'children'> = {
    menu: <MainMenu bookmarksTree={bookmarksTree} widthInRem={menuWidthInRem} />,
    menuWidthInRem
  }

  const buildFolderProps: (bookmarksTreeItem: BookmarksTreeItem) => FolderProps = (
    bookmarksSubTreeItem
  ) => ({
    pageSize: PAGE_SIZE,
    bookmarksTreeItem: bookmarksSubTreeItem,
    selectedItemId,
    onSelectItemId: handleSelectItemId
  })

  /**
   * As all bookmarks (links or sub-folders) are consider to be children of the a root node,
   * there's always a folder (the root folder or any sub-folder) to render.
   **/

  // TODO: use HashRouter instead of BrowserRouter
  // TODO: use context to maintain bookmark tree avoid passing it as page props

  if (!bookmarksSubTree.children)
    throw new Error(`No bookmark subtree to display for folder "${bookmarksSubTree.name}"`)

  return (
    <Page {...pageProps}>
      {bookmarksSubTree.children.map((item, index) => (
        <Folder key={index} {...buildFolderProps(item)} />
      ))}
    </Page>
  )
}

export default Main
