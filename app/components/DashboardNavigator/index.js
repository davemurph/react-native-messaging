import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome';
// TIP: See here for all the icons https://github.com/oblador/react-native-vector-icons
// icons browser: https://oblador.github.io/react-native-vector-icons/


 
import ChatScreen from './ChatScreen'
import ChatListingsScreen from './ChatListingsScreen'
import FriendsScreen from './FriendsScreen'
import ProfileScreen from './ProfileScreen'

const genericStackNavigationOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#5472a3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '500',
    }
  },
}

const ChatListingsStack = createStackNavigator(
  {
    ChatListings: ChatListingsScreen
  },
  genericStackNavigationOptions
);

const FriendsStack = createStackNavigator(
  {
    Friends: FriendsScreen
  },
  genericStackNavigationOptions
);

const ProfileStack = createStackNavigator(
  {
    ProfileScreen: ProfileScreen
  },
  genericStackNavigationOptions
);

const DashboardTabNavigator = createBottomTabNavigator(
  { ChatListings: ChatListingsStack,
    Friends: FriendsStack,
    Profile: ProfileStack,
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ChatListings') {
          iconName = focused ? 'comments' : 'comments-o';
        } else if (routeName === 'Friends') {
          iconName = 'users';
        } else if (routeName === 'Profile') {
          iconName = 'cog';
        }

        return <Icon name={iconName} size={24} color={focused ? '#478dff' : '#AAA'}/>;
      },
    }),
    initialRouteName: 'ChatListings',
    tabBarOptions: {
      activeTintColor: '#478dff',
      inactiveTintColor: 'gray',
    },
    // https://github.com/react-navigation/react-navigation/issues/4146
    // animationEnabled: true, These don't work with createBottomTabNavigator in new react-nav
    //swipeEnabled: false, can alternatively use createMaterialTopTabNavigator with tabBarPosition = 'bottom'
  }
)

export default createStackNavigator(
//const AppCardStack = createStackNavigator(
  { 
    DashboardTabNavigator: DashboardTabNavigator,
    ChatScreen: ChatScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'DashboardTabNavigator',
  }
);

// const NewChatModalStack = StackNavigator(
//   {
//     NewChatModal: NewChatModal
//   },
//   {
//     navigationOptions: {
//       headerStyle: {
//         backgroundColor: '#5472a3',
//       },
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: '500',
//       },
//     },
//   }
// );

// const AppModalStack = StackNavigator(
//   {
//     Main: AppCardStack,
//     ModalScreen: NewChatModalStack,
//   },
//   {
//     mode: 'modal',
//     headerMode: 'none',
//     initialRouteName: 'Main',
//   }
// );



// const routeConfig = {
//   Chat: { screen: ChatScreen }
// }
 
// export default createStackNavigator(routeConfig)