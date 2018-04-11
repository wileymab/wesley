'use strict';

var _WesleyService = require('./WesleyService');

var _WesleyService2 = _interopRequireDefault(_WesleyService);

var _LocalWriter = require('./LocalWriter');

var _LocalWriter2 = _interopRequireDefault(_LocalWriter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    new _WesleyService2.default(new _LocalWriter2.default({
        logDirectory: './'
    }));
})();