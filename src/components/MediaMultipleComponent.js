import React from "react";
import { InteractionManager, Platform, TouchableHighlight, View } from 'react-native';

import { FlatGrid } from 'react-native-super-grid';
import constStyles from "../styles/constStyles";
import commonStyles from "../styles/commonStyles";
import { Button, Image, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import { photoUpload } from "../actions/FileAction";
import Toast from "react-native-root-toast";
import * as ImagePicker from "expo-image-picker";
import ModalPicker from "./ModalPicker";

import { Video } from "expo-av";
import I18n from "../I18n";
import Keys from "../configs/Keys";
import CustomImageView from "./CustomImageView";

class MediaMultipleComponent extends React.Component {
    static propTypes = {
        editOptions: PropTypes.object,
        items: PropTypes.array,
        title: PropTypes.string,
        topDivider: PropTypes.bool,
        bottomDivider: PropTypes.bool,
        mediaType: PropTypes.string.isRequired,
        maxCounter: PropTypes.number,
        isSupportEdit: PropTypes.bool.isRequired,
        onItemsChange: PropTypes.func,
    };

    constructor( props ) {
        super( props );

        let fileSelectMenus = [];

        if ( this.props.mediaType === 'Photo' ) {
            fileSelectMenus = [
                { key: 0, label: I18n.t( Keys.choose_photo ) },
                { key: 1, label: I18n.t( Keys.take_photo ) },
            ];
        } else if ( this.props.mediaType === 'Video' ) {
            fileSelectMenus = [
                { key: 0, label: I18n.t( Keys.choose_video ) },
                { key: 1, label: I18n.t( Keys.take_video ) },
            ];
        }

        let itemOperationMenus = [];
        itemOperationMenus.push( { key: 0, label: I18n.t( Keys.view ) } );
        itemOperationMenus.push( { key: 1, label: I18n.t( Keys.delete ) } );
        itemOperationMenus.push( { key: 2, label: I18n.t( Keys.replace ) } );

        this.state = {
            items: this.props.items,
            displayItems: MediaMultipleComponent.calcDisplayItems( this.props.items, this.props.maxCounter, this.props.isSupportEdit ),
            columnCounter: 4,
            isRequesting: false,

            isOpenFileSelectMenu: false,
            fileSelectMenus: fileSelectMenus,
            isOpenItemOperationMenu: false,
            itemOperationMenus: itemOperationMenus,
            itemOperation: null,
            itemDisplay: null,
        }
    }

    static calcDisplayItems( items, maxCounter, isSupportEdit ) {
        const displayItems = [];

        if ( items != null ) {
            for ( let index = 0; index < items.length; index++ ) {
                displayItems.push( {
                    type: 1,
                    content: items[ index ]
                } );
            }
        }

        if ( isSupportEdit && ( items == null || items.length < maxCounter ) ) {
            displayItems.push( {
                type: 2,
                content: null
            } );
        }

        return displayItems;
    }

    shouldComponentUpdate( nextProps, nextState ) {
        if (
            nextProps.items !== this.props.items ||
            nextProps.maxCounter !== this.props.maxCounter ||
            nextProps.isSupportEdit !== this.props.isSupportEdit
        ) {
            this.setState( {
                items: nextProps.items,
                displayItems: MediaMultipleComponent.calcDisplayItems( nextProps.items, nextProps.maxCounter, nextProps.isSupportEdit ),
            } );
        }

        return true;
    }

    _pickFromAlbum = async () => {
        let mediaTypes;
        if ( this.props.mediaType === 'Photo' ) {
            mediaTypes = ImagePicker.MediaTypeOptions.Images;
        } else if ( this.props.mediaType === 'Video' ) {
            mediaTypes = ImagePicker.MediaTypeOptions.Videos;
        }

        let result = await ImagePicker.launchImageLibraryAsync( {
            ...this.props.editOptions,
            mediaTypes: mediaTypes,
            quality: 0.5
        } );

        console.log( result );

        if ( !result.cancelled ) {
            this.uploadFile( result.uri );
        }
    };

    _pickFromCamera = async () => {
        let mediaTypes;
        if ( this.props.mediaType === 'Photo' ) {
            mediaTypes = ImagePicker.MediaTypeOptions.Images;
        } else if ( this.props.mediaType === 'Video' ) {
            mediaTypes = ImagePicker.MediaTypeOptions.Videos;
        }

        let result = await ImagePicker.launchCameraAsync( {
            ...this.props.editOptions,
            mediaTypes: mediaTypes,
            allowsEditing: false,
        } );

        console.log( result );

        if ( !result.cancelled ) {
            this.uploadFile( result.uri );
        }
    };

    uploadFile( uri ) {
        this.setState( {
            isRequesting: true
        } );

        InteractionManager.runAfterInteractions( () => {
            this.props.onFileUpload(
                uri, this.props.mediaType, ( error, resBody ) => {
                    this.setState( {
                        isRequesting: false
                    } );

                    if ( error ) {
                        Toast.show( error.message );
                    } else {
                        const items = this.state.items.slice();
                        if ( this.state.itemOperation ) {
                            items[ items.indexOf( this.state.itemOperation ) ] = {
                                url: resBody.data,
                                mediaType: 'Photo'
                            };
                        } else {
                            items.push( {
                                url: resBody.data,
                                mediaType: 'Photo'
                            } );
                        }

                        this.props.onItemsChange && this.props.onItemsChange( items );
                    }
                } );
        } );
    }

    pickerFile() {
        if ( this.props.mediaType === 'Photo' ) {
            this.setState( {
                isOpenFileSelectMenu: true
            } )
        } else {
            this._pickFromAlbum()
        }
    }

    renderContent() {
        return (
            <FlatGrid
                style={[ {} ]}
                items={this.state.displayItems}
                itemDimension={( constStyles.window.width - 30 - ( this.state.columnCounter + 1 ) * 10 - this.state.columnCounter ) / this.state.columnCounter}
                spacing={10}
                scrollEnabled={false}
                renderItem={( { item } ) => (
                    item.type === 1 ?
                        <TouchableHighlight onPress={() => {
                            if ( !this.props.isSupportEdit ) {
                                if ( item.content.mediaType === 'Video' ) {
                                    if ( this.state.itemDisplay === null ) {
                                        this.setState( {
                                            itemDisplay: item.content
                                        } )
                                    }
                                } else if ( item.content.mediaType === 'Photo' ) {
                                    this.setState( {
                                        itemDisplay: item.content
                                    } )
                                }
                            } else {
                                this.setState( {
                                    itemOperation: item.content,
                                    isOpenItemOperationMenu: true
                                } )
                            }
                        }}>

                            <View style={[ commonStyles.wrapper, { height: 50 } ]}>
                                <Image
                                    source={{ uri: item.content.url }}
                                    style={{ height: 50 }}
                                />

                                {
                                    item.content.mediaType === 'Video' ?
                                        <View style={[ {
                                            position: 'absolute', left: 0, top: 0, right: 0, bottom: 0
                                        }, commonStyles.justAlignCenter ]}>
                                            <Ionicons
                                                name="md-play"
                                                size={Platform.OS === 'ios' ? 22 : 25}
                                                color={constStyles.THEME_COLOR}
                                            />
                                        </View>
                                        :
                                        null
                                }
                            </View>
                        </TouchableHighlight>
                        :
                        <View style={[ commonStyles.wrapper, { height: 50 } ]}>
                            <Button
                                buttonStyle={{ height: 50 }}
                                icon={
                                    <Ionicons
                                        name="md-add"
                                        size={Platform.OS === 'ios' ? 22 : 25}
                                        color={'white'}
                                    />
                                }
                                onPress={() => {
                                    this.setState( {
                                        itemOperation: null
                                    } );

                                    this.pickerFile();
                                }}
                            />

                        </View>

                )}
            />
        );
    }

    render() {
        return (
            <View>
                {
                    <ListItem
                        title={this.props.title}
                        subtitle={this.renderContent()}
                        topDivider={this.props.topDivider}
                        bottomDivider={this.props.bottomDivider}
                    />

                }

                <Spinner visible={this.state.isRequesting} cancelable={true}/>

                <ModalPicker
                    isOpen={this.state.isOpenFileSelectMenu}
                    data={this.state.fileSelectMenus}
                    onSelect={( option ) => {
                        if ( option.key === 0 ) {
                            this._pickFromAlbum()
                        } else if ( option.key === 1 ) {
                            this._pickFromCamera()
                        }
                    }}
                    onClose={() => {
                        this.setState( {
                            isOpenFileSelectMenu: false
                        } );
                    }}
                />

                <ModalPicker
                    isOpen={this.state.isOpenItemOperationMenu}
                    data={this.state.itemOperationMenus}
                    onSelect={( option ) => {
                        if ( option.key === 0 ) {
                            this.setState( {
                                itemDisplay: this.state.itemOperation,
                                itemOperation: null,
                                isOpenItemOperationMenu: false
                            } )
                        } else if ( option.key === 1 ) {
                            const items = this.state.items.slice();
                            items.splice( this.state.items.indexOf( this.state.itemOperation ), 1 );
                            this.props.onItemsChange && this.props.onItemsChange( items );

                            this.setState( {
                                itemOperation: null,
                                isOpenItemOperationMenu: false
                            } )
                        } else if ( option.key === 2 ) {
                            this.setState( {
                                isOpenItemOperationMenu: false
                            } );
                            InteractionManager.runAfterInteractions( () => {
                                this.pickerFile();
                            } );

                        }
                    }}
                    onClose={() => {
                        this.setState( {
                            isOpenItemOperationMenu: false
                        } );
                    }}
                />

                {
                    this.state.itemDisplay != null && this.state.itemDisplay.mediaType === 'Video' ?
                        <Video
                            source={{ uri: this.state.itemDisplay.url }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode={Video.RESIZE_MODE_CONTAIN}
                            shouldPlay
                            isLooping
                            useNativeControls
                            style={{
                                width: 0,
                                height: 0
                            }}
                            onLoadStart={() => {
                                InteractionManager.runAfterInteractions( () => {
                                    this.videoRef.presentFullscreenPlayer()
                                        .then( () => {

                                        } )
                                        .catch( err => {
                                            console.log( err )
                                        } );
                                } );
                            }
                            }
                            onError={( ( error ) => {
                                Toast.show( error.message );
                                this.setState( {
                                    itemDisplay: null
                                } )
                            } )}
                            ref={( _videoRef ) => {
                                if ( _videoRef != null ) {
                                    this.videoRef = _videoRef;
                                }

                            }}
                            onFullscreenUpdate={( result ) => {
                                if ( result.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS ) {
                                    this.setState( {
                                        itemDisplay: null
                                    } )
                                }
                            }}
                        />
                        :
                        null
                }

                {
                    this.state.itemDisplay != null && this.state.itemDisplay.mediaType === 'Photo' ?
                        <CustomImageView
                            items={this.state.items}
                            itemDisplay={this.state.itemDisplay}
                            onClose={() => {
                                this.setState( {
                                    itemDisplay: null,
                                } )
                            }
                            }
                        />
                        :
                        null
                }

            </View>

        );
    }
}


function select( store ) {
    return {}
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {
    onFileUpload: ( path, mediaType, callback ) => {
        if ( mediaType === 'Photo' ) {
            dispatch( photoUpload( path, ( err, res ) => {
                callback && callback( err, res )
            } ) );
        } else if ( mediaType === 'Video' ) {

        }
    },
} );
export default connect( select, mapDispatchToProps )( MediaMultipleComponent )

