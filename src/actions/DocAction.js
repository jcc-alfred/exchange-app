import {netdocGetArticleList, netDocGetHomeNewsList} from "../net/DocApiNet";


export function docGetHomeNewsList( callback ) {
    return ( dispatch ) => {
        netDocGetHomeNewsList( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}
export function docGetArticleList( callback ) {
    return ( dispatch ) => {
        netdocGetArticleList( ( err, res ) => {
            callback && callback( err, res )
        } );
    };
}






