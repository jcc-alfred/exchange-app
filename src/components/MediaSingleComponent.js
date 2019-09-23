import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import MediaMultipleComponent from "./MediaMultipleComponent";

class MediaSingleComponent extends React.Component {
    static propTypes = {
        editOptions: PropTypes.object,
        item: PropTypes.object,
        title: PropTypes.string,
        topDivider: PropTypes.bool,
        bottomDivider: PropTypes.bool,
        mediaType: PropTypes.string.isRequired,
        isSupportEdit: PropTypes.bool.isRequired,
        onItemChange: PropTypes.func,
    };

    constructor( props ) {
        super( props );

        this.state = {}
    }

    render() {
        const items = [];
        if ( this.props.item ) {
            items.push( this.props.item );
        }


        return (
            <MediaMultipleComponent
                editOptions={this.props.editOptions}
                items={items}
                title={this.props.title}
                mediaType={this.props.mediaType}
                maxCounter={1}
                topDivider={this.props.topDivider}
                bottomDivider={this.props.bottomDivider}
                isSupportEdit={this.props.isSupportEdit}
                onItemsChange={( itemsResult ) => {
                    if ( itemsResult.length > 0 ) {
                        this.props.onItemChange && this.props.onItemChange( itemsResult[ 0 ] );
                    } else {
                        this.props.onItemChange && this.props.onItemChange( null );
                    }
                }}
            />
        );
    }
}


function select( store ) {
    return {}
}

const mapDispatchToProps = ( dispatch, ownProps ) => ( {} );
export default connect( select, mapDispatchToProps )( MediaSingleComponent )

