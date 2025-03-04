import { Dispatch, ReactNode, createContext, useState } from 'react'

type BaseMenuContextProviderProps = {
  children: ReactNode
}

type BaseMenuContextProps = {
  widthInRem: number | null
  setWidthInRem: Dispatch<number>
}

const BaseMenuContext = createContext<BaseMenuContextProps>({
  widthInRem: null,
  setWidthInRem: () => null
})

function BaseMenuContextProvider({children}: BaseMenuContextProviderProps) {
  const [widthInRem, setWidthInRem] = useState<number | null>(null)
  
  return (
    <BaseMenuContext.Provider value={{widthInRem, setWidthInRem}}>
      {children}
    </BaseMenuContext.Provider>
  )
}

export { BaseMenuContext, BaseMenuContextProvider }
