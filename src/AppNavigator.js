import React from 'react';
import {
    createBottomTabNavigator,
    createDrawerNavigator,
    createStackNavigator,
    StackViewTransitionConfigs,
} from 'react-navigation';
import { Platform } from "react-native";
import { connect } from "react-redux";
import constStyles from "./styles/constStyles";


import { createReactNavigationReduxMiddleware, createReduxContainer, } from 'react-navigation-redux-helpers';

import TabBarIcon from "./components/TabBarIcon";
import AuthRegisterPage from "./pages/auth/AuthRegisterPage";
import AboutPage from "./pages/AboutPage";
import SettingLanguagePage from "./pages/setting/SettingLanguagePage";
import SettingsPage from "./pages/setting/SettingsPage";
import WebViewPage from "./pages/WebViewPage";
import AuthLoginHistoryPage from "./pages/auth/AuthLoginHistoryPage";
import CountrySelectPage from "./pages/countrySelect/CountrySelectPage";
import CountrySearchPage from "./pages/countrySelect/CountrySearchPage";
import I18n from "./I18n";
import Keys from "./configs/Keys";
import OrderHistoryPage from "./pages/order/OrderHistoryPage";
import TradeExMenu from "./pages/trade/components/TradeExMenu";
import TradePage from "./pages/trade/TradePage";
import UserEmailVerifyPage from "./pages/user/UserEmailVerifyPage";
import UserGoogleAuthPage from "./pages/user/UserGoogleAuthPage";
import UserKYCPage from "./pages/user/UserKYCPage";
import UserPasswordResetPage from "./pages/user/UserPasswordResetPage";
import UserPhoneVerifyPage from "./pages/user/UserPhoneVerifyPage";
import FundPasswordChangePage from "./pages/account/FundPasswordChangePage";
import AssetsDepositHistoryPage from "./pages/assets/AssetsDepositHistoryPage";
import AssetsDepositPage from "./pages/assets/AssetsDepositPage";
import AssetsWithdrawHistoryPage from "./pages/assets/AssetsWithdrawHistoryPage";
import AssetsWithdrawPage from "./pages/assets/AssetsWithdrawPage";
import PasswordChangePage from "./pages/account/PasswordChangePage";
import GoogleAuthOpenPage from "./pages/account/GoogleAuthOpenPage";
import AssetsDetailPage from "./pages/assets/AssetsDetailPage";
import MainSideMenu from "./pages/home/components/MainSideMenu";
import KlinePage from "./pages/kline/KlinePage";
import AssetsListPage from "./pages/assets/AssetsListPage";
import AuthLoginPage from "./pages/auth/AuthLoginPage";
import HomePage from "./pages/home/HomePage";
import QuotesPage from "./pages/quotes/QuotesPage";
import OTCTradePage from "./pages/OTCTrade/OTCTradePage";
import { getStore } from "./setup";
import MinePage from "./pages/mine/MinePage";
import AccountInfoPage from "./pages/account/AccountInfoPage";
import NewsDetailPage from "./pages/home/NewsDetailPage";
import BasicUserInfoVerifyPage from "./pages/mine/BasicUserInfoVerifyPage";
import UserInfoVerifyPage from "./pages/mine/UserInfoVerifyPage";
import GoogleAuthClosePage from "./pages/account/GoogleAuthClosePage";

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


const TradeExchangeStack = createStackNavigator(
    {
        TradePage: TradePage,
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

const HomeDrawerNavigator = createDrawerNavigator(
    {
        HomeSearchStack: {
            screen: HomeSearchStack,
        },
    },
    {
        drawerPosition: 'left',
        navigationOptions: {
            header: null, headerBackTitle: null,
            drawerLockMode: 'unlocked',
        },
        contentComponent: MainSideMenu,
        initialRoute: "HomeSearchStack"
    } );

const TradeDrawerNavigator = createDrawerNavigator(
    {
        HomeSearchStack: {
            screen: TradeExchangeStack,
        },
    },
    {
        drawerPosition: 'left',
        navigationOptions: {
            header: null, headerBackTitle: null,
            drawerLockMode: 'unlocked',
        },
        contentComponent: TradeExMenu,
        initialRoute: "HomeSearchStack"
    } );

const HomeStack = createStackNavigator( { HomeDrawer: HomeDrawerNavigator, }, stackNavigatorConfiguration );

const OTCTradeStack = createStackNavigator( { OTCTradePage: { screen: OTCTradePage }, }, stackNavigatorConfiguration );


const QuotesStack = createStackNavigator( { QuotesPage: { screen: QuotesPage, } }, stackNavigatorConfiguration );

const TradeStack = createStackNavigator( { TradeDrawer: TradeDrawerNavigator, }, stackNavigatorConfiguration );

const AssetsDetailStack = createStackNavigator( { AssetsListPage: { screen: AssetsListPage, } }, stackNavigatorConfiguration );

const MainTabContainer = createBottomTabNavigator(
    {
        HomeStack: HomeStack,
        QuotesStack: QuotesStack,
        TradePageStack: TradeStack,
        // OTCTradeStack: OTCTradeStack,
        AssetsDetailStack: AssetsDetailStack,
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
        OTCTradeStack.navigationOptions = {
            tabBarLabel: I18n.t( Keys.OTC ),
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

        QuotesStack.navigationOptions = {
            tabBarLabel: "Quotes",
            tabBarIcon: ( { focused } ) => (
                <TabBarIcon
                    focused={focused}
                    name={
                        Platform.OS === 'ios'
                            ? 'ios-trending-up'
                            : 'md-trending-up'
                    }
                />
            ),
        };

        // TradeStack

        TradeStack.navigationOptions = {
            tabBarLabel: "Trade",
            tabBarIcon: ( { focused } ) => (
                <TabBarIcon
                    focused={focused}
                    name={
                        Platform.OS === 'ios'
                            ? 'ios-pulse'
                            : 'md-pulse'
                    }
                />
            ),
        };


        AssetsDetailStack.navigationOptions = {
            tabBarLabel: I18n.t( Keys.assets ),
            tabBarIcon: ( { focused } ) => (
                <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-wallet' : 'md-wallet'}/>
            ),
            tabBarOnPress: ( { navigation, defaultHandler } ) => {
                // perform your logic here
                // this is mandatory to perform the actual switch
                // don't call this if you want to prevent focus
                // defaultHandler();

                const store = getStore();

                if ( store.getState().userStore.isLoggedIn ) {
                    defaultHandler();
                } else {
                    navigation.navigate( "AuthLoginPage" );
                }
            }
        };
    },
};

LanguageUpdate.update();


const routeConfiguration = {
    mainPage: {
        screen: MainTabContainer,
        navigationOptions: {
            header: null,
            headerBackTitle: null
        }
    },
    AuthRegisterPage: {
        screen: AuthRegisterPage
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
    KlinePage: {
        screen: KlinePage
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
    OrderHistoryPage: {
        screen: OrderHistoryPage
    },
    TradePage: {
        screen: TradePage
    },
    UserEmailVerifyPage: {
        screen: UserEmailVerifyPage
    },
    UserGoogleAuthPage: {
        screen: UserGoogleAuthPage
    },
    UserKYCPage: {
        screen: UserKYCPage
    },
    UserPasswordResetPage: {
        screen: UserPasswordResetPage
    },
    UserPhoneVerifyPage: {
        screen: UserPhoneVerifyPage
    },
    FundPasswordChangePage: {
        screen: FundPasswordChangePage
    },
    AssetsDepositHistoryPage: {
        screen: AssetsDepositHistoryPage
    },
    AssetsDepositPage: {
        screen: AssetsDepositPage
    },
    AssetsWithdrawHistoryPage: {
        screen: AssetsWithdrawHistoryPage
    },
    AssetsWithdrawPage: {
        screen: AssetsWithdrawPage
    },
    PasswordChangePage: {
        screen: PasswordChangePage
    },
    GoogleAuthOpenPage: {
        screen: GoogleAuthOpenPage
    },
    AssetsDetailPage: {
        screen: AssetsDetailPage
    },
    AuthLoginPage: {
        screen: AuthLoginPage
    },
    MinePage: {
        screen: MinePage
    },
    AccountInfoPage: {
        screen: AccountInfoPage
    },
    NewsDetailPage: {
        screen: NewsDetailPage
    },
    BasicUserInfoVerifyPage: {
        screen: BasicUserInfoVerifyPage
    },
    UserInfoVerifyPage: {
        screen: UserInfoVerifyPage
    },
    GoogleAuthClosePage: {
        screen: GoogleAuthClosePage
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


