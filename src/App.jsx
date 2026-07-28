import React from 'react'
import ProductDisplay from './components/ProductDisplay'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return(
    <Routes>
      {/* Load this when there is no category selected */}
      <Route path="/" element={<ProductDisplay />} /> 
      {/* Load this when a category is selected in the URL */}
      <Route path="/categories/:categoryName" element={<ProductDisplay />} />
    </Routes>
  )
}

export default App