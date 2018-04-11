// @flow
import WesleyService from './WesleyService'
import LocalWriter from './LocalWriter'

(() => {
    new WesleyService(new LocalWriter({
        logDirectory: './'
    }))
})();
