import React from 'react';
import { SafeAreaView, StyleSheet, View , Platform} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Text } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

class AssetsDetailPageView extends React.Component {

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
            title: "TokenWithdrawHistoryPageView",
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
                    <Text>
                        {JSON.stringify( this.props.assets )}
                    </Text>

                    <View style={[ { flexDirection: 'row' }, commonStyles.paddingCommon ]}>
                        <Button
                            icon={
                                <Ionicons
                                    name="md-wallet"
                                    size={Platform.OS === 'ios' ? 22 : 25}
                                    color={'white'}
                                />
                            }
                            title="Deposit"
                            onPress={() => {
                                this.props.navigation.navigate( "AssetsDepositPage",{
                                    assets: this.props.assets
                                } )






                            }
                            }
                        />

                        <View style={[ commonStyles.wrapper ]}/>

                        <Button
                            icon={
                                <Ionicons
                                    name="md-card"
                                    size={Platform.OS === 'ios' ? 22 : 25}
                                    color={'white'}
                                />
                            }
                            title="Withdraw"
                            onPress={() => {
                                this.props.navigation.navigate( "AssetsWithdrawPage" )
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

export default AssetsDetailPageView;

