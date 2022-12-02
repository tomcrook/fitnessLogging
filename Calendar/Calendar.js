"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FitnessDay_1 = require("./FitnessDay");
/** Responsible for dynamically updating FitnessDays. **/
var FitnessCalendar = /** @class */ (function () {
    function FitnessCalendar(goalWeight, goalEndDate, currentWeight, fitnessCalendar) {
        if (currentWeight === void 0) { currentWeight = undefined; }
        if (fitnessCalendar === void 0) { fitnessCalendar = []; }
        this.caloriesPerPound = 3500;
        this.fitnessCalendar = fitnessCalendar;
        this.goalWeight = goalWeight;
        this.currentWeight = currentWeight;
        if (currentWeight == undefined) {
            this.currentWeight = this.findCurrentWeight();
        }
        this.goalEndDate = goalEndDate;
        this.populateNextWeek();
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
        var diff = Math.abs(this.goalEndDate.getTime() - today.getTime());
        return Math.ceil(diff / (1000 * 3600 * 24));
    };
    FitnessCalendar.prototype.getCalorieNeeds = function () {
        if (this.currentWeight == undefined) {
            return Math.ceil(this.calculateBMR(this.goalWeight));
        }
        var poundsNeeded = this.goalWeight - this.currentWeight;
        var calorie_delta = (poundsNeeded * this.caloriesPerPound) / this.daysLeftForGoal();
        return Math.ceil(this.calculateBMR(this.currentWeight) + calorie_delta);
    };
    FitnessCalendar.prototype.getNextWeek = function () {
        var dates = [];
        for (var i = 0; i < 8; i++) {
            dates.push(this.getFutureDate(i));
        }
        return dates;
    };
    FitnessCalendar.prototype.hasBeenPopulated = function (date) {
        this.fitnessCalendar.reverse().forEach(function (day) {
            if (day.getDate().toDateString() == date.toDateString()) {
                return true;
            }
        });
        return false;
    };
    FitnessCalendar.prototype.populateNextWeek = function () {
        // Don't need to populate the week if it has already been populated.
        if (this.fitnessCalendar.length > 0 && this.getMostRecentDay().getDate() >= this.getFutureDate(7)) {
            return;
        }
        var self = this;
        this.getNextWeek().forEach(function (date) {
            if (!self.hasBeenPopulated(date)) {
                self.fitnessCalendar.push(new FitnessDay_1.default(self.getCalorieNeeds(), self.currentWeight, date));
            }
        });
    };
    return FitnessCalendar;
}());
var calendar = new FitnessCalendar(190, new Date('2023-01-25'), 190);
console.log(calendar.getMostRecentDay());
//# sourceMappingURL=Calendar.js.map