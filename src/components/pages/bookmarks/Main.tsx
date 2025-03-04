import { useContext, useEffect } from 'react'
import { MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../style'
import { BaseMenuContext } from '../../BaseMenuContext'
import Page from '../../Page'
import Folder from './folder-tree/Folder'
import Link from './folder-tree/FolderItemLink'
import SubFolder from './folder-tree/FolderItemSubFolder'
import Menu from './Menu'

function MenuWrapper() {
  const { setWidthInRem } = useContext(BaseMenuContext)

  const maxLevel = 3
  const lastLevelMaxLengthItem = 14
  const widthInRem = maxLevel * MENU_FOLDER_TREE_INDENT_IN_REM + lastLevelMaxLengthItem

  useEffect(() => {
    setWidthInRem(widthInRem)
  }, [setWidthInRem, widthInRem])

  return (
    <Menu
      widthInRem={widthInRem}
      node={[{
        name: 'Folder 1',
        id: 11,
        children: [
          {
            name: 'Folder 1 A',
            id: 5,
            children: [
              {
                name: 'Folder 1 A I',
                id: 2,
                children: [{ name: 'Folder 1 A I 1', id: 1, children: [] }]
              },
              { name: 'Folder 1 A II', id: 3, children: [] },
              { name: 'Folder 1 A III', id: 4, children: [] }
            ]
          },
          {
            name: 'Folder 1 B',
            id: 10,
            children: [
              {
                name: 'Folder 1 B I',
                id: 9,
                children: [{ name: 'Folder 1 B I 1', id: 6, children: [] }]
              },
              { name: 'Folder 1 B II', id: 7, children: [] },
              { name: 'Folder 1 B III', id: 8, children: [] }
            ]
          }
        ]
      }, {
        name: 'Folder 2',
        id: 12,
        children: []
      }]}
    />
  )
}

function Main() {
  const folderPageSize = 8
  return (
    <Page Menu={MenuWrapper}>
      <Folder folderName="Folder 1" pageSize={folderPageSize} index={0}>
        <SubFolder text="Folder A" />
        <Link isLinkOff={false} text="Link A" />
      </Folder>
      <Folder folderName="Folder 2" pageSize={folderPageSize} index={1}>
        <Link isLinkOff={false} text="Link C" />
        <Link isLinkOff={true} text="Link D" />
      </Folder>
    </Page>
  )
}

export default Main
