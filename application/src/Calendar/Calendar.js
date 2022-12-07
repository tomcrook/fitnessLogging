"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FitnessDay_1 = require("./FitnessDay");
var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
var caloriesPerPound = 3500;
/** Responsible for dynamically updating FitnessDays. **/
var FitnessCalendar = /** @class */ (function () {
    function FitnessCalendar(goalWeight, goalEndDate, fitnessCalendar, workoutData) {
        if (workoutData === void 0) { workoutData = {}; }
        this.calendar = fitnessCalendar;
        this.goalWeight = goalWeight;
        this.currentWeight = this.findCurrentWeight();
        this.goalEndDate = goalEndDate;
        this.workoutData = workoutData;
        this.populateNextWeek();
    }
    FitnessCalendar.prototype.sortCalendar = function () {
        this.calendar.sort(function (a, b) { return (a.getDate() > b.getDate()) ? 1 : -1; });
    };
    /** Returns most recent logged weight, undefined if never logged **/
    FitnessCalendar.prototype.findCurrentWeight = function () {
        this.sortCalendar();
        // Prioritize today's weight
        try {
            var day = this.getFitnessDayFromDate(new Date());
            if (day.getCurrentWeight() != undefined) {
                return day.getCurrentWeight();
            }
        }
        catch (_a) { }
        var weight = undefined;
        for (var i in this.calendar) {
            var day = this.calendar[i];
            // only want to return the weight if it is from the past
            if (day.getCurrentWeight() != undefined && day.getDate() < new Date()) {
                weight = day.getCurrentWeight();
            }
        }
        return weight;
    };
    FitnessCalendar.prototype.getDateStringInThisTimezone = function (date) {
        return date.toLocaleDateString('en-US', { timeZone: tz });
    };
    FitnessCalendar.prototype.setGoalWeight = function (weight) {
        this.goalWeight = weight;
    };
    FitnessCalendar.prototype.setGoalDate = function (date) {
        this.goalEndDate = date;
    };
    FitnessCalendar.prototype.getWorkoutData = function () {
        return this.workoutData;
    };
    FitnessCalendar.prototype.getFitnessDayFromDate = function (date) {
        for (var i in this.calendar) {
            var day = this.calendar[i];
            if (day.getDate().toLocaleDateString() == this.getDateStringInThisTimezone(date)) {
                return day;
            }
        }
        throw ReferenceError('Date doesn\'t exist');
    };
    FitnessCalendar.prototype.getCalendar = function () {
        return this.calendar;
    };
    FitnessCalendar.prototype.getDate = function (numberDays) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(today.getTime() + numberDays * (24 * 60 * 60 * 1000));
    };
    FitnessCalendar.prototype.getCurrentWeight = function () {
        return this.currentWeight;
    };
    FitnessCalendar.prototype.setCurrentWeight = function (weight) {
        this.currentWeight = weight;
    };
    FitnessCalendar.prototype.daysLeftForGoal = function () {
        var today = new Date();
        var diff = Math.abs(this.goalEndDate.getTime() - today.getTime());
        return Math.ceil(diff / (1000 * 3600 * 24));
    };
    /**
     * Gets the change in weight from the most recently logged weight
     * to the least recently logged weight (within numberOfDays).
     * **/
    FitnessCalendar.prototype.getWeightFluctuation = function (numberOfDays) {
        if (numberOfDays === void 0) { numberOfDays = 7; }
        var weights = [];
        for (var i = 0; i <= numberOfDays; i++) {
            try {
                var day = this.getFitnessDayFromDate(this.getDate(-1 * i));
                weights.push(day.getCurrentWeight());
            }
            catch (_a) { }
        }
        return weights[0] - weights[weights.length - 1];
    };
    FitnessCalendar.prototype.logWeight = function (weight, date) {
        if (date === void 0) { date = new Date(); }
        for (var i in this.calendar) {
            var day = this.calendar[i];
            if (day.getDate().toLocaleDateString() == this.getDateStringInThisTimezone(date)) {
                day.setCurrentWeight(weight);
            }
            ;
        }
        this.setCurrentWeight(this.findCurrentWeight());
        this.repopulateNextWeek();
    };
    FitnessCalendar.prototype.addCalories = function (calories, date) {
        if (date === void 0) { date = new Date(); }
        var day = this.getFitnessDayFromDate(date);
        day.addCalories(calories);
    };
    FitnessCalendar.prototype.calculateBMR = function (weight) {
        return weight * 15;
    };
    FitnessCalendar.prototype.getCalorieNeeds = function () {
        if (this.currentWeight == undefined) {
            return Math.ceil(this.calculateBMR(this.goalWeight));
        }
        var poundsNeeded = this.goalWeight - this.currentWeight;
        var calorie_delta = (poundsNeeded * caloriesPerPound) / this.daysLeftForGoal();
        return Math.ceil(this.calculateBMR(this.currentWeight) + calorie_delta);
    };
    FitnessCalendar.prototype.getNextWeek = function () {
        var dates = [];
        for (var i = 0; i < 8; i++) {
            dates.push(this.getDate(i));
        }
        return dates;
    };
    FitnessCalendar.prototype.hasBeenPopulated = function (date) {
        for (var i in this.calendar) {
            var day = this.calendar[i];
            if (day.getDate().toLocaleDateString() == this.getDateStringInThisTimezone(date)) {
                return true;
            }
        }
        return false;
    };
    FitnessCalendar.prototype.populateNextWeek = function () {
        var self = this;
        this.getNextWeek().forEach(function (date) {
            if (!self.hasBeenPopulated(date)) {
                self.calendar.push(new FitnessDay_1.default(self.getCalorieNeeds(), undefined, date));
            }
        });
        this.sortCalendar();
    };
    FitnessCalendar.prototype.repopulateNextWeek = function () {
        var self = this;
        this.getNextWeek().forEach(function (date) {
            var day = self.getFitnessDayFromDate(date);
            day.setCalorieGoal(self.getCalorieNeeds());
        });
        this.sortCalendar();
    };
    return FitnessCalendar;
}());
exports.default = FitnessCalendar;
//# sourceMappingURL=Calendar.js.map