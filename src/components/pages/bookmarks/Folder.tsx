import { FolderOpen } from '@mui/icons-material'
import * as Mui from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import List from '@mui/material/List'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import { memo, useCallback, useState } from 'react'
import { ICON_MARGIN_RIGHT_IN_REM } from '../../../style'
import { BookmarksTreeItem } from '../../../utils/tree-utils'
import FolderChip from './FolderChip'
import { FolderItem, FolderItemProps } from './FolderItem'

/**************************************************************************************************/
/*                                         SUB-COMPONENTS                                         */
/**************************************************************************************************/

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

/**************************************************************************************************/
/*                                  EXPORTED COMPONENT AND TYPES                                  */
/**************************************************************************************************/

export type FolderProps = {
  pageSize: number
  bookmarksTreeItem: BookmarksTreeItem
  selectedItemId: number | null
  onSelectItemId: (id: number) => void
}

export const Folder = memo(
  ({ pageSize, bookmarksTreeItem, selectedItemId, onSelectItemId }: FolderProps) => {
    const [expanded, setExpanded] = useState<string | false>(false)

    const defaultPage = 1

    const maxPages = bookmarksTreeItem.children
      ? Math.ceil(bookmarksTreeItem.children.length / pageSize)
      : undefined

    const [currentPage, setCurrentPage] = useState<number>(defaultPage)

    const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

    const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
      setCurrentPage(value)
    }

    const handleSelectFolderItem = useCallback(
      (id: number) => {
        onSelectItemId(id)
      },
      [onSelectItemId]
    )

    const accordionProps: Omit<Mui.AccordionProps, 'children'> = {
      expanded: expanded === `panel${bookmarksTreeItem.id}`,
      onChange: handleChange(`panel${bookmarksTreeItem.id}`)
    }

    const accordionSummaryProps: Mui.AccordionSummaryProps = {
      id: `panel${bookmarksTreeItem.id}bh-header`,
      'aria-controls': `panel${bookmarksTreeItem.id}bh-content`,
      onMouseDown: (event) => event.preventDefault() // Prevents focus
    }

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

    const folderItemProps: (
      bookmarksTreeItem: BookmarksTreeItem,
      index: number
    ) => FolderItemProps = (bookmarksTreeItem) => ({
      bookmarksTreeItem,
      onSelect: handleSelectFolderItem,
      selected: bookmarksTreeItem.id == selectedItemId
    })

    // TODO: not hardcode folder value and key

    return (
      <Accordion {...accordionProps}>
        <AccordionSummary {...accordionSummaryProps}>
          <Icon />
          <FolderName component="span">{bookmarksTreeItem.name}</FolderName>
          <FolderChip status="error" value={10} key={0} />
          <FolderChip status="warning" value={11} key={1} />
          <FolderChip status="success" value={13} key={2} />
        </AccordionSummary>
        <AccordionDetails>
          {!bookmarksTreeItem.children || bookmarksTreeItem.children.length === 0 ? (
            <Typography>Empty folder</Typography>
          ) : (
            <List {...listProps}>
              {bookmarksTreeItem.children
                .slice((currentPage - 1) * pageSize, currentPage * pageSize + (pageSize - 1))
                .map((item, index) => (
                  <FolderItem {...folderItemProps(item, index)} key={index} />
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
)
