"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(username, fitnessCalendar) {
        this.username = username;
        this.fitnessCalendar = fitnessCalendar;
    }
    User.prototype.getUsername = function () {
        return this.username;
    };
    User.prototype.getFitnessCalendar = function () {
        return this.fitnessCalendar;
    };
    return User;
}());
exports.default = User;
//# sourceMappingURL=User.js.map