import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import PreferencesManager from './common/preferences-manager';
import { CommonStyle } from './common/styles';
import Home from './containers/Home';
import Settings from './containers/Settings';
import Week from './containers/Week';

export default class App extends React.Component {

    constructor() {
        super();
    }
    
    async componentDidMount() {
        await PreferencesManager.init();
    }
    
    render() {
        return <AppContainer />;
    }

}

const navigationOptions = { headerStyle: CommonStyle.header, headerTitleStyle: CommonStyle.header_title, headerMode: 'none' };
const tabBarOptions = { activeBackgroundColor: '#414861', activeTintColor: '#fff', inactiveBackgroundColor: '#494e6B', inactiveTintColor: '#fff', style: CommonStyle.tab_bar };

const TabNavigator = createBottomTabNavigator({
    Settings: {
        navigationOptions: { tabBarIcon: () => <Icon name="settings" color="#fff" />, title: 'Paramètres' },
        screen: Settings
    },
    Home: {
        navigationOptions: { tabBarIcon: () => <Icon name="alarm" color="#fff" />, title: 'Reveil' },
        screen: Home
    },
    Calendar: {
        navigationOptions: { tabBarIcon: () => <Icon name="calendar" type="feather" color="#fff" />, title: 'Calendrier' },
        screen: Week
    }
}, { initialRouteName: 'Home', tabBarOptions });
const Navigator = createStackNavigator({
    Main: { navigationOptions: { ...navigationOptions, title: 'My Personnal Wake Up' }, screen: TabNavigator }
});

const AppContainer = createAppContainer(Navigator);
