import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import {Button, Text} from "react-native-elements";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";

class TradePageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "TradePageView",
            headerBackTitle: null,
        };
    };

    componentDidMount() {
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
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <View style={[{flexDirection:'row'}]}>
                        <Button
                            // title={I18n.t( Keys.login )}
                            type="solid"
                            onPress={() => {
                                // this.login();
                            }
                            }


                        />

                        <Text >
                            {"EOS/USDT"}
                        </Text>
                        <Text>
                            123123
                        </Text>
                        <Button
                            type="outline"
                            onPress={() => {
                                // this.login();
                            }
                            }
                        />
                        <Button
                            type="outline"
                            onPress={() => {
                                // this.login();
                            }
                            }
                        />
                        <Button
                            // title={I18n.t( Keys.login )}
                            type="outline"
                            onPress={() => {
                                // this.login();
                            }
                            }
                        />


                    </View>

                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default TradePageView;

