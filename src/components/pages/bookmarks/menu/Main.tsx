import { useState } from 'react'
import FolderTree from './FolderTree'

type MenuProps = {
  nodes: TreeNode[]
  widthInRem: number
}

function Main({ nodes, widthInRem }: MenuProps) {
  const [selectedId, setSelectedId] = useState<number>(nodes[0].id)

  return (
    <>
      {nodes.map(
        (node) =>
          node.isFolder && (
            <FolderTree
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

export default Main
