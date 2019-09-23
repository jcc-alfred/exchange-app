import { webDomain } from "../env";
import url from "url";
import UrlActionType from "./UrlActionType";

const UrlActionHandlerUtil = ( function () {
    let scheme = webDomain + '/';
    return {
        genQRPaymentUrl: function ( account, amount, remark ) {
            const urlObj = url.parse( scheme );

            const create_time = new Date().getTime() / 1000;

            urlObj.query = {
                action: UrlActionType.ACTION_QR_PAYMENT,
                receiver: account.userID,
                receiver_amount: amount,
                currency: account.memberCurrency,
                email: account.emaily,
                mobile: account.mobile,
                remark: remark,
                create_time: create_time,
            };

            const urlStr = url.format( urlObj );

            console.log( 'genQRPaymentUrl = ' + urlStr );

            return urlStr;
        },

        parse: function ( data ) {
            const urlObj = url.parse( data, true );

            if ( urlObj === null || urlObj === undefined ) {
                return null;
            }

            if ( urlObj.protocol + '//' + urlObj.hostname + urlObj.pathname !== scheme ) {
                return null;
            }

            return urlObj.query;
        }
    }

} )();

export default UrlActionHandlerUtil;
