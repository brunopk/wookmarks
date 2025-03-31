import { useCallback, useMemo, useState } from 'react'
import { MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../style'
import Page from '../../Page'
import FolderList from './FolderList'
import MainMenu from './MainMenu'
import { BookmarkStatus } from '../../../enums'
import { UI } from '../../../types'

// TODO: Update page content changes whenever a folder on the left menu is clicked (folders which not contains subfolders cant't be rendered )

function Main() {
  const maxLevel = 3
  const lastLevelMaxLengthItem = 14
  const menuWidthInRem = maxLevel * MENU_FOLDER_TREE_INDENT_IN_REM + lastLevelMaxLengthItem
  const itemsById: { [id: number]: UI.Bookmark } = useMemo(
    () => ({
      11: { name: 'Folder 1', id: 11, isFolder: true, isAnySubFolder: true },
      5: { name: 'Folder 1 A', id: 5, isFolder: true, isAnySubFolder: true },
      2: { name: 'Folder 1 A I', id: 2, isFolder: true, isAnySubFolder: false },
      1: { name: 'Link 1 A I 1', id: 1, isFolder: false, isAnySubFolder: false },
      3: { name: 'Folder 1 A II', id: 3, isFolder: true, isAnySubFolder: false },
      4: { name: 'Folder 1 A III', id: 4, isFolder: true, isAnySubFolder: false },
      10: { name: 'Folder 1 B', id: 10, isFolder: true, isAnySubFolder: true },
      9: { name: 'Folder 1 B I', id: 9, isFolder: true, isAnySubFolder: false },
      6: { name: 'Link A', id: 6, isFolder: false, isAnySubFolder: false },
      7: { name: 'Link B', id: 7, isFolder: false, isAnySubFolder: false },
      8: { name: 'Link C', id: 8, isFolder: false, isAnySubFolder: false },
      12: { name: 'Folder 2', id: 12, isFolder: true, isAnySubFolder: false },
      13: { name: 'Link D', id: 13, isFolder: false, isAnySubFolder: false, status: BookmarkStatus.OFFLINE}
    }),
    []
  )
  const items: UI.Bookmark[] = useMemo(
    () => [
      {
        ...itemsById[11],
        children: [
          {
            ...itemsById[5],
            children: [
              {
                ...itemsById[2],
                children: [itemsById[1]]
              },
              itemsById[3],
              itemsById[4]
            ]
          },
          {
            ...itemsById[10],
            children: [
              {
                ...itemsById[9],
                children: [itemsById[6]]
              },
              itemsById[7],
              itemsById[8]
            ]
          },
          itemsById[13]
        ]
      },
      itemsById[12]
    ],
    [itemsById]
  )

  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  const handleSelectItem = useCallback((id: number) => {
    setSelectedItem(id)
  }, [])

  return (
    <Page
      menu={<MainMenu nodes={items} widthInRem={menuWidthInRem} />}
      menuWidthInRem={menuWidthInRem}
    >
      <FolderList items={items} selectedItem={selectedItem} onSelectItem={handleSelectItem} />
    </Page>
  )
}

export default Main
