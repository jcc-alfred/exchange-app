import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Button, Text } from "react-native-elements";

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


                    <Button
                        title={"Deposit"}
                        type="outline"
                        onPress={() => {
                            this.props.navigation.navigate( 'AssetsDepositPage' )
                        }
                        }
                        containerStyle={[]}
                    />

                    <Button
                        title={"Withdraw"}
                        type="outline"
                        onPress={() => {
                            this.props.navigation.navigate( 'AssetsWithdrawPage' )
                        }
                        }
                        containerStyle={[]}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AssetsDetailPageView;

