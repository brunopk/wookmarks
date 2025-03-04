import { FolderOpen } from '@mui/icons-material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  Box,
  IconButton,
  IconButtonProps,
  ListItemProps,
  ListItem as MuiListItem,
  styled,
  SxProps,
  useTheme
} from '@mui/material'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
  cursor: 'pointer'
}))

const NoIcon = styled(
  ArrowDropDown,
  {}
)<IconButtonProps>(() => ({
  fill: 'none'
}))

type TreeNode = {
  name: string
  id: number
  children: TreeNode[]
}

type FolderTreeProps = {
  node: TreeNode
  level: number
  widthInRem: number
  isVisible: boolean,
  selectedId: number,
  setSelectedId: Dispatch<SetStateAction<number>>
}

type MenuProps = {
  node: TreeNode
  level: number
  widthInRem: number
}

function FolderTree({ level, node, widthInRem, isVisible, selectedId, setSelectedId }: FolderTreeProps) {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(isVisible)
  const totalIndentationInRem = level * MENU_FOLDER_TREE_INDENT_IN_REM

  const handleIconButtonClick = () => {
    if (node.children.length > 0) setIsOpen(!isOpen)
  }

  const handleListItemClick = () => {
    setSelectedId(node.id)
  }

  const listItemSx: SxProps = {
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
      <ListItem onClick={handleListItemClick} sx={listItemSx}>
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
        <FolderTree
          level={level + 1}
          node={childNode}
          widthInRem={widthInRem}
          isVisible={isOpen}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </>
  )
}

function Menu(menuProps: MenuProps) {
  const [selectedId, setSelectedId] = useState<number>(menuProps.node.id)

  return (
    <BaseMenu>
      <FolderTree {...menuProps} isVisible selectedId={selectedId} setSelectedId={setSelectedId}/>
    </BaseMenu>
  )
}

export default Menu
