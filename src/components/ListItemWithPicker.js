import React from "react";

import { StyleSheet, View, ViewPropTypes } from "react-native";
import PropTypes from 'prop-types';
import RNPickerSelect from 'react-native-picker-select';
import { Divider, Text } from "react-native-elements";
import commonStyles from "../styles/commonStyles";
import constStyles from "../styles/constStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";

class ListItemWithPicker extends React.Component {
    static propTypes = {
        containerStyle: ViewPropTypes.style,
        title: PropTypes.string,
        items: PropTypes.array.isRequired,
        isEditable: PropTypes.bool,
        topDivider: PropTypes.bool,
        bottomDivider: PropTypes.bool,
        selectItem: PropTypes.object,
        onItemChange: PropTypes.func,
        onDonePress: PropTypes.func,
        errorMessage: PropTypes.string,
    };

    constructor( props ) {
        super( props );
    }

    togglePicker() {
        this.picker.togglePicker()
    }

    render() {
        return (
            <View style={this.props.containerStyle}>
                {
                    this.props.topDivider ?
                        <Divider style={[ commonStyles.divide, {
                            marginLeft: 0,
                            marginRight: 0,
                        } ]}/>
                        :
                        null
                }
                {
                    this.props.title ?
                        <Text style={[ { color: constStyles.tipTitleColor, fontSize: 14 } ]}>
                            {this.props.title}
                        </Text>
                        :
                        null
                }
                <RNPickerSelect
                    ref={( picker ) => {
                        this.picker = picker
                    }}
                    style={{
                        inputIOS: [ {
                            ...styles.inputIOS,
                        }, this.props.contentTextStyle ],
                        inputAndroid: [ {
                            ...styles.inputAndroid
                        }, this.props.contentTextStyle ],
                        iconContainer: {
                            top: 20,
                            right: 10,
                        },
                        placeholder: {
                            ...this.props.placeholderTextStyle,
                            color: constStyles.tipTitleColor,
                            fontSize: 18,
                        },
                    }}
                    placeholder={{
                        label: I18n.t( Keys.please_choose_first ),
                        value: null,
                        color: '#9EA0A4',
                    }}
                    doneText={I18n.t( Keys.done )}
                    onDonePress={() => {
                        this.props.onDonePress && this.props.onDonePress();
                    }}
                    onValueChange={( value ) => {
                        for ( let index = 0; index < this.props.items.length; index++ ) {
                            if ( this.props.items[ index ].value === value ) {
                                this.props.onItemChange && this.props.onItemChange( this.props.items[ index ] );
                                break;
                            }
                        }
                    }}
                    items={this.props.items}
                    value={this.props.selectItem ? this.props.selectItem.value : null}
                    disabled={!this.props.isEditable}
                />


                {
                    this.props.bottomDivider ?
                        <Divider style={[ commonStyles.divide, {
                            marginLeft: 0,
                            marginRight: 0,
                        } ]}/>
                        :
                        null
                }

                {
                    this.props.errorMessage && this.props.errorMessage.length > 0 ?
                        <Text style={{
                            ...this.props.errorStyle,
                            fontSize: 12,
                            marginLeft: 4,
                            marginTop: 4,
                            marginBottom: 4
                        }}>
                            {
                                this.props.errorMessage
                            }
                        </Text>
                        :
                        null
                }

            </View>
        );
    }
}


const styles = StyleSheet.create( {
    inputIOS: {
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 0,
        borderWidth: 0,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 18,
        paddingVertical: 8,
        paddingHorizontal: 0,
        borderWidth: 0,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
} );


export default ListItemWithPicker;
