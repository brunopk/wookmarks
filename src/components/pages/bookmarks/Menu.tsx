import { FolderOpen } from '@mui/icons-material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { FOLDER_OPEN_ICON_MARGIN_RIGHT_IN_REM } from '../../../style-constants'
import BaseMenu from '../../BaseMenu'

type TreeNode = {
  name: string
  isOpen: boolean
  children: TreeNode[]
}

type FolderTreeProps = {
  node: TreeNode
  level: number
  indentationInRem: number
}

type MenuProps = FolderTreeProps

function FolderTree({ level, node, indentationInRem }: FolderTreeProps) {
  const visibility = `${node.isOpen ? 'visible' : 'hidden'}`
  const totalIndentationInRem = level * indentationInRem
  const listItemWidthInRem = indentationInRem + node.name.length

  return (
    <>
      <ListItem
        disablePadding
        sx={{ width: `${listItemWidthInRem}rem`, visibility: `${visibility}` }}
      >
        <Box sx={{ width: `${totalIndentationInRem}rem` }} />
        {node.isOpen && node.children.length > 0 ? (
          <IconButton>
            <ArrowDropDown />
          </IconButton>
        ) : !node.isOpen ? (
          <IconButton>
            <ArrowRightIcon />
          </IconButton>
        ) : (
          <></>
        )}
        <FolderOpen sx={{ marginRight: `${FOLDER_OPEN_ICON_MARGIN_RIGHT_IN_REM}rem` }} />
        <Typography>{node.name}</Typography>
      </ListItem>
      {node.children.forEach((childNode) => (
        <FolderTree indentationInRem={indentationInRem} level={level + 1} node={childNode} />
      ))}
    </>
  )
}

// TODO: import this in Main an test the component 
// TODO: generate the structure (MenuProps) and calculate the longest text (in the deepest level)+ the deepest level, to set the width for the menu items in BaseMenu

function Menu(menuProps: MenuProps) {
  return (
    <BaseMenu>
      <FolderTree {...menuProps} />
    </BaseMenu>
  )
}

export default Menu
