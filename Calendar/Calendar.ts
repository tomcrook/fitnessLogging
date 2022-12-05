import FitnessDay from "./FitnessDay";


const caloriesPerPound = 3500;
/** Responsible for dynamically updating FitnessDays. **/
class FitnessCalendar {
    private calendar : FitnessDay[];
    private goalWeight : number;
    private goalEndDate : Date;

    // If undefined, the user has never logged their weight before
    private currentWeight : number;

    constructor(goalWeight : number, goalEndDate : Date,  fitnessCalendar : FitnessDay[]) {
        this.calendar = fitnessCalendar;
        this.goalWeight = goalWeight;
        this.currentWeight = this.findCurrentWeight();
        this.goalEndDate = goalEndDate;
        this.populateNextWeek();
    }

    private sortCalendar() {
        this.calendar.sort((a, b) => (a.getDate() > b.getDate()) ? 1 : -1)
    }

    /** Returns most recent logged weight, undefined if never logged **/
    private findCurrentWeight() : number {
        this.sortCalendar();

        // Prioritize today's weight
        try {
            let day = this.getFitnessDayFromDate(new Date())
            if (day.getCurrentWeight() != undefined) {
                return day.getCurrentWeight()
            }
        } catch { }

        let weight = undefined;
        for (let i in this.calendar) {
            let day = this.calendar[i];
            // only want to return the weight if it is from the past
            if (day.getCurrentWeight() != undefined && day.getDate() < new Date()) {
                weight = day.getCurrentWeight();
            }
        }
        return weight
    }

    getFitnessDayFromDate(date : Date) {
        for (let i in this.calendar) {
            let day = this.calendar[i];
            if (day.getDate().toDateString() == date.toDateString()) {
                return day;
            }
        }
        throw ReferenceError('Date doesn\'t exist')
    }

    getCalendar() {
        return this.calendar;
    }
    
    setCurrentWeight(weight : number) {
        this.currentWeight = weight;
    }

    getCurrentWeight() {
        return this.currentWeight;
    }

    calculateBMR(weight: number) {
        return weight * 15;
    }

    daysLeftForGoal() {
        let today = new Date();
        let diff = Math.abs(this.goalEndDate.getTime() - today.getTime());
        return Math.ceil(diff / (1000 * 3600 * 24));
    }

    private getCalorieNeeds() {
        if (this.currentWeight == undefined) {
            return Math.ceil(this.calculateBMR(this.goalWeight))
        }
        let poundsNeeded = this.goalWeight - this.currentWeight;
        let calorie_delta = (poundsNeeded * caloriesPerPound) / this.daysLeftForGoal()
        return Math.ceil(this.calculateBMR(this.currentWeight) + calorie_delta);
    }

    getDate(numberDays : number) {
        return new Date(new Date().getTime() + numberDays * (24 * 60 * 60 * 1000));
    }

    private getNextWeek() {
        let dates = []
        for (let i = 0; i < 8; i++) {
            dates.push(this.getDate(i))
        }
        return dates;
    }

    private hasBeenPopulated(date : Date) {
        for (let i in this.calendar) {
            let day = this.calendar[i];
            if (day.getDate().toDateString() == date.toDateString()) {
                return true;
            }
        }
        return false;
    }

    private populateNextWeek() {
        let self = this;
        this.getNextWeek().forEach(function(date) {
            if (!self.hasBeenPopulated(date)) {
                self.calendar.push(new FitnessDay(self.getCalorieNeeds(), undefined, date))
            }
        });
        this.sortCalendar();
    }

    private repopulateNextWeek() {
        let self = this;
        this.getNextWeek().forEach(function(date) {
            let day = self.getFitnessDayFromDate(date);
            day.setCalorieGoal(self.getCalorieNeeds());
        });
        this.sortCalendar();
    }

    logWeight(weight : number, date : Date = new Date()) {
        for (let i in this.calendar) {
            let day = this.calendar[i];
            if (day.getDate().toDateString() == date.toDateString()) {
                day.setCurrentWeight(weight);
            };
        }
        this.setCurrentWeight(this.findCurrentWeight());
        this.repopulateNextWeek();
    }

    addCalories(calories: number, date : Date = new Date()) {
        let day = this.getFitnessDayFromDate(date);
        day.addCalories(calories);
    }

    /**
     * Gets the change in weight from the most recently logged weight
     * to the least recently logged weight (within numberOfDays).
     * **/
    getWeightFluctuation(numberOfDays : number = 7) {
        let weights = [];
        for (let i = 0; i <= numberOfDays; i++) {
            try {
                let day = this.getFitnessDayFromDate(this.getDate(-1 * i))
                weights.push(day.getCurrentWeight());
            } catch { }
        }
        return weights[0] - weights[weights.length - 1];
    }
}


export default FitnessCalendar;