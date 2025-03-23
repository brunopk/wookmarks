import { useState } from 'react'
import SideBarMenuItem from './SideBarMenuItem'

type MenuProps = {
  nodes: Bookmarks.Item[]
  widthInRem: number
}

function SideBarMenu({ nodes, widthInRem }: MenuProps) {
  const [selectedId, setSelectedId] = useState<number>(nodes[0].id)

  return (
    <>
      {nodes.map(
        (node) =>
          node.isFolder && (
            <SideBarMenuItem
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

export default SideBarMenu
