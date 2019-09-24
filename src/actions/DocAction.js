import { netDocGetHomeNewsList } from "../net/DocApiNet";


export function docGetHomeNewsList( callback ) {
    return ( dispatch ) => {
        netDocGetHomeNewsList( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}



