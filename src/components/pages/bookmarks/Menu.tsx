import { FolderOpen } from '@mui/icons-material'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { MENU_FOLDER_TREE_INDENT_IN_REM, ICON_MARGIN_RIGHT_IN_REM } from '../../../style-constants'
import BaseMenu from '../../BaseMenu'

type TreeNode = {
  name: string
  isOpen: boolean
  children: TreeNode[]
}

type FolderTreeProps = {
  node: TreeNode
  level: number
  widthInRem: number 
}

type MenuProps = FolderTreeProps

function FolderTree({ level, node, widthInRem }: FolderTreeProps) {
  const display = `${node.isOpen ? 'flex' : 'flex'}`
  const totalIndentationInRem = level * MENU_FOLDER_TREE_INDENT_IN_REM

  return (
    <>
      <ListItem
        disablePadding
        sx={{ width: `${widthInRem}rem`, display: `${display}` }}
      >
        <Box sx={{ width: `${totalIndentationInRem}rem` }} />
        {node.isOpen && node.children.length > 0 ? (
          <IconButton>
            <ArrowDropDown />
          </IconButton>
        ) : !node.isOpen || node.children.length == 0 ? (
          <IconButton>
            <ArrowRightIcon sx={{fill: `${node.children.length === 0 ? 'none' : 'inherit'}`}}/>
          </IconButton>
        ) : (
          <></>
        )}
        <FolderOpen sx={{ marginRight: `${ICON_MARGIN_RIGHT_IN_REM}rem` }} />
        <Typography>{node.name}</Typography>
      </ListItem>
      {node.children.map((childNode) => (
        <FolderTree level={level + 1} node={childNode} widthInRem={widthInRem}/>
      ))}
    </>
  )
}

function Menu(menuProps: MenuProps) {
  return (
    <BaseMenu>
      <FolderTree {...menuProps} />
    </BaseMenu>
  )
}

export default Menu
