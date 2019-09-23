import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Spinner from "react-native-loading-spinner-overlay";
import { Updates } from 'expo';
import { ConfirmDialog } from "react-native-simple-dialogs";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import { Text } from "react-native-elements";

class HomePageView extends React.Component {
    constructor( props ) {
        super( props );


        this.state = {
            isRequesting: false,
            updateDialogVisible: false
        }

    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.home ),
            headerBackTitle: null,
        };
    };

    componentDidMount() {

        this.checkForUpdate();
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


    checkForUpdate() {
        Updates.checkForUpdateAsync()
            .then( ( update ) => {
                if ( update.isAvailable ) {
                    this.setState( {
                        updateDialogVisible: true
                    } );
                }
            } )
            .catch( err => {

            } )
    }

    render() {
        return (
            <View style={commonStyles.wrapper}>
                <SafeAreaView style={[ commonStyles.wrapper ]}>
                    <Text>1111</Text>

                    <ConfirmDialog
                        title={I18n.t( Keys.notification )}
                        message={I18n.t( Keys.update_now )}
                        visible={this.state.updateDialogVisible}
                        onTouchOutside={() => this.setState( { updateDialogVisible: false } )}
                        positiveButton={{
                            title: I18n.t( Keys.yes ),
                            onPress: () => {
                                this.setState( {
                                    updateDialogVisible: false
                                } );
                                this.doUpdate();
                            }
                        }}
                        negativeButton={{
                            title: I18n.t( Keys.no ),
                            onPress: () => {
                                this.setState( {
                                    updateDialogVisible: false
                                } );
                            }
                        }}
                    />

                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}


const
    styles = StyleSheet.create( {
        scene: {
            flex: 1,
        },
    } );

export default HomePageView;

