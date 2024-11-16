import React, { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'

const App = () => {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <Sidebar/>
      <Main/>  
    </div>
  )
}

export default App
