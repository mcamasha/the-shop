import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import phones from 'reducers/phones'
import phonesPage from 'reducers/phonesPage'
import phonePage from 'reducers/phonePage'
import basket from 'reducers/basket'
import categories from 'reducers/categories'

export default combineReducers({
  routing: routerReducer,
  phones,
  phonesPage,
  phonePage,
  basket,
  categories
})