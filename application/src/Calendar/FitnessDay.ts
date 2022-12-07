

class FitnessDay {
    private calorieGoal : number;
    private calorieCount : number;
    private date : Date;
    private currentWeight : number;

    constructor(calorieGoal: number, currentWeight: number, date: Date, calorieCount: number = 0) {
        this.calorieGoal = calorieGoal;
        this.calorieCount = calorieCount;
        this.currentWeight = currentWeight;
        this.date = date;
    }

    getCurrentWeight() {
        return this.currentWeight;
    }

    setCurrentWeight(weight: number) {
        this.currentWeight = weight;
    }

    setCalorieGoal(calories : number) {
        this.calorieGoal = calories;
    }

    getDate() {
        return this.date;
    }

    getCalorieGoal() {
        return this.calorieGoal;
    }

    increaseCalorieGoal(by: number) {
        this.calorieGoal += by
    }

    getCalorieCount() {
        return this.calorieCount;
    }

    addCalories(calories: number) {
        this.calorieCount += calories;
    }

    getCaloriesRemaining() {
        return Math.max(0, this.calorieGoal - this.calorieCount);
    }

    ateSurplus() {
        return this.calorieGoal < this.calorieCount
    }
}

export default FitnessDay;