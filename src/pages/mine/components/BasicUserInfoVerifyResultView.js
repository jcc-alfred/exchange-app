import React from "react";
import { View } from 'react-native';
import { connect } from "react-redux";
import {Divider, Text} from "react-native-elements";

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
                <Text>BasicUserInfoVerifyResultView</Text>
            </View>
        );
    }
}


function select( store ) {
    return {}
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );
export default connect( select, mapDispatchToProps )( BasicUserInfoVerifyResultView )

