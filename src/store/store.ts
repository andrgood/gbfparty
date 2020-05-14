import { configureStore, combineReducers } from '@reduxjs/toolkit'

import searchTermsSlice from '../features/searchTerms/searchTermsSlice'

const rootReducer = combineReducers({
    searchTerms : searchTermsSlice
})

const store = configureStore({
    reducer: rootReducer
})


export default store