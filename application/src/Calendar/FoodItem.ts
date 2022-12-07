

export class FoodItem {
    name : string;
    brand : string;
    calories : number;
    servingSize : { amount : number, units : string };
    nutritionInfo : {};

    constructor(name : string, brand : string = undefined, calories : number,
                servingSize : { amount : number, units : string }, nutritionInfo : object) {

    }

    getCalories() {
        return this.calories;
    }

    getCaloriesForServings(servings : number) {
        return Math.ceil(servings * this.calories);
    }

    getBrand() {
        return this.brand;
    }

    getName() {
        return this.name;
    }

    getServingSize() {
        return this.servingSize;
    }

    getNutritionInfo() {
        return this.nutritionInfo;
    }

    getServingSizeString() : string {
        return `${this.servingSize.amount}${this.servingSize.units}`
    }
    
    getProteinPerServing() : number {
        let protein = this.nutritionInfo['protein'];
        return protein == undefined ? 0 : protein;
    }
}
