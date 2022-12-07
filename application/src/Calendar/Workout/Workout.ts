
class Exercise {
    private _exerciseID : number;
    private _name : string;
    private _reps : number;
    private _sets : number;

    constructor(exerciseID: number, name: string, reps: number, sets: number) {
        this._exerciseID = exerciseID;
        this._name = name;
        this._reps = reps;
        this._sets = sets;
    }

    get exerciseID(): number {
        return this._exerciseID;
    }

    set exerciseID(value: number) {
        this._exerciseID = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get reps(): number {
        return this._reps;
    }

    set reps(value: number) {
        this._reps = value;
    }

    get sets(): number {
        return this._sets;
    }

    set sets(value: number) {
        this._sets = value;
    }

}

class Workout {
    private _name : string;
    private _exercises : Exercise[];
    // represents the last date and time that this workout was performed.
    private _lastPerformed : Date;
    constructor(name : string, exercises: Exercise[], lastPerformed : Date = undefined) {
        this._name = name;
        this._exercises = exercises;
        this._lastPerformed = lastPerformed;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get exercises(): Exercise[] {
        return this._exercises;
    }

    set exercises(value: Exercise[]) {
        this._exercises = value;
    }

    get lastPerformed(): Date {
        return this._lastPerformed;
    }

    set lastPerformed(value: Date) {
        this._lastPerformed = value;
    }

}

class WorkoutRoutine {
    private _workouts : Workout[];
    // represents the days that this workout is performed on, from 0 (Sunday) to 6 (Saturday)
    // [0, 2, 5] => this routine takes place on Sunday, Tuesday, and Friday by default (unless moved by user).
    private _defaultDays : number[];

    constructor(workouts : Workout[], defaultDays : number[]) {
        this._workouts = workouts;
        this._defaultDays = defaultDays;
    }

    get defaultDays(): number[] {
        return this._defaultDays;
    }

    get workouts(): Workout[] {
        return this._workouts;
    }

    set workouts(value: Workout[]) {
        this._workouts = value;
    }

    set defaultDays(value: number[]) {
        this._defaultDays = value;
    }

}
