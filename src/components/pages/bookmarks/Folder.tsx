import { FolderOpen } from '@mui/icons-material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import Pagination from '@mui/material/Pagination'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { ReactNode, useState } from 'react'
import { ICON_MARGIN_RIGHT_IN_REM, hoverEffect } from '../../../style'

type BookmarkFolderProps = {
  folderName: string
  index: number
  pageSize: number
  children: ReactNode[]
}

function BookmarkFolder({ folderName, index, pageSize, children }: BookmarkFolderProps) {
  const theme = useTheme()

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const maxPages = Math.ceil(children.length / pageSize)
  const defaultPage = 1 as number
  const [currentPage, setCurrentPage] = useState<number>(defaultPage)
  const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
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
          ...hoverEffect(theme)
        }}
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
        onMouseDown={(event) => event.preventDefault()} // Prevents focus
      >
        <FolderOpen
          sx={{ marginRight: `${ICON_MARGIN_RIGHT_IN_REM}rem`, height: 'auto' }}
        />
        <Typography component="span" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {folderName}
        </Typography>
        <Chip
          label="🔴 45"
          sx={{ marginRight: '1rem', fontWeight: 'bold' }}
          color="error"
          variant="outlined"
        />
        <Chip
          label="🟡 70"
          sx={{ marginRight: '1rem', fontWeight: 'bold' }}
          color="warning"
          variant="outlined"
        />
        <Chip
          label="🟢 80"
          sx={{ marginRight: '1rem', fontWeight: 'bold' }}
          color="success"
          variant="outlined"
        />
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
