import Layout from '../../Layout'
import Folder from './Folder'
import Link from './FolderItemLink'
import SubFolder from './FolderItemSubFolder'
import Menu from './Menu'

function Main() {
  const folderPageSize = 8
  return (
    <Layout Menu={Menu}>
      <Folder folderName="Folder 1" pageSize={folderPageSize} index={0}>
        <SubFolder text="Folder A" />
        <Link isLinkOff={false} text="Link A" />
      </Folder>
      <Folder folderName="Folder 2" pageSize={folderPageSize} index={1}>
        <Link isLinkOff={false} text="Link C" />
        <Link isLinkOff={true} text="Link D" />
      </Folder>
    </Layout>
  )
}

export default Main
