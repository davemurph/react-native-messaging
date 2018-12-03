import React, { Component } from 'react'
import { YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import { Asset, AppLoading } from 'expo';

import { configureStore } from './store'

import ChatApp from './components/ChatApp'

console.ignoredYellowBox = ['Setting a timer']
YellowBox.ignoreWarnings(['Setting a timer'])

const store = configureStore()

export default class App extends Component {
  state = {
    isReady: false,
  }

  async _cacheResourcesAsync() {
    const images = [
      // TODO: Add all images/assets here to assist in load times, loading this one gets over the inital hump for now
      require('../app/images/form.png'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <ChatApp />
      </Provider>
    )
  }
}