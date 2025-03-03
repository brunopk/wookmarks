import { ComponentType, ReactNode } from 'react'
import { BaseMenuContextProvider } from '../components/BaseMenuContext'
import Layout from './Layout'

interface PageProps {
  Menu: ComponentType
  children: ReactNode
}
function Page({ children, Menu }: PageProps) {
  return (
    <BaseMenuContextProvider>
      <Layout Menu={Menu}>{children}</Layout>
    </BaseMenuContextProvider>
  )
}

export default Page
