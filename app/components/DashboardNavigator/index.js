import { createStackNavigator } from 'react-navigation'
 
import ChatScreen from './ChatScreen'
 
const routeConfig = {
  Chat: { screen: ChatScreen }
}
 
export default createStackNavigator(routeConfig)