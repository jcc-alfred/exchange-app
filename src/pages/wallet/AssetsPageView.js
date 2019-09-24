import React from 'react';
import { InteractionManager, SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import { Text } from "react-native-elements";
import Toast from "react-native-root-toast";
import Spinner from "react-native-loading-spinner-overlay";

class AssetsPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            isRequesting: false,
            result: ''
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "AssetsPageView",
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.loadData()
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

    loadData() {

        this.setState( {
            isRequesting: true
        } );

        InteractionManager.runAfterInteractions( () => {
            this.props.onUserGetAssets( ( error, resBody ) => {
                if ( error ) {
                    this.setState( {
                        isRequesting: false
                    } );

                    Toast.show( error.message );
                } else {
                    this.setState( {
                        isRequesting: false,
                        result: JSON.stringify( resBody )
                    } );
                }
            } );
        } );
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>
                    <Text>
                        {this.state.result}
                    </Text>

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default AssetsPageView;

