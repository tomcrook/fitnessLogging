import FitnessCalendar from "./Calendar";
import FitnessDay from "./FitnessDay";
import { readFileSync, writeFile } from 'fs';

class User {
    username : string;
    fitnessCalendar : FitnessCalendar;
    constructor(username : string, fitnessCalendar : FitnessCalendar) {
        this.username = username;
        this.fitnessCalendar = fitnessCalendar;
    }

    getFitnessCalendar() {
        return this.fitnessCalendar;
    }
}


function loadUser(username : string) {
    const file = readFileSync('./Save/'+ username+'.json', 'utf-8');
    let obj = JSON.parse(file);
    let fc = obj.fitnessCalendar;
    let calendar = [];
    for (let i in fc.calendar) {
        let day = fc.calendar[i];
        calendar.push(new FitnessDay(day.calorieGoal, day.currentWeight, new Date(day.date), day.calorieCount));
    }
    let fitnessCalendar = new FitnessCalendar(fc.goalWeight, new Date(fc.goalEndDate), calendar);
    return new User(obj.username, fitnessCalendar);
}

function saveUser(user : User) {
    writeFile('./Save/' + user.username + '.json', JSON.stringify(user), function(err) {
        if (err) {
            console.log(err);
        }
    });
}


let user = loadUser('tom')

user.getFitnessCalendar().logWeight(180);
saveUser(user);