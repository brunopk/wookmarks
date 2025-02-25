import React, {ReactNode} from 'react'
import { useState } from 'react'
import { FolderOpen, LinkOff } from '@mui/icons-material'
import Accordion from '@mui/material/Accordion'
import Badge from '@mui/material/Badge'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'

type BookmarkFolderProps = {
  folderName: string,
  index: number,
  children: ReactNode
}

function BookmarkFolder({ folderName, index, children }: BookmarkFolderProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    }
  
  return (
    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
      <AccordionSummary
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)'
          },
          transition: 'background-color 0.3s'
        }}
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
        onMouseDown={(event) => event.preventDefault()} // Prevents focus
      >
        <FolderOpen sx={{ marginRight: '1rem' }} />
        <Typography component="span" sx={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1 }}>
          {folderName}
        </Typography>
        <Badge badgeContent={4} color="error" sx={{ marginRight: '1rem' }}>
          <LinkOff color="action" />
        </Badge>
      </AccordionSummary>
      <AccordionDetails>
        <List component="nav" aria-labelledby="nested-list-subheader">
          {children}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

export default BookmarkFolder
