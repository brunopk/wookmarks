import { createContext, ReactElement, useCallback, useState } from 'react'

const SnackBarContext = createContext<SnackBarProviderValue>({
  pushSnackBarMessage: () => {
    throw new Error('pushSnackBarMessage not initialized correctly')
  }
})

type SnackBarProviderValue = {
  currentSnackBarMessage?: SnackBarMessage
  pushSnackBarMessage: (msg: SnackBarMessage) => void
}

type SnackBarProviderProps = {
  children: ReactElement[]
}

function SnackBarProvider({ children }: SnackBarProviderProps) {
  const [currentSnackBarMessage, setCurrentSnackBarMessage] = useState<SnackBarMessage>()

  const pushSnackBarMessage = useCallback((msg: SnackBarMessage) => {
    setCurrentSnackBarMessage(msg)
  }, [])

  const contextValue: SnackBarProviderValue = { currentSnackBarMessage, pushSnackBarMessage }

  return <SnackBarContext.Provider value={contextValue}>{children}</SnackBarContext.Provider>
}

export { SnackBarContext, SnackBarProvider }
