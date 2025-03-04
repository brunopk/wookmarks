import { Dispatch, ReactNode, createContext, useState } from 'react'
import {DEFAULT_MENU_ITEM_WIDTH_IN_REM} from '../style'

type BaseMenuContextProviderProps = {
  children: ReactNode
}

type BaseMenuContextProps = {
  widthInRem: number
  setWidthInRem: Dispatch<number>
}

const BaseMenuContext = createContext<BaseMenuContextProps>({
  widthInRem: DEFAULT_MENU_ITEM_WIDTH_IN_REM,
  setWidthInRem: () => null
})

function BaseMenuContextProvider({children}: BaseMenuContextProviderProps) {
  const [widthInRem, setWidthInRem] = useState<number>(DEFAULT_MENU_ITEM_WIDTH_IN_REM)
  
  return (
    <BaseMenuContext.Provider value={{widthInRem, setWidthInRem}}>
      {children}
    </BaseMenuContext.Provider>
  )
}

export { BaseMenuContext, BaseMenuContextProvider }
