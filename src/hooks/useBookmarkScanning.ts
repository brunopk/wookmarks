import { useCallback, useEffect, useReducer } from 'react'
import { scanBookmarkTree } from '../utils'

type Action = {
  type:
    | 'INIT_PROCESS'
    | 'OBTAIN_COUNTERS'
    | 'PROBE_URLS'
    | 'YIELD_PARTIAL_RESULT'
    | 'FINISH_PROCESS'
  data?: BookmarkScanning.Result
}

function elapsedTime(a: Date, b: Date) {
  return b.getTime() - a.getTime()
}

function useBookmarkScanning() {
  const INITIAL_STATE: UI.Scanning.State = {
    stage: 'AWAITING_TRIGGERING',
    elapsedTime: 0,
    isFinished: false
  }

  const reducer = (prevState: UI.Scanning.State, action: Action): UI.Scanning.State => {
    switch (action.type) {
      case 'INIT_PROCESS':
        return {
          ...prevState,
          stage: 'INITIATING_PROCESS',
          startedAt: new Date(),
          elapsedTime: 0,
          scanningResult: action.data
        }
      case 'OBTAIN_COUNTERS':
        return {
          ...prevState,
          stage: 'OBTAINING_COUNTERS',
          elapsedTime: elapsedTime(prevState.startedAt!, new Date()),
          scanningResult: action.data
        }
      case 'PROBE_URLS':
      case 'YIELD_PARTIAL_RESULT':
        return {
          ...prevState,
          stage: 'PROBING_URLS',
          elapsedTime: elapsedTime(prevState.startedAt!, new Date()),
          scanningResult: action.data
        }
      case 'FINISH_PROCESS':
        return {
          ...prevState,
          stage: 'FINISHING',
          elapsedTime: elapsedTime(prevState.startedAt!, new Date()),
          isFinished: true,
          scanningResult: action.data
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

      for await (const partialResult of scanBookmarkTree()) {
        if (partialResult.isFinished) {
          dispatch({ type: 'FINISH_PROCESS', data: partialResult })
        } else {
          dispatch({ type: 'YIELD_PARTIAL_RESULT', data: partialResult })
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
