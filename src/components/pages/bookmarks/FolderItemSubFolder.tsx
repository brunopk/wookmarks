import FolderItem from './FolderItem'


type SubFolderProps = {
  id: number
  text: string
  selected: boolean
  onSelect: (id: number) => void
}

function SubFolder({ id, text, selected, onSelect }: SubFolderProps) {
  return (
    <FolderItem
      id={id}
      selected={selected}
      icon='folder'
      text={text}
      onSelect={onSelect}
    />
  )
}

export default SubFolder
