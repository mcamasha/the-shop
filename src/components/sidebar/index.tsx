import React from 'react'

import BasketCart from 'components/basketCart'
import Search from 'components/search'
import Categories from 'components/categories'

const Sidebar = () => {
  return (
    <div>
      <BasketCart />
      <Search />
      <Categories />
    </div>
  )
}

export default Sidebar
