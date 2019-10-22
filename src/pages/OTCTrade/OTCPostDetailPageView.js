import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Text} from 'react-native';
import commonStyles from "../../styles/commonStyles";
import I18n from "../../I18n";
import Keys from "../../configs/Keys";
import ColorUtil from "../../util/ColorUtil";

class OTCPostDetailPageView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entrust: props.navigation.state.params.entrust,
        }
    }

    static navigationOptions = (props) => {
        const {navigation} = props;
        const {state, setParams} = navigation;
        const {params} = state;

        return {
            title: I18n.t( Keys.post_detail ),
            headerBackTitle: null,
        };
    };

    componentDidMount() {
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {

        };
    }

    componentWillReceiveProps(nextProps) {
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <View style={[commonStyles.wrapper,]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper,]}>
                    <ScrollView style={[commonStyles.wrapper]}>
                        <View style={{padding : 16}}>
                            <Text>{I18n.t(Keys.limitation)}</Text>
                            <Text
                                style={{color: ColorUtil.secondary_text_color, marginTop: 10}}>{this.state.entrust.price * this.state.entrust.min_trade_amount + ' ' + this.state.entrust.currency}</Text>
                        </View>

                            <View style={{height: 1, backgroundColor: '#d1cfcf'}}/>

                        <View style={{padding : 16}}>

                            <Text>{I18n.t(Keys.trade_des)}</Text>
                            <Text style={{color: ColorUtil.secondary_text_color, marginTop: 10}}>{this.state.entrust.remark}</Text>
                        </View>

                            <View style={{height: 1, backgroundColor: '#d1cfcf'}}/>

                        <View style={{padding : 16}}>
                            <Text>{I18n.t(Keys.trade_rem)}</Text>
                            <Text
                                style={{color: ColorUtil.secondary_text_color, marginTop: 10}}>{this.state.entrust.secret_remark}</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default OTCPostDetailPageView;

