import { memo } from 'react'
import Folder from './Folder'

type FolderListProps = {
  items: TreeNode[]
  selectedItem: number | null
  onSelectItem: (id: number) => void
  onDeletionModalOpen: () => void
}

function FolderList({ items, selectedItem, onSelectItem, onDeletionModalOpen }: FolderListProps) {
  const pageSize = 8

  const handleSelectItem = (id: number) => {
    onSelectItem(id)
  }

  const handleDeletionModalOpen = () => {
    onDeletionModalOpen()
  }

  return (
    <>
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
    </>
  )
}

export default memo(FolderList)
