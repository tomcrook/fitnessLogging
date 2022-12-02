import FitnessDay from "./FitnessDay";

/** Responsible for dynamically updating FitnessDays. **/
class FitnessCalendar {
    private fitnessCalendar : FitnessDay[];
    private goalWeight : number;
    private goalEndDate : Date;
    private caloriesPerPound : number = 3500;

    // If undefined, the user has never logged their weight before
    private currentWeight : number;

    constructor(goalWeight : number, goalEndDate : Date,  fitnessCalendar : FitnessDay[] = []) {
        this.fitnessCalendar = fitnessCalendar;
        this.goalWeight = goalWeight;
        this.currentWeight = this.findCurrentWeight()
        this.goalEndDate = goalEndDate;
    }

    /** Returns most recent logged weight, undefined if never logged **/
    findCurrentWeight() : number {
        this.fitnessCalendar.reverse().forEach(function(day) {
            if (day.getCurrentWeight() != undefined) {
                return day.getCurrentWeight();
            }
        })
        return undefined;
    }

    getMostRecentDay() {
        return this.fitnessCalendar[this.fitnessCalendar.length - 1]
    }

    getFutureDate(numberDays : number) {
        let date = new Date()
        date.setDate(new Date().getDate() + numberDays)
        return date
    }

    calculateBMR(weight: number) {
        return weight * 15;
    }

    daysLeftForGoal() {
        let today = new Date();
        return this.goalEndDate.getDate() - today.getDate();
    }

    getCalorieNeeds() {
        if (this.currentWeight == undefined) {
            return this.calculateBMR(this.goalWeight)
        }
        let poundsNeeded = this.goalWeight - this.currentWeight;
        let calorie_delta = (poundsNeeded * this.caloriesPerPound) / this.daysLeftForGoal()
        return this.calculateBMR(this.currentWeight) + calorie_delta;
    }

    populateNextWeek() {
        // Don't need to populate the week if it has already been populated.
        if (this.fitnessCalendar.length > 0 && this.getMostRecentDay().getDate() >= this.getFutureDate(7)) {
            return;
        }

    }
}
