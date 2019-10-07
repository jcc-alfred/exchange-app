import React from 'react';
import { ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import {ExpoLinksView} from "@expo/samples";
import LinksScreen from "./LinksScreen";

export default function LoginScreen() {
    return (
        <ScrollView style={styles.container}>

            <TextInput style={styles.inputView} value={'用户名'}/>
            <TextInput
                style={styles.inputView}
                value={'密码'}
            />

            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}> 登录 </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.forgetPasswordButton}

            >
                <Text style={styles.forgetPasswordText}> 忘记密码 </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.forgetPasswordButton}
            >
                <Text > 还没有账号? </Text><Text style={styles.forgetPasswordText}>注册账号</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

LoginScreen.navigationOptions = {
    title: 'login',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },

    inputView: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        borderColor:'#e9e6e3',
        borderWidth: 1,
        backgroundColor: '#fff',
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 8,

    },

    button: {
        alignItems: 'center',
        backgroundColor: '#6c75dd',
        color: '#fff',
        padding: 10,
        marginTop: 20,
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 8,
    },

    buttonText: {
        color: '#ffffff',
    },

    forgetPasswordButton:{
        color:'gray',
        padding: 10,
        alignItems: 'center',
    },

    forgetPasswordText:{
        color:'#5c86e9',
    }


});