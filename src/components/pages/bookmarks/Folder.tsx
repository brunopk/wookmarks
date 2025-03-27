import { FolderOpen } from '@mui/icons-material'
import {
  AccordionSummaryProps,
  AccordionSummary as MuiAccordionSummary,
  styled
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { memo, useCallback, useState } from 'react'
import { ICON_MARGIN_RIGHT_IN_REM } from '../../../style'
import FolderItem from './FolderItem'

// TODO: Refactoring : pass components to styled components

const AccordionSummary = styled(
  MuiAccordionSummary,
  {}
)<AccordionSummaryProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: theme.transitions.create('background-color'),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}))

type FolderProps = {
  folderName: string
  id: number
  pageSize: number
  items: UI.Bookmark[]
  selectedItem: number | null
  onSelectItem: (id: number) => void
  onDeletionModalOpen: () => void
}

function Folder({
  folderName,
  id,
  pageSize,
  items,
  selectedItem,
  onSelectItem,
  onDeletionModalOpen
}: FolderProps) {
  const [expanded, setExpanded] = useState<string | false>(false)

  const defaultPage = 1

  const maxPages = typeof items !== 'undefined' ? Math.ceil(items.length / pageSize) : undefined

  const [currentPage, setCurrentPage] = useState<number>(defaultPage)

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const handleSelectFolderItem = useCallback(
    (id: number) => {
      onSelectItem(id)
    },
    [onSelectItem]
  )

  const handleOnDeletionModalOpen = useCallback(() => {
    onDeletionModalOpen()
  }, [onDeletionModalOpen])

  return (
    <Accordion expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
      <AccordionSummary
        aria-controls={`panel${id}bh-content`}
        id={`panel${id}bh-header`}
        onMouseDown={(event) => event.preventDefault()} // Prevents focus
      >
        <FolderOpen sx={{ marginRight: `${ICON_MARGIN_RIGHT_IN_REM}rem`, height: 'auto' }} />
        <Typography component="span" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {folderName}
        </Typography>
        <Chip label="🔴 45" sx={{ marginRight: '1rem', fontWeight: 'bold' }} variant="outlined" />
        <Chip label="🟡 70" sx={{ marginRight: '1rem', fontWeight: 'bold' }} variant="outlined" />
        <Chip label="🟢 80" sx={{ marginRight: '1rem', fontWeight: 'bold' }} variant="outlined" />
      </AccordionSummary>
      <AccordionDetails>
        {typeof items === 'undefined' || items.length === 0 ? (
          <Typography>Empty folder</Typography>
        ) : (
          <List component="nav" aria-labelledby="nested-list-subheader">
            {items
              .slice((currentPage - 1) * pageSize, currentPage * pageSize + (pageSize - 1))
              .map((item, index) => (
                <FolderItem
                  text={item.name}
                  id={item.id}
                  icon={item.isFolder ? 'folder' : 'link'}
                  color="action"
                  key={index}
                  selected={item.id == selectedItem}
                  onSelect={handleSelectFolderItem}
                  onDeletionModalOpen={handleOnDeletionModalOpen}
                />
              ))}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={maxPages}
                page={currentPage}
                defaultPage={defaultPage}
                onChange={handlePaginationChange}
              />
            </Box>
          </List>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(Folder)
