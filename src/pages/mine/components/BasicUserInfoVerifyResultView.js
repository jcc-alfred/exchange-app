import React from "react";
import { Platform, View } from 'react-native';
import { connect } from "react-redux";
import { ListItem, Text } from "react-native-elements";
import commonStyles from "../../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import constStyles from "../../../styles/constStyles";

class BasicUserInfoVerifyResultView extends React.Component {
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

                            <Ionicons
                                name="md-checkmark-circle-outline"
                                size={Platform.OS === 'ios' ? 22 : 25}
                                color={constStyles.THEME_COLOR}
                            />
                        </View>
                    }
                    subtitle={
                        <View>
                            <ListItem
                                title="Country"
                                rightTitle={"china"}
                            />
                            <ListItem
                                title="Name"
                                rightTitle={"aaa bbb"}
                            />

                            <ListItem
                                title="id no"
                                rightTitle={"E1212121212"}
                            />
                        </View>
                    }
                />
            </View>
        );
    }
}


function select( store ) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );
export default connect( select, mapDispatchToProps )( BasicUserInfoVerifyResultView )

