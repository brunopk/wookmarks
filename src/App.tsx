import React from 'react'
import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { FolderOpen, Link, LinkOff } from '@mui/icons-material'
import Accordion from '@mui/material/Accordion'
import Badge from '@mui/material/Badge'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon  from '@mui/material/ListItemIcon'
import ListItemText  from '@mui/material/ListItemText'
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

function App() {
  const [isNewTab, setIsNewTab] = useState(false)
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div>
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
