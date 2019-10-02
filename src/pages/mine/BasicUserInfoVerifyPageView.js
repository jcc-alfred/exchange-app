import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import commonStyles from "../../styles/commonStyles";
import Spinner from "react-native-loading-spinner-overlay";
import CountryUtil from "../countrySelect/util/CountryUtil";
import { Button, Input, ListItem } from "react-native-elements";
import constStyles from "../../styles/constStyles";
import { NavigationActions, StackActions } from "react-navigation";

class BasicUserInfoVerifyPageView extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            currentCountry: CountryUtil.calcCountry( null ),
            firstName: '',
            lastName: '',
            idNo: '',
            isRequesting: false,
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: "身份验证",
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

    send() {
        this.props.navigation.dispatch(
            StackActions.reset(
                {
                    index: 1,
                    actions: [
                        NavigationActions.navigate( { routeName: 'mainPage' } ),
                        NavigationActions.navigate( { routeName: 'MinePage' } ),
                    ]
                }
            ) );
    }

    render() {
        return (
            <View style={[ commonStyles.wrapper, ]}>
                <SafeAreaView style={[ commonStyles.wrapper, ]}>

                    <ListItem
                        title={"Country"}
                        rightTitle={this.state.currentCountry.name}
                        bottomDivider
                        chevron={{ color: constStyles.tipTitleColor }}
                        onPress={() => {
                            this.props.navigation.navigate( "CountrySelectPage", {
                                callback: ( country ) => {
                                    this.setState( {
                                        currentCountry: country
                                    } );
                                }
                            } );
                        }}
                    />

                    <Input
                        label={"First Name"}
                        style={[ commonStyles.wrapper ]}
                        leftIconContainerStyle={[ commonStyles.pdr_normal ]}
                        value={this.state.firstName}
                        onChangeText={( text ) => this.setState( {
                            firstName: text
                        } )}
                        keyboardType={'phone-pad'}
                        errorStyle={{ color: 'red' }}
                        errorMessage={
                            this.state.showError && ( !this.state.firstName || this.state.firstName.length <= 0 ) ?
                                "Please input first name"
                                :
                                null
                        }
                    />

                    <Input
                        label={"Last Name"}
                        style={[ commonStyles.wrapper ]}
                        leftIconContainerStyle={[ commonStyles.pdr_normal ]}
                        value={this.state.lastName}
                        onChangeText={( text ) => this.setState( {
                            lastName: text
                        } )}
                        keyboardType={'phone-pad'}
                        errorStyle={{ color: 'red' }}
                        errorMessage={
                            this.state.showError && ( !this.state.lastName || this.state.lastName.length <= 0 ) ?
                                "Please input last name"
                                :
                                null
                        }
                    />

                    <Input
                        label={"Id No"}
                        style={[ commonStyles.wrapper ]}
                        leftIconContainerStyle={[ commonStyles.pdr_normal ]}
                        value={this.state.idNo}
                        onChangeText={( text ) => this.setState( {
                            idNo: text
                        } )}
                        keyboardType={'phone-pad'}
                        errorStyle={{ color: 'red' }}
                        errorMessage={
                            this.state.showError && ( !this.state.idNo || this.state.idNo.length <= 0 ) ?
                                "Please input id no"
                                :
                                null
                        }
                    />

                    <Button
                        title={"Send"}
                        type="Send"
                        onPress={() => {
                            this.send()
                        }
                        }
                        containerStyle={[ commonStyles.mgt_normal ]}
                    />


                    <Spinner visible={this.state.isRequesting} cancelable={true}/>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create( {} );

export default BasicUserInfoVerifyPageView;

