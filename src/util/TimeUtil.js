import moment from "moment/moment";

export default class TimeUtil {
    static formatWithTimeZone( time ) {
        return moment( time ).format( 'YYYY-M-D HH:mm:ss' ) + ' ' + TimeUtil.timeZoneStr()
    }

    static formatWithTime( time ) {
        return moment( time ).format( 'YYYY-M-D HH:mm:ss' )
    }

    static formatWithTime1( time ) {
        return moment( time ).format( 'YYYY-M-D HH:mm' )
    }

    static formatWithTimeDate( time ) {
        return moment( time ).format( 'YYYY-MM-DD' )
    }


    static timeZoneStr() {
        let offSetHour = ( new Date() ).getTimezoneOffset() / 60;
        offSetHour = offSetHour > 0 ? Math.floor( offSetHour ) : Math.ceil( offSetHour );
        let offSetMinute = ( new Date() ).getTimezoneOffset() % 60;
        let result;
        if ( offSetHour > 0 ) {
            if ( offSetHour < 10 ) {
                result = 'UTC-0' + offSetHour;
            } else {
                result = 'UTC-' + offSetHour;
            }
        } else {
            if ( -offSetHour < 10 ) {
                result = 'UTC+0' + -offSetHour;
            } else {
                result = 'UTC+' + -offSetHour;
            }
        }

        if ( offSetMinute > 0 ) {
            if ( offSetMinute < 10 ) {
                result += ( '0' + offSetMinute );
            } else {
                result += ( offSetMinute );
            }
        } else {
            if ( -offSetMinute < 10 ) {
                result += ( '0' + -offSetMinute );
            } else {
                result += ( -offSetMinute );
            }
        }

        return result
    }
}
