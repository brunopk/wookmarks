import { useCallback, useMemo, useState } from 'react'
import useSnackBar from '../../../hooks/useSnackBar'
import { MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../style'
import DeletionModal from '../../modal/ConfirmationModal'
import Page from '../../Page'
import Folder from './main/Folder'
import SideBarMenu from './menu/Main'

// TODO: Update page content changes whenever a folder on the left menu is clicked (folders which not contains subfolders cant't be rendered )

// TODO: wrap  {items.map((item, index) => ( ...} into a FolderList component and use memo for it setting items (list) and selectedItem as dependency

// TODO: create a context to handle selection of folders instead of passing selectedItem and handleSelectItem 

function Main() {
  const pageSize = 8
  const maxLevel = 3
  const lastLevelMaxLengthItem = 14
  const menuWidthInRem = maxLevel * MENU_FOLDER_TREE_INDENT_IN_REM + lastLevelMaxLengthItem
  const itemsById: { [id: number]: TreeNode } = useMemo(() => ({
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
    13: { name: 'Link D', id: 13, isFolder: false, isAnySubFolder: false }
  }), [])
  const items: TreeNode[] = [
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
  ]

  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false)

  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  const { pushSnackBarMessage } = useSnackBar()

  const handleSelectItem = useCallback((id: number) => {
    setSelectedItem(id)
  }, [])

  const handleBookmarkDeletion = useCallback(() => {
    setIsDeletionModalOpen(false)
    if (selectedItem !== null)
      pushSnackBarMessage({ text: `Bookmark "${itemsById[selectedItem].name}" was deleted` })
  }, [pushSnackBarMessage, selectedItem, itemsById])

  const handleBookmarkDeletionAbort = useCallback(() => {
    setIsDeletionModalOpen(false)
  }, [])

  const handleDeletionModalOpen = useCallback(() => {
    setIsDeletionModalOpen(true)
  }, [])

  const generateDeletionModalText = (selectedItemId: number) => {
    return `Are you sure you want to delete "${itemsById[selectedItemId].name}"?`
  }

  return (
    <Page
      sideBarMenu={<SideBarMenu nodes={items} widthInRem={menuWidthInRem} />}
      menuWidthInRem={menuWidthInRem}
    >
      {items.map((item, index) => (
        <Folder
          folderName={item.name}
          id={item.id}
          key={index}
          items={item.children!}
          pageSize={pageSize}
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
          onDeletionModalOpen={handleDeletionModalOpen}
        />
      ))}
      {selectedItem !== null && (
        <DeletionModal
          open={isDeletionModalOpen}
          text={generateDeletionModalText(selectedItem)}
          onAccept={handleBookmarkDeletion}
          onCancel={handleBookmarkDeletionAbort}
        />
      )}
    </Page>
  )
}

export default Main
