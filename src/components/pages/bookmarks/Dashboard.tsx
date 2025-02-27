import MainDashboard from '../../layout/Dashboard'
import Folder from './Folder'
import Link from './Link'
import SubFolder from './SubFolder'

function Dashboard() {
  const folderPageSize = 8
  return (
    <MainDashboard>
      <Folder folderName="Folder 1" pageSize={folderPageSize} index={0}>
        <SubFolder text="Folder A" />
        <Link isLinkOff={false} text="Link A" />
      </Folder>
      <Folder folderName="Folder 2" pageSize={folderPageSize} index={1}>
        <Link isLinkOff={false} text="Link C" />
        <Link isLinkOff={true} text="Link D" />
      </Folder>
    </MainDashboard>
  )
}

export default Dashboard
