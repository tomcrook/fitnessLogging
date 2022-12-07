"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FoodItem = /** @class */ (function () {
    function FoodItem(name, brand, calories, servingSize, nutritionInfo) {
        if (brand === void 0) { brand = undefined; }
    }
    FoodItem.prototype.getCalories = function () {
        return this.calories;
    };
    FoodItem.prototype.getCaloriesForServings = function (servings) {
        return Math.ceil(servings * this.calories);
    };
    FoodItem.prototype.getBrand = function () {
        return this.brand;
    };
    FoodItem.prototype.getName = function () {
        return this.name;
    };
    FoodItem.prototype.getServingSize = function () {
        return this.servingSize;
    };
    FoodItem.prototype.getNutritionInfo = function () {
        return this.nutritionInfo;
    };
    FoodItem.prototype.getServingSizeString = function () {
        return "" + this.servingSize.amount + this.servingSize.units;
    };
    FoodItem.prototype.getProteinPerServing = function () {
        var protein = this.nutritionInfo['protein'];
        return protein == undefined ? 0 : protein;
    };
    return FoodItem;
}());
exports.FoodItem = FoodItem;
//# sourceMappingURL=FoodItem.js.map