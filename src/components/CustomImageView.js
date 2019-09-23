import React from "react";

import { CameraRoll, Modal, Text, TouchableOpacity, View } from "react-native";
import PropTypes from 'prop-types';
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import commonStyles from "../styles/commonStyles";
import I18n from "../I18n";
import Keys from "../configs/Keys";
import ImageViewer from "react-native-image-zoom-viewer";
import * as FileSystem from 'expo-file-system';
import * as Permissions from "expo-permissions";

import { Button } from "react-native-elements";
import Toast from "react-native-root-toast";

class CustomImageView extends React.Component {
    static propTypes = {
        items: PropTypes.array,
        itemDisplay: PropTypes.object,
        onClose: PropTypes.func,
    };

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <Modal visible={true} transparent={true}>
                <ImageViewer
                    imageUrls={this.props.items}
                    index={this.props.items.indexOf( this.props.itemDisplay )}
                    onCancel={() => {
                    }
                    }
                    onSave={( result ) => {
                        console.log( JSON.stringify( result ) )

                        const fileName = result.substr( result.lastIndexOf( "/" ) );

                        FileSystem.downloadAsync(
                            result,
                            FileSystem.documentDirectory + fileName
                        )
                            .then( ( { uri } ) => {
                                Permissions.askAsync( Permissions.CAMERA_ROLL )
                                    .then( ( { status } ) => {
                                        if ( status !== 'granted' ) {
                                            alert( I18n.t( Keys.camera_roll_permission_error ) );
                                        } else {
                                            console.log( 'Finished downloading to ', uri );
                                            CameraRoll.saveToCameraRoll( uri, "photo" );

                                            Toast.show( I18n.t( Keys.save_success ) )
                                        }
                                    } )
                                    .catch( error => {
                                        console.error( error );
                                    } );
                            } )
                            .catch( error => {
                                console.error( error );
                            } );
                    }}
                    menus={( { cancel, saveToLocal } ) => {
                        return (
                            <View style={[ {
                                paddingLeft: 10,
                                paddingRight: 10,
                                position: 'absolute', left: 0, bottom: getBottomSpace() + 10, right: 0
                            } ]}>
                                <View style={[ commonStyles.wrapper ]}/>
                                <View style={[ {
                                    borderRadius: 5,
                                    backgroundColor: 'white',
                                } ]}>
                                    <TouchableOpacity onPress={() => {
                                        saveToLocal()
                                    }}>
                                        <View style={[ {
                                            height: 48
                                        }, commonStyles.justAlignCenter ]}>
                                            <Text style={[ {
                                                textAlign: 'center',
                                                fontSize: 18,
                                                color: '#0166be'
                                            } ]}>
                                                {I18n.t( Keys.save_to_album )}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[ {
                                    marginTop: 10,
                                    backgroundColor: 'white',
                                    borderRadius: 5,
                                } ]}>
                                    <TouchableOpacity onPress={() => {
                                        cancel()
                                    }}>
                                        <View style={[ {
                                            height: 48,
                                        }, commonStyles.justAlignCenter ]}>
                                            <Text
                                                style={[ {
                                                    textAlign: 'center',
                                                    color: '#0166be',
                                                    fontSize: 18
                                                } ]}>{I18n.t( Keys.cancel )}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    }
                    }
                />
                <View style={[ {
                    position: 'absolute', top: getStatusBarHeight( true ), right: 15
                }, commonStyles.justAlignCenter ]}>
                    <Button
                        title={I18n.t( Keys.close )}
                        type="outline"
                        onPress={() => {
                            this.props.onClose && this.props.onClose();
                        }
                        }
                    />
                </View>
            </Modal>
        );
    }


}

export default CustomImageView;
