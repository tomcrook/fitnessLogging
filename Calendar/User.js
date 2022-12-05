"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Calendar_1 = require("./Calendar");
var FitnessDay_1 = require("./FitnessDay");
var fs_1 = require("fs");
var User = /** @class */ (function () {
    function User(username, fitnessCalendar) {
        this.username = username;
        this.fitnessCalendar = fitnessCalendar;
    }
    User.prototype.getFitnessCalendar = function () {
        return this.fitnessCalendar;
    };
    return User;
}());
function loadUser(username) {
    var file = fs_1.readFileSync('./Save/' + username + '.json', 'utf-8');
    var obj = JSON.parse(file);
    var fc = obj.fitnessCalendar;
    var calendar = [];
    for (var i in fc.calendar) {
        var day = fc.calendar[i];
        calendar.push(new FitnessDay_1.default(day.calorieGoal, day.currentWeight, new Date(day.date), day.calorieCount));
    }
    var fitnessCalendar = new Calendar_1.default(fc.goalWeight, new Date(fc.goalEndDate), calendar);
    return new User(obj.username, fitnessCalendar);
}
function saveUser(user) {
    fs_1.writeFile('./Save/' + user.username + '.json', JSON.stringify(user), function (err) {
        if (err) {
            console.log(err);
        }
    });
}
var user = loadUser('tom');
user.getFitnessCalendar().logWeight(180);
saveUser(user);
//# sourceMappingURL=User.js.map