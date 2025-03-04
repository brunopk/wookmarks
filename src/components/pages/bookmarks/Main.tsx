import { useContext, useEffect } from 'react'
import { MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../style'
import { BaseMenuContext } from '../../BaseMenuContext'
import Page from '../../Page'
import Folder from './Folder'
import Link from './FolderItemLink'
import SubFolder from './FolderItemSubFolder'
import Menu from './Menu'

function MenuWrapper() {
  const { setWidthInRem } = useContext(BaseMenuContext)

  const maxLevel = 2
  const lastLevelMaxLengthItem = 14
  const widthInRem = (maxLevel * MENU_FOLDER_TREE_INDENT_IN_REM) + lastLevelMaxLengthItem

  useEffect(() => {
    setWidthInRem(widthInRem)
  }, [setWidthInRem, widthInRem])

  return (
    <Menu
      widthInRem={widthInRem}
      level={0}
      node={{
        name: 'Folder 1',
        children: [
          {
            name: 'Folder 1 A',
            children: [
              {
                name: 'Folder 1 A I',
                children: [{ name: 'Folder 1 A I 1', children: [] }]
              },
              { name: 'Folder 1 A II', children: [] },
              { name: 'Folder 1 A III', children: [] }
            ]
          },
          {
            name: 'Folder 1 B',
            children: [
              {
                name: 'Folder 1 B I',
                children: [{ name: 'Folder 1 B I 1', children: [] }]
              },
              { name: 'Folder 1 B II', children: [] },
              { name: 'Folder 1 B III', children: [] }
            ]
          }
        ]
      }}
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
