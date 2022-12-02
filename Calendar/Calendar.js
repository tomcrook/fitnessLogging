"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Responsible for dynamically updating FitnessDays. **/
var FitnessCalendar = /** @class */ (function () {
    function FitnessCalendar(goalWeight, goalEndDate, fitnessCalendar) {
        if (fitnessCalendar === void 0) { fitnessCalendar = []; }
        this.caloriesPerPound = 3500;
        this.fitnessCalendar = fitnessCalendar;
        this.goalWeight = goalWeight;
        this.currentWeight = this.findCurrentWeight();
        this.goalEndDate = goalEndDate;
    }
    /** Returns most recent logged weight, undefined if never logged **/
    FitnessCalendar.prototype.findCurrentWeight = function () {
        this.fitnessCalendar.reverse().forEach(function (day) {
            if (day.getCurrentWeight() != undefined) {
                return day.getCurrentWeight();
            }
        });
        return undefined;
    };
    FitnessCalendar.prototype.getMostRecentDay = function () {
        return this.fitnessCalendar[this.fitnessCalendar.length - 1];
    };
    FitnessCalendar.prototype.getFutureDate = function (numberDays) {
        var date = new Date();
        date.setDate(new Date().getDate() + numberDays);
        return date;
    };
    FitnessCalendar.prototype.calculateBMR = function (weight) {
        return weight * 15;
    };
    FitnessCalendar.prototype.daysLeftForGoal = function () {
        var today = new Date();
        return this.goalEndDate.getDate() - today.getDate();
    };
    FitnessCalendar.prototype.getCalorieNeeds = function () {
        if (this.currentWeight == undefined) {
            return this.calculateBMR(this.goalWeight);
        }
        var poundsNeeded = this.goalWeight - this.currentWeight;
        var calorie_delta = (poundsNeeded * this.caloriesPerPound) / this.daysLeftForGoal();
        return this.calculateBMR(this.currentWeight) + calorie_delta;
    };
    FitnessCalendar.prototype.populateNextWeek = function () {
        // Don't need to populate the week if it has already been populated.
        if (this.fitnessCalendar.length > 0 && this.getMostRecentDay().getDate() >= this.getFutureDate(7)) {
            return;
        }
    };
    return FitnessCalendar;
}());
//# sourceMappingURL=Calendar.js.map