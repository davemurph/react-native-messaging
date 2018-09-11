import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
 
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const routeConfig = {
  Login: {
    screen: LoginForm,
  },
  SignUp: {
    screen: SignUpForm,
  },
}

const tabBarOptions = {
  tabBarOptions: {
    activeTintColor: '#88cc88',
    inactiveTintColor: '#aaaaaa',
    showIcon: true,
    scrollEnabled: false,
    indicatorStyle: {
      display: 'none',
    },
    style: {
      backgroundColor: '#ffffff',
    },
  }
}

export default createBottomTabNavigator(
  routeConfig,
  tabBarOptions
)
