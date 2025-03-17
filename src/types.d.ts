
type TreeNode = {
  name: string
  id: number
  isFolder: boolean,
  isAnySubFolder: boolean,
  children?: TreeNode[]
}

type SnackBarMessage = {
  text: string
}
