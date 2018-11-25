import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import styles from './Styles'

const LOADING_INDICATOR_COLOR = '#E3F8FF'

const LoadingIndicator = () =>
  <View style={styles.loadingContainer}>
    <ActivityIndicator style={{flex: 1, alignItems: 'center'}} size='large' color={LOADING_INDICATOR_COLOR} />
  </View>

export default LoadingIndicator