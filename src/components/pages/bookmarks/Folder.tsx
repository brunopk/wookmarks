import { FolderOpen } from '@mui/icons-material'
import * as Mui from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import List from '@mui/material/List'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { memo, useCallback, useState } from 'react'
import { ICON_MARGIN_RIGHT_IN_REM } from '../../../style'
import FolderChip from './FolderChip'
import FolderItem from './FolderItem'

const AccordionSummary = Mui.styled(
  Mui.AccordionSummary,
  {}
)<Mui.AccordionSummaryProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: theme.transitions.create('background-color'),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}))

const FolderName = Mui.styled(
  Mui.Typography,
  {}
)<Mui.TypographyProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1
}))

const Icon = Mui.styled(
  FolderOpen,
  {}
)<Mui.IconProps>(() => ({
  marginRight: `${ICON_MARGIN_RIGHT_IN_REM}rem`,
  height: 'auto'
}))

const PaginationBox = Mui.styled(
  Mui.Box,
  {}
)<Mui.BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'center'
}))

type FolderProps = {
  folderName: string
  id: number
  pageSize: number
  items: UI.Bookmark[]
  selectedItem: number | null
  onSelectItem: (id: number) => void
}

function Folder({ folderName, id, pageSize, items, selectedItem, onSelectItem }: FolderProps) {
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

  const accordionSummaryProps: Mui.AccordionSummaryProps = {
    id: `panel${id}bh-header`,
    'aria-controls': `panel${id}bh-content`,
    onMouseDown: (event) => event.preventDefault() // Prevents focus
  }

  const folderItemProps: (item: UI.Bookmark, index: number) => UI.FolderItemProps = (
    item
  ) => ({
    id: item.id,
    text: item.name,
    status: item.status,
    icon: item.isFolder ? 'folder' : 'link',
    selected: item.id == selectedItem,
    onSelect: handleSelectFolderItem
  })

  const paginationProps: Mui.PaginationProps = {
    count: maxPages,
    page: currentPage,
    defaultPage,
    onChange: handlePaginationChange
  }

  const listProps: Mui.ListProps = {
    component: 'nav',
    'aria-labelledby': 'nested-list-subheader'
  }

  return (
    <Accordion expanded={expanded === `panel${id}`} onChange={handleChange(`panel${id}`)}>
      <AccordionSummary {...accordionSummaryProps}>
        <Icon />
        <FolderName component="span">{folderName}</FolderName>
        <FolderChip status="error" value={10} key={0} />
        <FolderChip status="warning" value={11} key={1} />
        <FolderChip status="success" value={13} key={2} />
      </AccordionSummary>
      <AccordionDetails>
        {typeof items === 'undefined' || items.length === 0 ? (
          <Typography>Empty folder</Typography>
        ) : (
          <List {...listProps}>
            {items
              .slice((currentPage - 1) * pageSize, currentPage * pageSize + (pageSize - 1))
              .map((item, index) => (
                <FolderItem {...folderItemProps(item, index)} key={index}/>
              ))}
            <PaginationBox>
              <Pagination {...paginationProps} />
            </PaginationBox>
          </List>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default memo(Folder)
