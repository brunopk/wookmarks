import { FolderOpen } from '@mui/icons-material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  Box,
  IconButton,
  IconButtonProps,
  ListItemProps,
  ListItem as MuiListItem,
  styled
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { ICON_MARGIN_RIGHT_IN_REM, MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../style'
import BaseMenu from '../../BaseMenu'

const IconButtonWithoutHover = styled(
  IconButton,
  {}
)<IconButtonProps>(() => ({
  '&:hover': { backgroundColor: 'inherit' }
}))

const ListItem = styled(
  MuiListItem,
  {}
)<ListItemProps>(({ theme }) => ({
  padding: '0.25rem',
  transition: theme.transitions.create('background-color'),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}))

const NoIcon = styled(
  ArrowDropDown,
  {}
)<IconButtonProps>(() => ({
  fill: 'none'
}))

type TreeNode = {
  name: string
  children: TreeNode[]
}

type FolderTreeProps = {
  node: TreeNode
  level: number
  widthInRem: number
  isVisible: boolean
}

type MenuProps = {
  node: TreeNode
  level: number
  widthInRem: number
}

function FolderTree({ level, node, widthInRem, isVisible }: FolderTreeProps) {
  const [isOpen, setIsOpen] = useState(isVisible)
  const totalIndentationInRem = level * MENU_FOLDER_TREE_INDENT_IN_REM

  const handleIconButtonClick = () => {
    if (node.children.length > 0) setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!isVisible) setIsOpen(false)
  }, [isVisible])

  console.log(isOpen)

  return (
    <>
      <ListItem
        sx={{
          width: `${widthInRem}rem`,
          display: `${isVisible ? 'flex' : 'none'}`
        }}
      >
        <Box sx={{ width: `${totalIndentationInRem}rem` }} />
        {isOpen && node.children.length > 0 ? (
          <IconButton onClick={handleIconButtonClick}>
            <ArrowDropDown />
          </IconButton>
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
      {node.children.map((childNode) => (
        <FolderTree level={level + 1} node={childNode} widthInRem={widthInRem} isVisible={isOpen} />
      ))}
    </>
  )
}

function Menu(menuProps: MenuProps) {
  return (
    <BaseMenu>
      <FolderTree {...menuProps} isVisible />
    </BaseMenu>
  )
}

export default Menu
