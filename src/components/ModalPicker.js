'use strict';

import React from 'react';
import {
    Dimensions,
    InteractionManager,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import commonStyles from "../styles/commonStyles";

import { getBottomSpace } from 'react-native-iphone-x-helper'
import I18n from "../I18n";
import Keys from "../configs/Keys";

const PropTypes = require( 'prop-types' );
const window = Dimensions.get( 'window' );

const propTypes = {
    isOpen: PropTypes.bool,
    data: PropTypes.array,
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
};

const defaultProps = {
    isOpen: false,
    data: [],
    onSelect: () => {
    },
    onClose: () => {
    },
};

class ModalPicker extends ( React.PureComponent || React.Component ) {

    constructor( props ) {
        super( props );

        this.state = {
            isOpen: props.isOpen,
        };
    }

    componentDidMount() {
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.isOpen !== this.state.isOpen ) {
            if ( nextProps.isOpen ) {
                this.open();
            } else {
                this.close();
            }
        }
    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {

        };
    }

    onSelect( item ) {
        this.close();

        setTimeout( () => {
            InteractionManager.runAfterInteractions( () => {
                this.props.onSelect && this.props.onSelect( item );
            } );
        }, 100 )
    }

    close() {
        this.setState( {
            isOpen: false
        } );

        this.props.onClose && this.props.onClose();
    }

    open() {
        this.setState( {
            isOpen: true
        } );
    }

    renderOption( option ) {
        return (
            <TouchableOpacity key={option.key} onPress={() => this.onSelect( option )}>
                <View style={[{
                    height: 48
                }, commonStyles.justAlignCenter]}>
                    <Text style={[{
                        textAlign: 'center',
                        fontSize: 18,
                        color: '#0166be'
                    }]}>{option.label}</Text>
                </View>
            </TouchableOpacity> )
    }

    renderOptionList() {
        const items = [];
        for ( let index = 0; index < this.props.data.length; index++ ) {
            items.push( this.renderOption( this.props.data[ index ] ) );

            if ( index < this.props.data.length - 1 ) {
                items.push( <View key={'interval:' + index} style={[commonStyles.commonIntervalStyle]}/> );
            }
        }

        return (
            <View style={[{
                paddingLeft: 10,
                paddingRight: 10,
                position: 'absolute', left: 0, bottom: getBottomSpace() + 10, right: 0
            }]}>
                <View style={[commonStyles.wrapper]}/>
                <View style={[{
                    borderRadius: 5,
                    backgroundColor: 'white',
                }]}>
                    <ScrollView style={[{ maxHeight: window.height * ( 3 / 5 ) }]}>
                        <View>
                            {items}
                        </View>
                    </ScrollView>
                </View>
                <View style={[{
                    marginTop: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                }]}>
                    <TouchableOpacity onPress={() => {
                        this.close()
                    }}>
                        <View style={[{
                            height: 48,
                        }, commonStyles.justAlignCenter]}>
                            <Text
                                style={[{
                                    textAlign: 'center',
                                    color: '#0166be',
                                    fontSize: 18
                                }]}>{I18n.t( Keys.cancel )}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    closeModal() {
        if ( this.props.onClose ) {
            this.props.onClose();
        }

        this.setState(
            {
                isOpen: false,
            }
        );
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.isOpen}
                onRequestClose={() => {
                    this.close()
                }}
            >
                <View style={[{ position: 'absolute', left: 0, top: 0, right: 0 }]}>
                    <TouchableWithoutFeedback
                        style={[{
                            flex: 1,
                            height: window.height,
                        }]}
                        onPress={() => {
                            this.closeModal();
                        }}
                    >
                        <View style={[{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            height: window.height,
                        }]}/>

                    </TouchableWithoutFeedback>
                </View>


                {this.renderOptionList()}
            </Modal>
        );
    }
}

const styles = StyleSheet.create( {} );

ModalPicker.propTypes = propTypes;
ModalPicker.defaultProps = defaultProps;

export default ModalPicker;
