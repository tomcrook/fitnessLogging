var Exercise = /** @class */ (function () {
    function Exercise(exerciseID, name, reps, sets) {
        this._exerciseID = exerciseID;
        this._name = name;
        this._reps = reps;
        this._sets = sets;
    }
    Object.defineProperty(Exercise.prototype, "exerciseID", {
        get: function () {
            return this._exerciseID;
        },
        set: function (value) {
            this._exerciseID = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Exercise.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Exercise.prototype, "reps", {
        get: function () {
            return this._reps;
        },
        set: function (value) {
            this._reps = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Exercise.prototype, "sets", {
        get: function () {
            return this._sets;
        },
        set: function (value) {
            this._sets = value;
        },
        enumerable: true,
        configurable: true
    });
    return Exercise;
}());
var Workout = /** @class */ (function () {
    function Workout(name, exercises, lastPerformed) {
        if (lastPerformed === void 0) { lastPerformed = undefined; }
        this._name = name;
        this._exercises = exercises;
        this._lastPerformed = lastPerformed;
    }
    Object.defineProperty(Workout.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workout.prototype, "exercises", {
        get: function () {
            return this._exercises;
        },
        set: function (value) {
            this._exercises = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workout.prototype, "lastPerformed", {
        get: function () {
            return this._lastPerformed;
        },
        set: function (value) {
            this._lastPerformed = value;
        },
        enumerable: true,
        configurable: true
    });
    return Workout;
}());
var WorkoutRoutine = /** @class */ (function () {
    function WorkoutRoutine(workouts, defaultDays) {
        this._workouts = workouts;
        this._defaultDays = defaultDays;
    }
    Object.defineProperty(WorkoutRoutine.prototype, "defaultDays", {
        get: function () {
            return this._defaultDays;
        },
        set: function (value) {
            this._defaultDays = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkoutRoutine.prototype, "workouts", {
        get: function () {
            return this._workouts;
        },
        set: function (value) {
            this._workouts = value;
        },
        enumerable: true,
        configurable: true
    });
    return WorkoutRoutine;
}());
//# sourceMappingURL=Workout.js.map