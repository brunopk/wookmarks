import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import SummarizeIcon from '@mui/icons-material/Summarize'
import SettingsIcon from '@mui/icons-material/Settings'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ReactNode, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BaseMenuContext} from './BaseMenuContext'
import {SETTINGS_PATH, STATS_PATH, BOOKMARKS_PATH} from '../config'

type BaseMenuProps = {
  children?: ReactNode
}

function BaseMenu({ children  }: BaseMenuProps) {
  const {widthInRem} = useContext(BaseMenuContext)

  const navigate = useNavigate()
  const handleBackClick = () => navigate(-1)

  const location = useLocation()

  const bookmarksTitle = 'Bookmarks'
  const handleStatsClick = () =>
    navigate(STATS_PATH, { state: { page: { title: statsTitle, isMenuOpen: true } } })

  const statsTitle = 'Stats'
  const handleBookmarksClick = () =>
    navigate(BOOKMARKS_PATH, { state: { page: { title: bookmarksTitle, isMenuOpen: true } } })

  const settingsTitle = 'Settings'
  const handleSettingsClick = () =>
    navigate(SETTINGS_PATH, { state: { page: { title: settingsTitle, isMenuOpen: true } } })
  
  return (
    <>
      <Divider sx={{ width: `${widthInRem == null ? 'auto' : widthInRem}rem` }} />
      {typeof children !== 'undefined' ? (
        <>
          <List>{children}</List>
          <Divider sx={{ width: `${widthInRem == null ? 'auto' : widthInRem}rem` }} />
        </>
      ) : (
        <></>
      )}
      <List sx={{ width: `${widthInRem == null ? 'auto' : widthInRem}rem` }}>
        <ListItem key={0} onClick={() => handleBookmarksClick()} disablePadding>
          <ListItemButton selected={location.pathname.startsWith(BOOKMARKS_PATH)}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary={bookmarksTitle} />
          </ListItemButton>
        </ListItem>
        <ListItem key={1} onClick={() => handleStatsClick()} disablePadding>
          <ListItemButton selected={location.pathname.startsWith(STATS_PATH)}>
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary={statsTitle} />
          </ListItemButton>
        </ListItem>
        <ListItem key={2} onClick={() => handleSettingsClick()} disablePadding>
          <ListItemButton selected={location.pathname.startsWith(SETTINGS_PATH)}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={settingsTitle} />
          </ListItemButton>
        </ListItem>
        <ListItem key={3} onClick={() => handleBackClick()} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="Back" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}

export default BaseMenu
