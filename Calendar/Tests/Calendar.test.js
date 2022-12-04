"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FitnessDay_1 = require("../FitnessDay");
var Calendar_1 = require("../Calendar");
var TestRunner_1 = require("./TestRunner");
var Tests = /** @class */ (function () {
    function Tests() {
    }
    Tests.prototype.test = function () {
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), []);
        return [calendar.getCalendar().length == 8,
            'testEmptyPopulate',
            'Empty calendar doesn\'t have next week populated.',
            calendar.getCalendar().length,
            8
        ];
    };
    Tests.prototype.test2 = function () {
        var today = new FitnessDay_1.default(2000, 185, new Date());
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [today]);
        return [calendar.getCalendar().length == 8,
            'testPopulateWith1Day',
            'Calendar with one populated day doesn\'t have next week populated.',
            calendar.getCalendar().length,
            8
        ];
    };
    Tests.prototype.test3 = function () {
        var today = new FitnessDay_1.default(2000, 185, new Date());
        var tomorrow = new FitnessDay_1.default(2000, 185, new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [today, tomorrow]);
        return [calendar.getCalendar().length == 8,
            'testPopulateWithTodayAndTomorrow',
            'Calendar with 2 days populated doesn\'t have next week populated correctly.',
            calendar.getCalendar().length,
            8
        ];
    };
    Tests.prototype.test4 = function () {
        var today = new FitnessDay_1.default(2000, 185, new Date());
        var day_after_tomorrow = new FitnessDay_1.default(2000, 185, new Date(new Date().getTime() + 2 * (24 * 60 * 60 * 1000)));
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [today, day_after_tomorrow]);
        return [calendar.getCalendar().length == 8,
            'testPopulateWithTodayAndDayAfterTomorrow',
            'Calendar with 2 days populated doesn\'t have next week populated correctly.',
            calendar.getCalendar().length,
            8
        ];
    };
    Tests.prototype.test5 = function () {
        var today = new FitnessDay_1.default(2000, 185, new Date());
        var day_after_tomorrow = new FitnessDay_1.default(2000, 200, new Date(new Date().getTime() + 2 * (24 * 60 * 60 * 1000)));
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [today, day_after_tomorrow]);
        return [calendar.getCurrentWeight() == 185,
            'testCurrentWeight',
            'Calendar prioritizes future weight over current/past weight.',
            calendar.getCurrentWeight(),
            185
        ];
    };
    Tests.prototype.test6 = function () {
        var yesterday = new FitnessDay_1.default(2000, 200, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)));
        var day_after_tomorrow = new FitnessDay_1.default(2000, 100, new Date(new Date().getTime() + 2 * (24 * 60 * 60 * 1000)));
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [yesterday, day_after_tomorrow]);
        return [calendar.getCurrentWeight() == 200,
            'testCurrentWeight2',
            'Calendar prioritizes future weight over current/past weight.',
            calendar.getCurrentWeight(),
            200
        ];
    };
    Tests.prototype.test7 = function () {
        var yesterday = new FitnessDay_1.default(2000, 200, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)));
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [yesterday]);
        calendar.logWeight(185);
        calendar.logWeight(200, new Date(new Date().getTime() + (24 * 60 * 60 * 1000)));
        return [calendar.getCurrentWeight() == 185,
            'testLogWeight',
            'Logging weight doesn\'t update current weight',
            calendar.getCurrentWeight(),
            185
        ];
    };
    Tests.prototype.test8 = function () {
        var yesterday = new FitnessDay_1.default(2000, 170, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)));
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [yesterday]);
        calendar.logWeight(185);
        calendar.logWeight(200);
        return [calendar.getCurrentWeight() == 200,
            'testLoggedWeightTwice',
            'Logging weight doesn\'t update current weight',
            calendar.getCurrentWeight(),
            200
        ];
    };
    Tests.prototype.test9 = function () {
        var yesterday = new FitnessDay_1.default(2000, 190, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)));
        var today = new FitnessDay_1.default(2000, 200, new Date(new Date().getTime()));
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [yesterday, today]);
        return [calendar.getWeightFluctuation() == 10,
            'testWeightFluctuation',
            'Calendar doesn\'t calculate weight changes correctly.',
            calendar.getWeightFluctuation(),
            10
        ];
    };
    Tests.prototype.test10 = function () {
        var yesterday = new FitnessDay_1.default(2000, 210, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)));
        var today = new FitnessDay_1.default(2000, 200, new Date(new Date().getTime()));
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [yesterday, today]);
        return [calendar.getWeightFluctuation() == -10,
            'testWeightFluctuation2',
            'Calendar doesn\'t calculate weight changes correctly.',
            calendar.getWeightFluctuation(),
            -10
        ];
    };
    Tests.prototype.test11 = function () {
        var today = new FitnessDay_1.default(2000, 200, new Date(new Date().getTime()));
        var calendar = new Calendar_1.default(190, new Date('2022-12-30'), [today]);
        return [calendar.getWeightFluctuation() == 0,
            'testWeightFluctuationOneDay',
            'Calendar doesn\'t calculate weight changes correctly.',
            calendar.getWeightFluctuation(),
            0
        ];
    };
    return Tests;
}());
TestRunner_1.default(new Tests());
//# sourceMappingURL=Calendar.test.js.map