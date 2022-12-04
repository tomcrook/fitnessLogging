"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FitnessDay_1 = require("./FitnessDay");
/** Responsible for dynamically updating FitnessDays. **/
var FitnessCalendar = /** @class */ (function () {
    function FitnessCalendar(goalWeight, goalEndDate, fitnessCalendar) {
        this.caloriesPerPound = 3500;
        this.fitnessCalendar = fitnessCalendar;
        this.goalWeight = goalWeight;
        this.currentWeight = this.findCurrentWeight();
        this.goalEndDate = goalEndDate;
        this.populateNextWeek();
    }
    FitnessCalendar.prototype.sortCalendar = function () {
        this.fitnessCalendar.sort(function (a, b) { return (a.getDate() > b.getDate()) ? 1 : -1; });
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
        for (var i in this.fitnessCalendar) {
            var day = this.fitnessCalendar[i];
            // only want to return the weight if it is from the past
            if (day.getCurrentWeight() != undefined && day.getDate() < new Date()) {
                weight = day.getCurrentWeight();
            }
        }
        return weight;
    };
    FitnessCalendar.prototype.getFitnessDayFromDate = function (date) {
        for (var i in this.fitnessCalendar) {
            var day = this.fitnessCalendar[i];
            if (day.getDate().toDateString() == date.toDateString()) {
                return day;
            }
        }
        throw ReferenceError('Date doesn\'t exist');
    };
    FitnessCalendar.prototype.getCalendar = function () {
        return this.fitnessCalendar;
    };
    FitnessCalendar.prototype.setCurrentWeight = function (weight) {
        this.currentWeight = weight;
    };
    FitnessCalendar.prototype.getCurrentWeight = function () {
        return this.currentWeight;
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
    FitnessCalendar.prototype.getDate = function (numberDays) {
        return new Date(new Date().getTime() + numberDays * (24 * 60 * 60 * 1000));
    };
    FitnessCalendar.prototype.getNextWeek = function () {
        var dates = [];
        for (var i = 0; i < 8; i++) {
            dates.push(this.getDate(i));
        }
        return dates;
    };
    FitnessCalendar.prototype.hasBeenPopulated = function (date) {
        for (var i in this.fitnessCalendar) {
            var day = this.fitnessCalendar[i];
            if (day.getDate().toDateString() == date.toDateString()) {
                return true;
            }
        }
        return false;
    };
    FitnessCalendar.prototype.populateNextWeek = function () {
        var self = this;
        this.getNextWeek().forEach(function (date) {
            if (!self.hasBeenPopulated(date)) {
                self.fitnessCalendar.push(new FitnessDay_1.default(self.getCalorieNeeds(), undefined, date));
            }
        });
        this.sortCalendar();
    };
    FitnessCalendar.prototype.logWeight = function (weight, date) {
        if (date === void 0) { date = new Date(); }
        for (var i in this.fitnessCalendar) {
            var day = this.fitnessCalendar[i];
            if (day.getDate().toDateString() == date.toDateString()) {
                day.setCurrentWeight(weight);
            }
            ;
        }
        this.setCurrentWeight(this.findCurrentWeight());
    };
    FitnessCalendar.prototype.addCalories = function (calories, date) {
        if (date === void 0) { date = new Date(); }
        var day = this.getFitnessDayFromDate(date);
        day.addCalories(calories);
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
    return FitnessCalendar;
}());
exports.default = FitnessCalendar;
//# sourceMappingURL=Calendar.js.map