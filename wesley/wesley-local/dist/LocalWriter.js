'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _IFrameWriter2 = require('./IFrameWriter');

var _IFrameWriter3 = _interopRequireDefault(_IFrameWriter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalWriter = function (_IFrameWriter) {
    _inherits(LocalWriter, _IFrameWriter);

    function LocalWriter(config) {
        _classCallCheck(this, LocalWriter);

        var _this = _possibleConstructorReturn(this, (LocalWriter.__proto__ || Object.getPrototypeOf(LocalWriter)).call(this));

        _this.outDir = config.logDirectory;
        return _this;
    }

    return LocalWriter;
}(_IFrameWriter3.default);

exports.default = LocalWriter;