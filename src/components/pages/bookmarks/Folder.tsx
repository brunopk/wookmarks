import {ReactNode} from 'react'
import { useState } from 'react'
import { FolderOpen, LinkOff } from '@mui/icons-material'
import Accordion from '@mui/material/Accordion'
import Badge from '@mui/material/Badge'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles';


type BookmarkFolderProps = {
  folderName: string,
  index: number,
  pageSize: number
  children: ReactNode[]
}

function BookmarkFolder({ folderName, index, pageSize, children }: BookmarkFolderProps) {
  const theme = useTheme()

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    }
  
  const maxPages = Math.ceil(children.length/ pageSize)
  const defaultPage = 1 as number
  const [currentPage, setCurrentPage] = useState<number>(defaultPage)
  const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }
  const currentPageItems = children.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize + (pageSize - 1)
  )

  return (
    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
      <AccordionSummary
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '&:hover': {
            backgroundColor: theme.palette.mode == 'dark'? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'
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
          {currentPageItems}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={maxPages}
              page={currentPage}
              defaultPage={defaultPage}
              onChange={handlePaginationChange}
            />
          </Box>
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

export default BookmarkFolder
