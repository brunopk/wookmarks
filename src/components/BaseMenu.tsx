import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import SummarizeIcon from '@mui/icons-material/Summarize'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

type BaseMenuProps = {
  children: ReactNode
}

function BaseMenu({children}: BaseMenuProps) {
  const navigate = useNavigate()
  const handleBackClick = () => navigate(-1)

  return (
    <>
      <List>
        {children}
      </List>
      <Divider />
      <ListItem key={2} onClick={() => handleBackClick()} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary="Back" />
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default BaseMenu

/*
function BaseMenu({children}: BaseMenuProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const bookmarksTitle = 'Bookmarks'
  const bookmarksPath = '/bookmarks'
  const statsTitle = 'Stats'
  const statsPath = '/stats'
  const handleBackClick = () => navigate(-1)
  const handleStatsItemClick = () =>
    navigate(statsPath, { state: { page: { title: statsTitle, isMenuOpen: true } } })
  const handleBookmarksItemClick = () =>
    navigate(bookmarksPath, { state: { page: { title: bookmarksTitle, isMenuOpen: true } } })
  

  return (
    <>
      <List>
        <ListItem key={0} onClick={() => handleBookmarksItemClick()} disablePadding>
          <ListItemButton selected={location.pathname.startsWith(bookmarksPath)}>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary={bookmarksTitle} />
          </ListItemButton>
        </ListItem>
        <ListItem key={1} onClick={() => handleStatsItemClick()} disablePadding>
          <ListItemButton selected={location.pathname.startsWith(statsPath)} >
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary={statsTitle} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <ListItem key={2} onClick={() => handleBackClick()} disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <ArrowBackIcon />
          </ListItemIcon>
          <ListItemText primary="Back" />
        </ListItemButton>
      </ListItem>
    </>
  )
}
*/
