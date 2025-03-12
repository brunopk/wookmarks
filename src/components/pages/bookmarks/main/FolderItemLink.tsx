import FolderItem from './FolderItem'

type LinkProps = {
  text: string,
  isLinkOff: boolean
}

function FolderItemLink({ text, isLinkOff }: LinkProps) {
  return (
    <FolderItem
      icon='link'
      text={text}
      color={isLinkOff ? 'error' : 'action'}
      typographySx={{ fontWeight: isLinkOff ? 'bold' : 'inherit' }}
    />
  )
}

export default FolderItemLink