import React from 'react';
import {InteractionManager, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { TabView, SceneMap } from 'react-native-tab-view';
import { Text,Button, Input, } from "react-native-elements";
import Spinner from "../mine/UserInfoVerifyPageView";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";





const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081', flexDirection: 'row' }]} >

        <Button
            title={I18n.t( Keys.resend )}
            type="outline"
            containerStyle={[{ flex:1, margin:5}]}
            titleStyle={[ { fontSize: 14, } ]}
            onPress={() => {

            }
            }
        />
        <Button
            title={I18n.t( Keys.resend )}
            type="outline"
            containerStyle={[{ flex:1, margin:5}]}
            titleStyle={[ { fontSize: 14, } ]}
            onPress={() => {

            }
            }
        />
        <Button
            title={I18n.t( Keys.resend )}
            type="outline"
            containerStyle={[{ flex:1, margin:5}]}
            titleStyle={[ { fontSize: 14, } ]}
            onPress={() => {

            }
            }
        />
        <Button
            title={I18n.t( Keys.resend )}
            type="outline"
            containerStyle={[{ flex:1, margin:5}]}
            titleStyle={[ { fontSize: 14, } ]}
            onPress={() => {

            }
            }
        />
        <Button
            title={I18n.t( Keys.resend )}
            type="outline"
            containerStyle={[{ flex:1, margin:5}]}
            titleStyle={[ { fontSize: 14, } ]}
            onPress={() => {

            }
            }
        />

    </View>
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);



class OTCTradePageView extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            index: 0,

            isRequesting: false,
            routes: [
                { key: 'first', title: 'Buy' },
                { key: 'second', title: 'Sell' },
            ],
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "OTCTradePageView",
            headerBackTitle: null,
        };
    };

    static loadData() {
        InteractionManager.runAfterInteractions( () => {
        } )
    }

    componentDidMount() {
        OTCTradePageView.loadData()
    }

    changeState( value, field ) {
        let param = {};
        param[ field ] = value;
        this.setState( param )
    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {

        };
    }

    componentWillReceiveProps( nextProps ) {
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return true;
    }


    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>

                    {this.renderTopMenuBar()}
                    {this.renderTabView()}


                </SafeAreaView>
            </View>
        );
    }



    renderTabView(){
        return (
            <TabView
                navigationState={this.state}
                onIndexChange={index => this.setState({ index })}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                })}
            />
        );
    }



    renderTopMenuBar() {
        return (
            <View style={{flexDirection:'row' ,}}>
                {/*<Button*/}

                <Button
                    title={I18n.t( Keys.resend )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 14, } ]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.resend )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 14, } ]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.resend )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 14, } ]}
                    onPress={() => {

                    }
                    }
                />

                <Button
                    title={I18n.t( Keys.resend )}
                    type="outline"
                    containerStyle={[{ flex:1, margin:5}]}
                    titleStyle={[ { fontSize: 14, } ]}
                    onPress={() => {

                    }
                    }
                />


            </View>
        )
    }

}



const styles = StyleSheet.create( {
    scene: {
        flex: 1,
    },
} );



export default OTCTradePageView;

