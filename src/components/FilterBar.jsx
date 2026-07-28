import React from 'react'
import { Link } from 'react-router-dom'


const FilterBar = ({categories, activeCategory, setActiveCategory}) => {
  return (
    <div className='d-flex justify-content-center flex-wrap gap-2 mb-4'>
      {categories.map((item) => (
        <Link
          key={item}
          to={`/categories/${encodeURIComponent(item)}`}
          className={`${activeCategory === item ? 'active' : ''} btn btn-outline-dark`}
        >
          {item}
        </Link>
      ))}
    </div>
  )
}

export default FilterBar