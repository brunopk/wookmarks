import { useState } from 'react'
import { BookmarksTree } from '../../../utils/tree-utils'
import MainMenuItem from './MainMenuItem'

/**************************************************************************************************/
/*                                             TYPES                                              */
/**************************************************************************************************/

type MenuProps = {
  bookmarksTree: BookmarksTree
  widthInRem: number
}

/**************************************************************************************************/
/*                                       EXPORTED COMPONENT                                       */
/**************************************************************************************************/

function MainMenu({ bookmarksTree, widthInRem }: MenuProps) {
  const [selectedId, setSelectedId] = useState<number>(bookmarksTree.id)

  return (
    <>
      {bookmarksTree.children!.map(
        (node) =>
          node.isFolder && (
            <MainMenuItem
              node={node}
              widthInRem={widthInRem}
              level={0}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              key={node.id}
              parentIsOpen
            />
          )
      )}
    </>
  )
}

export default MainMenu
