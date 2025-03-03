import { FolderOpen } from '@mui/icons-material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { useState, useEffect } from 'react'
import { ICON_MARGIN_RIGHT_IN_REM, MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../style-constants'
import BaseMenu from '../../BaseMenu'


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

function FolderTree({ level, node, widthInRem, isVisible}: FolderTreeProps) {
  const [isOpen, setIsOpen] = useState(isVisible)
  const totalIndentationInRem = level * MENU_FOLDER_TREE_INDENT_IN_REM

  const handleIconButtonClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!isVisible)
      setIsOpen(false)
  }, [isVisible])

  console.log(isOpen)

  return (
    <>
      <ListItem
        disablePadding
        sx={{ width: `${widthInRem}rem`, display: `${isVisible ? 'flex' : 'none'}` }}
      >
        <Box sx={{ width: `${totalIndentationInRem}rem` }} />
        {isOpen && node.children.length > 0 ? (
          <IconButton onClick={handleIconButtonClick}>
            <ArrowDropDown />
          </IconButton>
        ) : !isOpen || node.children.length == 0 ? (
          <IconButton onClick={handleIconButtonClick} sx={{'&:hover': {backgroundColor: 'inherit'}}}>
            <ArrowRightIcon sx={{ fill: `${node.children.length === 0 ? 'none' : 'white'}` }} />
          </IconButton>
        ) : (
          <></>
        )}
        <FolderOpen sx={{ marginRight: `${ICON_MARGIN_RIGHT_IN_REM}rem` }} />
        <Typography>{node.name}</Typography>
      </ListItem>
      {node.children.map((childNode) => (
        <FolderTree level={level + 1} node={childNode} widthInRem={widthInRem} isVisible={isOpen}/>
      ))}
    </>
  )
}

function Menu(menuProps: MenuProps) {
  return (
    <BaseMenu>
      <FolderTree {...menuProps} isVisible/>
    </BaseMenu>
  )
}

export default Menu
