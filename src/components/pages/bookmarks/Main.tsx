import { useContext, useEffect } from 'react'
import { MENU_FOLDER_TREE_INDENT_IN_REM } from '../../../style-constants'
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

  console.log(widthInRem)

  useEffect(() => {
    setWidthInRem(widthInRem)
  }, [setWidthInRem, widthInRem])

  return (
    <Menu
      widthInRem={widthInRem}
      level={0}
      node={{
        isOpen: true,
        name: 'Folder 1',
        children: [
          {
            name: 'Folder 1 A',
            isOpen: true,
            children: [
              {
                name: 'Folder 1 A I',
                isOpen: true,
                children: [{ name: 'Folder 1 A I 1', isOpen: false, children: [] }]
              },
              { name: 'Folder 1 A II', isOpen: true, children: [] },
              { name: 'Folder 1 A III', isOpen: true, children: [] }
            ]
          },
          {
            name: 'Folder 1 B',
            isOpen: true,
            children: [
              {
                name: 'Folder 1 B I',
                isOpen: true,
                children: [{ name: 'Folder 1 B I 1', isOpen: false, children: [] }]
              },
              { name: 'Folder 1 B II', isOpen: true, children: [] },
              { name: 'Folder 1 B III', isOpen: true, children: [] }
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
