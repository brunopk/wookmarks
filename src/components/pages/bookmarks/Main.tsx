import { useCallback, useState } from 'react'
import { MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../style'
import DeletionModal from '../../modal/ConfirmationModal'
import Page from '../../Page'
import Folder from './main/Folder'
import SideBarMenu from './menu/Main'

// TODO: Implement selection of folders in side menu

function Main() {
  const pageSize = 8
  const maxLevel = 3
  const lastLevelMaxLengthItem = 14
  const menuWidthInRem = maxLevel * MENU_FOLDER_TREE_INDENT_IN_REM + lastLevelMaxLengthItem
  const items: TreeNode[] = [
    {
      name: 'Folder 1',
      id: 11,
      isFolder: true,
      children: [
        {
          name: 'Folder 1 A',
          id: 5,
          isFolder: true,
          children: [
            {
              name: 'Folder 1 A I',
              id: 2,
              isFolder: true,
              children: [{ name: 'Link 1 A I 1', id: 1, isFolder: false }]
            },
            { name: 'Folder 1 A II', id: 3, isFolder: true, children: [] },
            { name: 'Folder 1 A III', id: 4, isFolder: true, children: [] }
          ]
        },
        {
          name: 'Folder 1 B',
          id: 10,
          isFolder: true,
          children: [
            {
              name: 'Folder 1 B I',
              id: 9,
              isFolder: true,
              children: [{ name: 'Link 1 B I 1', id: 6, isFolder: false }]
            },
            { name: 'Link 1 B II', id: 7, isFolder: false },
            { name: 'Link 1 B III', id: 8, isFolder: false }
          ]
        }
      ]
    },
    {
      name: 'Folder 2',
      id: 12,
      isFolder: true
    }
  ]

  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false)

  const [selectedFolderItem, setSelectedFolderItem] = useState<number | null>(null)

  const handleSelectFolderItem = useCallback((id: number) => {
    setSelectedFolderItem(id)
  }, [])

  const handleBookmarkDeletion = useCallback(() => {
    setIsDeletionModalOpen(false)
  }, [])

  const handleBookmarkDeletionAbort = useCallback(() => {
    setIsDeletionModalOpen(false)
  }, [])

  const handleDeletionModalOpen = useCallback(() => {
    setIsDeletionModalOpen(true)
  }, [])

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
          selectedItem={selectedFolderItem}
          onSelectItem={handleSelectFolderItem}
          onDeletionModalOpen={handleDeletionModalOpen}
        />
      ))}
      <DeletionModal
        open={isDeletionModalOpen}
        text="Are you sure you want to delete 'Link 1'"
        onAccept={handleBookmarkDeletion}
        onCancel={handleBookmarkDeletionAbort}
      />
    </Page>
  )
}

export default Main
