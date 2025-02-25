import React from 'react'
import { useState } from 'react'
import { styled, ThemeProvider, createTheme } from '@mui/material/styles'
import { FolderOpen, Link, LinkOff } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import Accordion from '@mui/material/Accordion'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon  from '@mui/material/ListItemIcon'
import ListItemText  from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import RefreshIcon from '@mui/icons-material/Refresh'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import './App.css'

function openNewTab(setIsNewTab: React.Dispatch<React.SetStateAction<boolean>>) {
  setIsNewTab(true)
  chrome.tabs.create({
    url: chrome.runtime.getURL("index.html")
  })
}

async function scanBookmarkTree() {
  const tree = await chrome.bookmarks.getTree()
  console.log(tree)
}

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

function App() {
  const [isNewTab, setIsNewTab] = useState(false)
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
    components: {
      MuiIconButton: {
        styleOverrides: {
          root: {
            "&:focus-visible": {
              outline: "none"
            },
            "&:focus": {
              outline: "none"
            }
          }
        }
      }
    }
  });
  
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    }
  
  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Box sx={{ display: 'flex' }}>
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                  {
                    mr: 2,
                  },
                  open && { display: 'none' },
                ]}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div" sx={{ display: "flex", alignItems: "flex-end", flexGrow: 1 }}>
                Bookmarks
              </Typography>
              <IconButton color="inherit">
                <RefreshIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                sx={{
                  display: "flex",
                  alignItems: "center", 
                  justifyContent: "space-between", 
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)", 
                  },
                  transition: "background-color 0.3s"
                }}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                onMouseDown={(event) => event.preventDefault()} // Prevents focus
              >
                <FolderOpen sx={{marginRight: '1rem'}}/>
                <Typography component="span" sx={{ display: "flex", alignItems: "flex-end", flexGrow: 1 }}>
                  Folder 1
                </Typography>
                <Badge badgeContent={4} color="error" sx={{marginRight: '1rem'}}>
                  <LinkOff color="action" />
                </Badge>
              </AccordionSummary>
              <AccordionDetails>
                <List
                  sx={{ width: '100%'}}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <FolderOpen />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                  </ListItemButton>
                  <ListItemButton>
                      <ListItemIcon>
                        <Link />
                      </ListItemIcon>
                      <ListItemText primary="Drafts" />
                  </ListItemButton>
                </List>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                onMouseDown={(event) => event.preventDefault()} // Prevents focus
              >
                <FolderOpen sx={{marginRight: '1rem'}}/>
                <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                  Folder 2
                </Typography>
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  You are currently not an owner
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                  varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                  laoreet.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                onMouseDown={(event) => event.preventDefault()} // Prevents focus
              >
                <FolderOpen sx={{marginRight: '1rem'}}/>
                <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                  Folder 3
                </Typography>
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  Filtering has been entirely disabled for whole web server
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                  amet egestas eros, vitae egestas augue. Duis vel est augue.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Main>
        </Box>
      </div>
      <div className="card">
        {!isNewTab ? (
        <button onClick={() => openNewTab(setIsNewTab)}>
          Open new tab
        </button>
        ): (<></>)}
        <button onClick={() => scanBookmarkTree()}>
          Scan bookmarks
        </button>
      </div>
    </ThemeProvider>
  )
}

export default App
