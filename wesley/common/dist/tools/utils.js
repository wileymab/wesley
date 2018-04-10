"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var generateFileDateStamp = exports.generateFileDateStamp = function generateFileDateStamp() {
    var d = new Date();
    var addLeadingZero = function addLeadingZero(val) {
        if (val < 10) {
            return "0" + val;
        }
        return val;
    };
    return "" + d.getFullYear() + addLeadingZero(d.getMonth() + 1) + addLeadingZero(d.getDate());
};