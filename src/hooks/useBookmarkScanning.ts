import { useCallback, useEffect, useReducer } from 'react'
import { scanBookmarkTree } from '../utils'

type Stage = 'AWAITING_TRIGGERING' | 'INITIATING_PROCESS' | 'OBTAINING_COUNTERS' | 'PROBING_URLS'

type Action = {
  type: 'INIT_PROCESS' | 'OBTAIN_COUNTERS' | 'PROBE_URLS'
  data?: BookmarkScanningResult
}

type State = {
  stage: Stage
  startedAt?: Date
  elapsedTime: number
}

function elapsedTime(a: Date, b: Date) {
  return a.getTime() - b.getDate()
}

function useBookmarkScanning() {
  const INITIAL_STATE: State = { stage: 'AWAITING_TRIGGERING', elapsedTime: 0 }

  const reducer = (prevState: State, action: Action): State => {
    switch (action.type) {
      case 'INIT_PROCESS':
        return { stage: 'INITIATING_PROCESS', startedAt: new Date(), elapsedTime: 0 }
      case 'OBTAIN_COUNTERS':
        return {
          ...prevState,
          stage: 'OBTAINING_COUNTERS',
          elapsedTime: elapsedTime(prevState.startedAt!, new Date())
        }
      case 'PROBE_URLS':
        return {
          ...prevState,
          stage: 'PROBING_URLS',
          elapsedTime: elapsedTime(prevState.startedAt!, new Date())
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const startScanning = useCallback(() => dispatch({ type: 'INIT_PROCESS' }), [dispatch])

  useEffect(() => {
    async function triggerScanning() {
      dispatch({ type: 'OBTAIN_COUNTERS' })
      for await (const partialResult of scanBookmarkTree()) {
        if (partialResult.countersReady) {
          dispatch({ type: 'PROBE_URLS', data: partialResult })
        }
      }
    }

    if (state.stage === 'INITIATING_PROCESS') {
      triggerScanning()
    }
  }, [state.stage])

  return {
    ...state,
    startScanning
  }
}

export default useBookmarkScanning
