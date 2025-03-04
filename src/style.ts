import { SxProps, Theme } from "@mui/material"

export const ICON_MARGIN_RIGHT_IN_REM = 1

export const DEFAULT_MENU_ITEM_WIDTH_IN_REM = 1

export const MENU_FOLDER_TREE_INDENT_IN_REM = 1

export const hoverEffect = (theme: Theme): SxProps<Theme> => ({
  '&:hover': {
    backgroundColor:
      theme.palette.mode == 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
  },
  transition: 'background-color 0.3s',
  cursor: 'pointer'
})