'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _IFrameWriter = require('./IFrameWriter');

var _IFrameWriter2 = _interopRequireDefault(_IFrameWriter);

var _wesleyCommon = require('wesley-common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WesleyService = function WesleyService(writer) {
    _classCallCheck(this, WesleyService);

    writer.write({ test: "hello, world!" });
};

exports.default = WesleyService;