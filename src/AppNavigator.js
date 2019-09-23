import React from 'react';
import { createBottomTabNavigator, createStackNavigator, StackViewTransitionConfigs, } from 'react-navigation';
import { Platform } from "react-native";
import { connect } from "react-redux";
import constStyles from "./styles/constStyles";


import { createReactNavigationReduxMiddleware, createReduxContainer, } from 'react-navigation-redux-helpers';

import TabBarIcon from "./components/TabBarIcon";
import HomePage from "./pages/home/HomePage";
import MinePage from "./pages/mine/MinePage";
import AuthLoginPage from "./pages/auth/AuthLoginPage";
import AuthPasswordSetPage from "./pages/auth/AuthPasswordSetPage";
import AuthRegisterPage from "./pages/auth/AuthRegisterPage";
import AboutPage from "./pages/setting/AboutPage";
import SettingLanguagePage from "./pages/setting/SettingLanguagePage";
import SettingsPage from "./pages/setting/SettingsPage";
import WebViewPage from "./pages/WebViewPage";
import AuthRegisterNextPage from "./pages/auth/AuthRegisterNextPage";
import AuthLoginHistoryPage from "./pages/auth/AuthLoginHistoryPage";
import CountrySelectPage from "./pages/countrySelect/CountrySelectPage";
import CountrySearchPage from "./pages/countrySelect/CountrySearchPage";
import I18n from "./I18n";
import Keys from "./configs/Keys";

process.env.REACT_NAV_LOGGING = ( global.__DEV__ );


let TabNavigatorConfig = {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,//不让滑动
    animationEnabled: false,
    tabBarOptions: {

        activeTintColor: constStyles.THEME_COLOR,
        scrollEnabled: false,
        inactiveTintColor: '#999999',
        showIcon: true,
        style: {
            backgroundColor: '#ffffff',
            height: 50
        },
        indicatorStyle: {
            opacity: 0
        },
        tabStyle: {
            padding: 0,
            height: 50
        },
        labelStyle: {
            fontSize: 10,
            elevation: 0,
            paddingTop: 2,
            paddingBottom: Platform.OS === 'ios' ? 2 : 5,
            margin: 0
        },
    }
};


const stackNavigatorConfiguration = {
    headerMode: 'screen',
    initialRouteParams: {},
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: constStyles.THEME_COLOR,
            borderBottomWidth: 0,
            elevation: 1,
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold'
        },
        headerTintColor: 'white'
    },
    navigationOptions: {
        headerStyle: {
            backgroundColor: constStyles.THEME_COLOR,
            borderBottomWidth: 0,
            elevation: 0,
        },
        headerTitleStyle: {
            color: '#323232',
            fontSize: 19,
            fontWeight: 'bold'
        },
        headerTintColor: '#323232'
    },
};

const HomeSearchStack = createStackNavigator(
    {
        HomePage: HomePage,
    },
    {
        ...stackNavigatorConfiguration,
        transitionConfig: () => StackViewTransitionConfigs.NoAnimation,
        navigationOptions: {
            ...stackNavigatorConfiguration.navigationOptions,
            header: null,
        },
        defaultNavigationOptions: {
            ...stackNavigatorConfiguration.defaultNavigationOptions,
            gesturesEnabled: false,
        },
    }
);

const HomeStack = createStackNavigator( {
    HomeSearchStack: HomeSearchStack,
}, stackNavigatorConfiguration );

const MineStack = createStackNavigator( { Home: { screen: MinePage, } }, stackNavigatorConfiguration );

HomeStack.navigationOptions = {
    tabBarLabel: I18n.t( Keys.home ),
    tabBarIcon: ( { focused } ) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? 'ios-home'
                    : 'md-home'
            }
        />
    ),
};

MineStack.navigationOptions = {
    tabBarLabel: I18n.t( Keys.me ),
    tabBarIcon: ( { focused } ) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}/>
    ),
};

const MainTabContainer = createBottomTabNavigator(
    {
        HomeStack: HomeStack,
        MineStack: MineStack,
    },
    TabNavigatorConfig
);

const LanguageUpdate = {
    update: function () {
        HomeStack.navigationOptions = {
            tabBarLabel: I18n.t( Keys.home ),
            tabBarIcon: ( { focused } ) => (
                <TabBarIcon
                    focused={focused}
                    name={
                        Platform.OS === 'ios'
                            ? 'ios-home'
                            : 'md-home'
                    }
                />
            ),
        };

        MineStack.navigationOptions = {
            tabBarLabel: I18n.t( Keys.me ),
            tabBarIcon: ( { focused } ) => (
                <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}/>
            ),
        };
    },
};


const routeConfiguration = {
    mainPage: {
        screen: MainTabContainer,
        navigationOptions: {
            header: null,
            headerBackTitle: null
        }
    },
    AuthLoginPage: {
        screen: AuthLoginPage
    },
    AuthPasswordSetPage: {
        screen: AuthPasswordSetPage
    },
    AuthRegisterPage: {
        screen: AuthRegisterPage
    },
    AuthRegisterNextPage: {
        screen: AuthRegisterNextPage
    },
    AboutPage: {
        screen: AboutPage
    },
    SettingLanguagePage: {
        screen: SettingLanguagePage
    },
    SettingsPage: {
        screen: SettingsPage
    },
    WebViewPage: {
        screen: WebViewPage
    },
    AuthLoginHistoryPage: {
        screen: AuthLoginHistoryPage
    },
    CountrySelectPage: {
        screen: CountrySelectPage
    },
    CountrySearchPage: {
        screen: CountrySearchPage
    },
};

const navMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
);

const mapStateToProps = state => ( {
    state: state.nav,
} );

const RootNavigator = createStackNavigator( routeConfiguration, stackNavigatorConfiguration );

const AppWithNavigationState = createReduxContainer( RootNavigator );


const AppNavigator = connect( mapStateToProps )( AppWithNavigationState );

export { RootNavigator, AppNavigator, navMiddleware, LanguageUpdate };


