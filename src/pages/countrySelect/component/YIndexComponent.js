import React from "react";
import { Text, View, ViewPropTypes } from "react-native";
import commonStyles from "../../../styles/commonStyles";
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

const PropTypes = require( 'prop-types' );

class YIndexComponent extends ( React.PureComponent || React.Component ) {
    static propTypes = {
        isContainFav: PropTypes.bool.isRequired,
        onSelect: PropTypes.func.isRequired,
        style: ViewPropTypes.style,
        isOpen: PropTypes.bool,
    };

    static FAV_CODE = 'fav';

    constructor( props ) {
        super( props );

        let data;
        if ( props.isContainFav ) {
            data = [
                YIndexComponent.FAV_CODE, '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
                'Z' ];
        } else {
            data = [
                '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
                'Z' ];
        }

        this.state = {
            data: data,
            width: 0,
            height: 0,
            pageX: 0,
            pageY: 0,
            currentKey: null,
            isFocus: false,
        };

        this._renderContent = this.renderContent();
    }

    static renderItem( data ) {
        return (
            <View
                style={[ commonStyles.wrapper, commonStyles.justAlignCenter, {} ]}
                key={data}
                onStartShouldSetResponder={() => {
                    return false;
                }}
                onMoveShouldSetResponder={() => {
                    return false;
                }}
            >
                <Text
                    style={[ commonStyles.commonTextColorStyle, { fontSize: 12 } ]}
                    onStartShouldSetResponder={() => {
                        return false;
                    }}
                    onMoveShouldSetResponder={() => {
                        return false;
                    }}
                >
                    {
                        data
                    }
                </Text>
            </View>
        );
    }

    static renderFAVItem( data ) {
        return (
            <View
                style={[ commonStyles.wrapper, commonStyles.justAlignCenter, {} ]}
                key={data}
                onStartShouldSetResponder={() => {
                    return false;
                }}
                onMoveShouldSetResponder={() => {
                    return false;
                }}
            >
                <Ionicons
                    onStartShouldSetResponder={() => {
                        return false;
                    }}
                    onMoveShouldSetResponder={() => {
                        return false;
                    }}
                    style={[ {} ]}
                    name={'ios-star-outline'}
                    size={12}
                    color={'#292e33'}>
                </Ionicons>
            </View>
        );
    }

    componentWillUnmount() {
        this.setState = ( state, callback ) => {

        };
    }

    calcCurrentKey( evt ) {
        const currentY = evt.nativeEvent.pageY - this.state.pageY - 15;
        const totalHeight = this.state.height - 15 - 15;
        const itemHeight = totalHeight / this.state.data.length;

        if ( currentY / itemHeight > this.state.data.length || currentY <= 0 ) {
            this.state.currentKey = null;
        } else {
            const newKey = this.state.data[ parseInt( currentY / itemHeight ) ];
            if ( newKey !== this.state.currentKey ) {
                this.state.currentKey = newKey;

                console.log( "this.state.currentKey = " + this.state.currentKey );

                if ( this.props.onSelect ) {
                    this.props.onSelect( this.state.currentKey );
                }
            }
        }
    }

    renderContent() {
        const pages = [];
        for ( let i = 0; i < this.state.data.length; i++ ) {
            if ( this.state.data[ i ] === YIndexComponent.FAV_CODE ) {
                pages.push(
                    YIndexComponent.renderFAVItem( this.state.data[ i ] )
                );
            } else {
                pages.push(
                    YIndexComponent.renderItem( this.state.data[ i ] )
                );
            }
        }

        return pages;
    }

    render() {
        if ( !this.props.isOpen ) {
            return null;
        }

        return (
            <View
                ref={( view ) => {
                    this._view = view;
                }}
                style={[
                    commonStyles.wrapper,
                    {
                        width: 30,
                        marginTop: 40,
                        marginBottom: 40,
                        borderRadius: 15,
                        paddingTop: 15,
                        paddingBottom: 15
                    },
                    this.props.style ]}
                onLayout={( event ) => {
                    this._view.measure( ( x,
                                          y,
                                          width,
                                          height,
                                          pageX,
                                          pageY, ) => {
                            this.setState( {
                                width: width,
                                height: height,
                                pageX: pageX,
                                pageY: pageY,
                            } );
                        }
                    );
                }}
                onStartShouldSetResponder={() => {
                    return true;
                }}
                onMoveShouldSetResponder={() => {
                    return true;
                }}
                onResponderStart={( evt ) => {
                    this.setState( {
                        isFocus: true
                    } );

                    this.calcCurrentKey( evt );
                }}
                onResponderMove={( evt ) => {
                    this.calcCurrentKey( evt )
                }}
                onResponderRelease={( evt ) => {
                    this.state.currentKey = null;
                }}
                onResponderEnd={( evt ) => {
                    this.setState( {
                        isFocus: false
                    } );
                }}
            >
                {this._renderContent}
            </View>
        )
    }
}

function select( store ) {
    return {}
}

export default connect( select )( YIndexComponent );
