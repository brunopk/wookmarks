import { FolderOpen } from '@mui/icons-material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import * as Mui from '@mui/material'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICON_MARGIN_RIGHT_IN_REM, MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../../style'

const IconButtonWithoutHover = Mui.styled(
  Mui.IconButton,
  {}
)<Mui.IconButtonProps>(() => ({
  '&:hover': { backgroundColor: 'inherit' }
}))

const ListItem = Mui.styled(
  Mui.ListItem,
  {}
)<Mui.ListItemProps>(({ theme }) => ({
  padding: '0.25rem',
  transition: theme.transitions.create('background-color'),
  cursor: 'pointer'
}))

const NoIcon = Mui.styled(
  ArrowDropDown,
  {}
)<Mui.IconButtonProps>(() => ({
  fill: 'none'
}))


type FolderTreeProps = {
  node: TreeNode
  level: number
  widthInRem: number
  isVisible: boolean
  selectedId: number
  setSelectedId: Dispatch<SetStateAction<number>>
}

function FolderTree({
  level,
  node,
  widthInRem,
  isVisible,
  selectedId,
  setSelectedId
}: FolderTreeProps) {
  const theme = Mui.useTheme()
  const [isOpen, setIsOpen] = useState(isVisible)
  const totalIndentationInRem = level * MENU_FOLDER_TREE_INDENT_IN_REM

  if (node.name == "Folder 2")
    console.log(node.children)
  
  const handleIconButtonClick = () => {
    if (node.children.length > 0) setIsOpen(!isOpen)
  }

  const handleListItemClick = () => {
    setSelectedId(node.id)
  }

  const listItemSx: Mui.SxProps = {
    width: `${widthInRem}rem`,
    display: `${isVisible ? 'flex' : 'none'}`,
    backgroundColor: `${node.id === selectedId ? theme.palette.action.selected : 'inherit'}`,
    '&:hover': {
      backgroundColor: `${node.id !== selectedId ? theme.palette.action.hover : theme.palette.action.selected}`
    }
  }

  useEffect(() => {
    if (!isVisible) setIsOpen(false)
  }, [isVisible])

  return (
    <>
      {typeof node.children !== 'undefined' ? (
      <ListItem onClick={handleListItemClick} sx={listItemSx}>
        <Mui.Box sx={{ width: `${totalIndentationInRem}rem` }} />
        {isOpen && node.children.length > 0 ? (
          <Mui.IconButton onClick={handleIconButtonClick}>
            <ArrowDropDown />
          </Mui.IconButton>
        ) : !isOpen && node.children.length != 0 ? (
          <IconButtonWithoutHover onClick={handleIconButtonClick}>
            <ArrowRightIcon />
          </IconButtonWithoutHover>
        ) : node.children.length == 0 ? (
          <IconButtonWithoutHover onClick={handleIconButtonClick}>
            <NoIcon />
          </IconButtonWithoutHover>
        ) : (
          <></>
        )}
        <FolderOpen sx={{ marginRight: `${ICON_MARGIN_RIGHT_IN_REM}rem` }} />
        <Typography>{node.name}</Typography>
      </ListItem>
      ): <></>}
      {typeof node.children !== 'undefined' && node.children.map((childNode) => (
        <FolderTree
          level={level + 1}
          node={childNode}
          widthInRem={widthInRem}
          isVisible={isOpen}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          key={childNode.id}
        />
      ))}
    </>
  )
}

export default FolderTree
