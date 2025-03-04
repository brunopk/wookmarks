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


/**
 * <ListItemButton>
      <ListItemIcon>
        <Link color={isLinkOff ? 'error' : 'action'} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography
            color={isLinkOff ? 'error' : 'action'}
            sx={{ fontWeight: isLinkOff ? 'bold' : 'inherit' }}
          >
            {text}
          </Typography>
        }
        sx={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1 }}
        color={isLinkOff ? 'error' : 'action'}
      />
    </ListItemButton>
 */