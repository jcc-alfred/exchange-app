const EventEmitter = require( 'events' );

const _eventEmitter = new EventEmitter();

_eventEmitter.setMaxListeners( 100 );

export function getEventEmitter() {
    return _eventEmitter;
}

