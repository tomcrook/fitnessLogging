import FitnessDay from "./FitnessDay";

/** Responsible for dynamically updating FitnessDays. **/
class FitnessCalendar {
    private fitnessCalendar : FitnessDay[];
    private goalWeight : number;
    private goalEndDate : Date;
    private caloriesPerPound : number = 3500;

    // If undefined, the user has never logged their weight before
    private currentWeight : number;

    constructor(goalWeight : number, goalEndDate : Date, currentWeight: number = undefined,  fitnessCalendar : FitnessDay[] = []) {
        this.fitnessCalendar = fitnessCalendar;
        this.goalWeight = goalWeight;
        this.currentWeight = currentWeight;
        if (currentWeight == undefined) {
            this.currentWeight = this.findCurrentWeight()
        }
        this.goalEndDate = goalEndDate;
        this.populateNextWeek();
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
        let diff = Math.abs(this.goalEndDate.getTime() - today.getTime());
        return Math.ceil(diff / (1000 * 3600 * 24));
    }

    getCalorieNeeds() {
        if (this.currentWeight == undefined) {
            return Math.ceil(this.calculateBMR(this.goalWeight))
        }
        let poundsNeeded = this.goalWeight - this.currentWeight;
        let calorie_delta = (poundsNeeded * this.caloriesPerPound) / this.daysLeftForGoal()
        return Math.ceil(this.calculateBMR(this.currentWeight) + calorie_delta);
    }

    getNextWeek() {
        let dates = []
        for (let i = 0; i < 8; i++) {
            dates.push(this.getFutureDate(i))
        }
        return dates;
    }

    hasBeenPopulated(date : Date) {
        this.fitnessCalendar.reverse().forEach(function (day) {
            if (day.getDate().toDateString() == date.toDateString()) {
                return true;
            }
        })
        return false;
    }

    populateNextWeek() {
        // Don't need to populate the week if it has already been populated.
        if (this.fitnessCalendar.length > 0 && this.getMostRecentDay().getDate() >= this.getFutureDate(7)) {
            return;
        }
        let self = this;
        this.getNextWeek().forEach(function(date) {
            if (!self.hasBeenPopulated(date)) {
                self.fitnessCalendar.push(new FitnessDay(self.getCalorieNeeds(), self.currentWeight, date))
            }
        })
    }
}


let calendar = new FitnessCalendar(190, new Date('2023-01-25'), 190);
console.log(calendar.getMostRecentDay())