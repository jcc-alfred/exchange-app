import React from "react";
import { Platform, View } from 'react-native';
import { connect } from "react-redux";
import { ListItem, Text } from "react-native-elements";
import commonStyles from "../../../styles/commonStyles";
import { Ionicons } from "@expo/vector-icons";
import constStyles from "../../../styles/constStyles";
import CountryUtil from "../../countrySelect/util/CountryUtil";
import I18n from "../../../I18n";
import Keys from "../../../configs/Keys";

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
        if ( !this.props.userIdentity ) {
            return <View/>
        }

        const country = CountryUtil.calcCountryByPhoneCode( this.props.userIdentity.area_code );

        return (
            <View>
                <ListItem
                    title={
                        <View style={[ { flexDirection: 'row', justifyContent: 'center',borderBottomColor:'#e8e6e7',borderBottomWidth:1,padding:4 } ]}>
                            <Text style={[ commonStyles.wrapper ]}>{I18n.t( Keys.base_info )}</Text>

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
                                title={I18n.t( Keys.country_title )}
                                rightTitle={country ? country.name : ''}
                            />
                            <ListItem
                                title={I18n.t( Keys.full_name )}
                                rightTitle={this.props.userIdentity.full_name}
                            />

                            <ListItem
                                title={I18n.t( Keys.id_no )}
                                rightTitle={this.props.userIdentity.card_id}
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
        userIdentity: store.userStore.userIdentity,
    }
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );
export default connect( select, mapDispatchToProps )( BasicUserInfoVerifyResultView )

