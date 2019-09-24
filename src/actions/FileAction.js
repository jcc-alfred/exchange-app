import { netPhotoUpload } from "../net/FileApiNet";

export function photoUpload( path, callback ) {
    return ( dispatch ) => {
        netPhotoUpload( path, ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}