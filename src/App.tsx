import { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function openNewTab(setIsNewTab: React.Dispatch<React.SetStateAction<boolean>>) {
  setIsNewTab(true)
  chrome.tabs.create({
    url: chrome.runtime.getURL("index.html")
  })
}

function App() {
  const [count, setCount] = useState(0)
  const [isNewTab, setIsNewTab] = useState(false)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        {!isNewTab ? (
        <button onClick={() => openNewTab(setIsNewTab)}>
          Open new tab
        </button>
        ): (<></>)}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
