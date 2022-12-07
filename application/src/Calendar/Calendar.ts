import FitnessDay from "./FitnessDay";

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
const caloriesPerPound = 3500;
/** Responsible for dynamically updating FitnessDays. **/
class FitnessCalendar {
    private calendar : FitnessDay[];

    // represents the number of pounds a user desires to weigh
    private goalWeight : number;
    // represents the date the user wants to reach their goal weight
    private goalEndDate : Date;
    // workoutData represents a maps from exerciseID's to an integer 'max' and integer 'mostRecent'
    private workoutData : {};
    // If undefined, the user has never logged their weight before
    private currentWeight : number;

    constructor(goalWeight : number, goalEndDate : Date,  fitnessCalendar : FitnessDay[],  workoutData = {}) {
        this.calendar = fitnessCalendar;
        this.goalWeight = goalWeight;
        this.currentWeight = this.findCurrentWeight();
        this.goalEndDate = goalEndDate;
        this.workoutData = workoutData;
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

    private getDateStringInThisTimezone(date : Date) {
        return date.toLocaleDateString('en-US', {timeZone: tz})
    }

    setGoalWeight(weight : number) {
        this.goalWeight = weight;
    }

    setGoalDate(date : Date) {
        this.goalEndDate = date;
    }

    getWorkoutData() {
        return this.workoutData;
    }

    getFitnessDayFromDate(date : Date) {
        for (let i in this.calendar) {
            let day = this.calendar[i];
            if (day.getDate().toLocaleDateString() == this.getDateStringInThisTimezone(date)) {
                return day;
            }
        }
        throw ReferenceError('Date doesn\'t exist')
    }

    getCalendar() {
        return this.calendar;
    }

    getDate(numberDays : number) {
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        return new Date(today.getTime() + numberDays * (24 * 60 * 60 * 1000));
    }

    getCurrentWeight() {
        return this.currentWeight;
    }

    setCurrentWeight(weight : number) {
        this.currentWeight = weight;
    }

    daysLeftForGoal() {
        let today = new Date();
        let diff = Math.abs(this.goalEndDate.getTime() - today.getTime());
        return Math.ceil(diff / (1000 * 3600 * 24));
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

    logWeight(weight : number, date : Date = new Date()) {
        for (let i in this.calendar) {
            let day = this.calendar[i];
            if (day.getDate().toLocaleDateString() == this.getDateStringInThisTimezone(date)) {
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

    private calculateBMR(weight: number) {
        return weight * 15;
    }

    private getCalorieNeeds() {
        if (this.currentWeight == undefined) {
            return Math.ceil(this.calculateBMR(this.goalWeight))
        }
        let poundsNeeded = this.goalWeight - this.currentWeight;
        let calorie_delta = (poundsNeeded * caloriesPerPound) / this.daysLeftForGoal()
        return Math.ceil(this.calculateBMR(this.currentWeight) + calorie_delta);
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
            if (day.getDate().toLocaleDateString() == this.getDateStringInThisTimezone(date)) {
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
}


export default FitnessCalendar;