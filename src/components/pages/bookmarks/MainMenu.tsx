import { useState } from 'react'
import MainMenuItem from './MainMenuItem'

type MenuProps = {
  nodes: UI.Bookmark[]
  widthInRem: number
}

function MainMenu({ nodes, widthInRem }: MenuProps) {
  const [selectedId, setSelectedId] = useState<number>(nodes[0].id)

  return (
    <>
      {nodes.map(
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
