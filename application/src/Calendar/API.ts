import User from './User'
import FitnessDay from "./FitnessDay";
import FitnessCalendar from "./Calendar";

export interface API {
    loadUser(username : string) : User;
    saveUser(user : User) : void;
}

export default class LocalAPI implements API {

    loadUser(username : string) : User {
        let obj = require('./Save/'+ username+'.json')
        let fc = obj.fitnessCalendar;
        let calendar = [];
        for (let i in fc.calendar) {
            let day = fc.calendar[i];
            calendar.push(new FitnessDay(day.calorieGoal, day.currentWeight, new Date(day.date), day.calorieCount));
        }
        let fitnessCalendar = new FitnessCalendar(fc.goalWeight, new Date(fc.goalEndDate), calendar);
        return new User(obj.username, fitnessCalendar);
    }


    saveUser(user : User) : void {
        console.log(JSON.stringify(user))
    }

}

