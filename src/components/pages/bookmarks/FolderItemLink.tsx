import FolderItem from './FolderItem'

type LinkProps = {
  id: number
  text: string
  isLinkOff: boolean
  selected: boolean
  onSelect: (id: number) => void
}

function FolderItemLink({ id, text, isLinkOff, selected, onSelect }: LinkProps) {
  return (
    <FolderItem
      id={id}
      icon="link"
      text={text}
      color={isLinkOff ? 'error' : 'action'}
      typographySx={{ fontWeight: isLinkOff ? 'bold' : 'inherit' }}
      selected={selected}
      onSelect={onSelect}
    />
  )
}

export default FolderItemLink
