import React from 'react';
import { Icon } from 'react-native-elements';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import common from './common/styles';
import Calendar from './containers/calendar';
import Home from './containers/home';
import Settings from './containers/settings';
import { UPDATE } from './redux/actions/settings';

class App extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Navigator />
        );
    }

}

const navigationOptions = {
    headerStyle: common.header,
    headerTitleStyle: common.header_title
};

const tabBarOptions = {
    style: common.tab_bar,
    inactiveBackgroundColor: '#494e6B',
    activeBackgroundColor: '#414861',
    inactiveTintColor: '#fff',
    activeTintColor: '#fff'
};

const Navigator = StackNavigator({
    Main: {
        screen: TabNavigator({
            Settings: {
                screen: Settings,
                navigationOptions: {
                    ...navigationOptions,
                    title: 'Paramètres',
                    tabBarIcon: () => <Icon name='settings' color='#fff' />
                }
            },
            Home: {
                screen: Home,
                navigationOptions: {
                    ...navigationOptions,
                    title: 'Reveil',
                    tabBarIcon: () => <Icon name='alarm' color='#fff' />
                }
            },
            Calendar: {
                screen: Calendar,
                navigationOptions: {
                    ...navigationOptions,
                    title: 'Calendrier',
                    tabBarIcon: () => <Icon name='calendar' type='feather' color='#fff' />
                }
            }
        }, { initialRouteName: 'Home', tabBarOptions })
    }
});

export default connect(null, null)(App);
