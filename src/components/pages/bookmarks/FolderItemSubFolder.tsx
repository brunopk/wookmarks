import FolderItem from './FolderItem'


type SubFolderProps = {
  text: string
}

function SubFolder({ text }: SubFolderProps) {
  return (
    <FolderItem
      icon='folder'
      text={text}
    />
  )
}

export default SubFolder
