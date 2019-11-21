import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { ListItem } from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import Constants from 'expo-constants';
import I18n from "../I18n";
import Keys from "../configs/Keys";
import { AntDesign } from "@expo/vector-icons";
import * as env from '../env';

class AboutPageView extends React.Component {

    constructor( props ) {
        super( props );


        this.state = {
            isRequesting: false,
            number: 1
        }
    }

    static navigationOptions = ( props ) => {
        const { navigation } = props;
        const { state, setParams } = navigation;
        const { params } = state;

        return {
            title: I18n.t( Keys.about ),
            headerBackTitle: null,
        };
    };

    componentDidMount() {
        this.props.onGetArticleList();
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
            <View style={[commonStyles.wrapper,]}>
                <StatusBar backgroundColor="blue" barStyle="dark-content"/>
                <SafeAreaView style={[commonStyles.wrapper]}>
                    <View>
                        {
                            this.props.docList.map( i => {
                                return (
                                    <ListItem
                                        key={i.page_doc_id}
                                        title={I18n.locale === 'zh-Hans' ? i.doc_title : i.doc_title_en}
                                        rightIcon={
                                            <AntDesign
                                                name="right"
                                                size={25}
                                                color={'black'}
                                            />
                                        }
                                        onPress={() => {
                                            this.props.navigation.navigate( 'WebViewPage', {
                                                url: env.webDomain + '/#' + i.page_url + ( I18n.locale === 'zh-Hans' ? "lang=zh-cn" : "" ),
                                                webTitle: I18n.locale === 'zh-Hans' ? i.doc_title : i.doc_title_en
                                            } )
                                        }}
                                        topDivider={true}
                                        bottomDivider={false}
                                    />
                                )

                            } )
                        }
                        <ListItem
                            title={I18n.t( Keys.version )}
                            titleStyle={{ color: 'black' }}
                            rightTitle={Constants.nativeAppVersion}
                            topDivider={true}
                            bottomDivider={false}
                        />
                    </View>


                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create( {} );

export default AboutPageView;

