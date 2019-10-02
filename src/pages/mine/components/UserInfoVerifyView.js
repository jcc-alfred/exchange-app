import React from "react";
import { Platform, View } from 'react-native';
import { connect } from "react-redux";
import { Button, ListItem, Text } from "react-native-elements";
import commonStyles from "../../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import constStyles from "../../../styles/constStyles";
import UserInfoVerifyPage from "../UserInfoVerifyPage";

class UserInfoVerifyView extends React.Component {
    static propTypes = {};

    constructor( props ) {
        super( props );

        this.state = {}
    }


    shouldComponentUpdate( nextProps, nextState ) {
        return true;
    }


    render() {
        return (
            <View>
                <ListItem
                    title={
                        <View style={[ { flexDirection: 'row', justifyContent: 'center' } ]}>
                            <Text style={[ commonStyles.wrapper ]}>{'身份认证'}</Text>
                            <Button
                                type="clear"
                                icon={
                                    <Ionicons
                                        name="md-information-circle"
                                        size={Platform.OS === 'ios' ? 22 : 25}
                                        color={constStyles.THEME_COLOR}
                                    />
                                }
                                title="去认证"
                                onPress={()=>{
                                    this.props.navigation.navigate( "UserInfoVerifyPage" )
                                }}
                            />
                        </View>
                    }
                    subtitle={
                        <View>
                            <Text>
                                {
                                    "身份认证后，方可进行高级认证"
                                }
                            </Text>
                            <Text>
                                {
                                    "身份认证后，可进行中国区单笔高于2000或累计金额大于10000的法币交易"
                                }
                            </Text>
                        </View>
                    }
                />
            </View>
        );
    }
}


function select( store ) {
    return {}
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );
export default connect( select, mapDispatchToProps )( UserInfoVerifyView )

