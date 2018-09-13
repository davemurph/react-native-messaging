import React from 'react'
import { YellowBox } from 'react-native'
import { Provider } from 'react-redux'

import { configureStore } from './store'

import ChatApp from './components/ChatApp'

console.ignoredYellowBox = ['Setting a timer']
YellowBox.ignoreWarnings(['Setting a timer'])

const store = configureStore()

const App = () =>
  <Provider store={store}>
    <ChatApp />
  </Provider>

export default App