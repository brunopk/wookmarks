import { memo } from 'react'
import Folder from './Folder'

type FolderListProps = {
  items: UI.Bookmark[]
  selectedItem: number | null
  onSelectItem: (id: number) => void
}

function FolderList({ items, selectedItem, onSelectItem }: FolderListProps) {
  const pageSize = 8

  const handleSelectItem = (id: number) => {
    onSelectItem(id)
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
        />
      ))}
    </>
  )
}

export default memo(FolderList)
