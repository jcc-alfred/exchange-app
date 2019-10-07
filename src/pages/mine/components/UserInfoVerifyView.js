import React from "react";
import {Platform, View} from 'react-native';
import {connect} from "react-redux";
import {Button, ListItem, Text} from "react-native-elements";
import commonStyles from "../../../styles/commonStyles";
import {Ionicons} from "@expo/vector-icons";
import constStyles from "../../../styles/constStyles";
import UserInfoVerifyPage from "../UserInfoVerifyPage";
import Keys from "../../../configs/Keys";
import I18n from '../../../I18n'

class UserInfoVerifyView extends React.Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {}
    }


    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    renderState() {
        if (this.props.userInfo.identity_status === 1) {
            return (
                <Button
                    type="clear"
                    icon={
                        <Ionicons
                            name="md-information-circle"
                            size={Platform.OS === 'ios' ? 22 : 25}
                            color={constStyles.THEME_COLOR}
                        />
                    }
                    title={I18n.t(Keys.verifyNow)}
                    onPress={() => {
                        this.props.navigation.navigate("UserInfoVerifyPage")
                    }}
                />
            );
        } else if (this.props.userInfo.identity_status === 2) {
            return (
                <Text>
                    {
                        I18n.t(Keys.underReview)
                    }
                </Text>
            );
        } else if (this.props.userInfo.identity_status === 3) {
            return (
                <Text>
                    {
                        I18n.t(Keys.reviewPassed)
                    }
                </Text>
            );
        } else if (this.props.userInfo.identity_status === 4) {
            return (
                <Button
                    type="clear"
                    icon={
                        <Ionicons
                            name="md-information-circle"
                            size={Platform.OS === 'ios' ? 22 : 25}
                            color={constStyles.THEME_COLOR}
                        />
                    }
                    title="认证失败"
                    onPress={() => {
                        this.props.navigation.navigate("UserInfoVerifyPage")
                    }}
                />
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <View>
                <ListItem
                    title={
                        <View style={[{flexDirection: 'row', justifyContent: 'center'}]}>
                            <Text style={[{
                                flex: 8,
                                textAlignVertical: 'center',
                                alignItems: 'center',
                                padding: 8
                            }]}>{I18n.t(Keys.senior_Verification)}</Text>
                            <View style={{flex: 3}}>
                                {
                                    this.renderState()
                                }
                            </View>
                        </View>
                    }
                    subtitle={
                        <View>
                            <Text>
                                {I18n.t(Keys.senior_Verification_Tips)}
                            </Text>
                        </View>
                    }
                />
            </View>
        );
    }
}


function select(store) {
    return {
        isLoggedIn: store.userStore.isLoggedIn,
        userInfo: store.userStore.userInfo,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({});
export default connect(select, mapDispatchToProps)(UserInfoVerifyView)

