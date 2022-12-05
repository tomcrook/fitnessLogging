"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FitnessDay = /** @class */ (function () {
    function FitnessDay(calorieGoal, currentWeight, date, calorieCount) {
        if (calorieCount === void 0) { calorieCount = 0; }
        this.calorieGoal = calorieGoal;
        this.calorieCount = calorieCount;
        this.currentWeight = currentWeight;
        this.date = date;
    }
    FitnessDay.prototype.getCurrentWeight = function () {
        return this.currentWeight;
    };
    FitnessDay.prototype.setCurrentWeight = function (weight) {
        this.currentWeight = weight;
    };
    FitnessDay.prototype.setCalorieGoal = function (calories) {
        this.calorieGoal = calories;
    };
    FitnessDay.prototype.getDate = function () {
        return this.date;
    };
    FitnessDay.prototype.getCalorieGoal = function () {
        return this.calorieGoal;
    };
    FitnessDay.prototype.increaseCalorieGoal = function (by) {
        this.calorieGoal += by;
    };
    FitnessDay.prototype.getCalorieCount = function () {
        return this.calorieCount;
    };
    FitnessDay.prototype.addCalories = function (calories) {
        this.calorieCount += calories;
    };
    FitnessDay.prototype.getCaloriesRemaining = function () {
        return Math.max(0, this.calorieGoal - this.calorieCount);
    };
    FitnessDay.prototype.ateSurplus = function () {
        return this.calorieGoal < this.calorieCount;
    };
    return FitnessDay;
}());
exports.default = FitnessDay;
//# sourceMappingURL=FitnessDay.js.map