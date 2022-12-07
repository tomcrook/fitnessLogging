import FitnessCalendar from "./Calendar";
import FitnessDay from "./FitnessDay";


class User {
    username : string;
    fitnessCalendar : FitnessCalendar;

    constructor(username : string, fitnessCalendar : FitnessCalendar) {
        this.username = username;
        this.fitnessCalendar = fitnessCalendar;
    }

    getUsername() {
        return this.username;
    }

    getFitnessCalendar() {
        return this.fitnessCalendar;
    }

}


export default User;