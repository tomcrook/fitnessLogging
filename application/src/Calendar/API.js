"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("./User");
var FitnessDay_1 = require("./FitnessDay");
var Calendar_1 = require("./Calendar");
var LocalAPI = /** @class */ (function () {
    function LocalAPI() {
    }
    LocalAPI.prototype.loadUser = function (username) {
        var obj = require('./Save/' + username + '.json');
        var fc = obj.fitnessCalendar;
        var calendar = [];
        for (var i in fc.calendar) {
            var day = fc.calendar[i];
            calendar.push(new FitnessDay_1.default(day.calorieGoal, day.currentWeight, new Date(day.date), day.calorieCount));
        }
        var fitnessCalendar = new Calendar_1.default(fc.goalWeight, new Date(fc.goalEndDate), calendar);
        return new User_1.default(obj.username, fitnessCalendar);
    };
    LocalAPI.prototype.saveUser = function (user) {
        console.log(JSON.stringify(user));
    };
    return LocalAPI;
}());
exports.default = LocalAPI;
//# sourceMappingURL=API.js.map