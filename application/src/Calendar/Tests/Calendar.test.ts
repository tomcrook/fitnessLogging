import FitnessDay from "../FitnessDay";
import FitnessCalendar from "../Calendar";
import runTests from "./TestRunner";

class Tests {
    test() {
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), []);
        return [calendar.getCalendar().length == 8,
            'testEmptyPopulate',
            'Empty calendar doesn\'t have next week populated.',
            calendar.getCalendar().length,
            8
        ]
    }

    test2() {
        let today = new FitnessDay(2000, 185, new Date())
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [today]);
        return [calendar.getCalendar().length == 8,
            'testPopulateWith1Day',
            'Calendar with one populated day doesn\'t have next week populated.',
            calendar.getCalendar().length,
            8
        ]
    }

    test3() {
        let today = new FitnessDay(2000, 185, new Date())
        let tomorrow = new FitnessDay(2000, 185, new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [today, tomorrow]);
        return [calendar.getCalendar().length == 8,
            'testPopulateWithTodayAndTomorrow',
            'Calendar with 2 days populated doesn\'t have next week populated correctly.',
            calendar.getCalendar().length,
            8
        ]
    }

    test4() {
        let today = new FitnessDay(2000, 185, new Date())
        let day_after_tomorrow = new FitnessDay(2000, 185, new Date(new Date().getTime() + 2 * (24 * 60 * 60 * 1000)))
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [today, day_after_tomorrow]);
        return [calendar.getCalendar().length == 8,
            'testPopulateWithTodayAndDayAfterTomorrow',
            'Calendar with 2 days populated doesn\'t have next week populated correctly.',
            calendar.getCalendar().length,
            8
        ]
    }

    test5() {
        let today = new FitnessDay(2000, 185, new Date())
        let day_after_tomorrow = new FitnessDay(2000, 200, new Date(new Date().getTime() + 2 * (24 * 60 * 60 * 1000)))
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [today, day_after_tomorrow]);
        return [calendar.getCurrentWeight() == 185,
            'testCurrentWeight',
            'Calendar prioritizes future weight over current/past weight.',
            calendar.getCurrentWeight(),
            185
        ]
    }

    test6() {
        let yesterday = new FitnessDay(2000, 200, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)))
        let day_after_tomorrow = new FitnessDay(2000, 100, new Date(new Date().getTime() + 2 * (24 * 60 * 60 * 1000)))
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [yesterday, day_after_tomorrow]);
        return [calendar.getCurrentWeight() == 200,
            'testCurrentWeight2',
            'Calendar prioritizes future weight over current/past weight.',
            calendar.getCurrentWeight(),
            200
        ]
    }

    test7() {
        let yesterday = new FitnessDay(2000, 200, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)))
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [yesterday]);
        calendar.logWeight(185)
        calendar.logWeight(200, new Date(new Date().getTime() + (24 * 60 * 60 * 1000)))
        return [calendar.getCurrentWeight() == 185,
            'testLogWeight',
            'Logging weight doesn\'t update current weight',
            calendar.getCurrentWeight(),
            185
        ]
    }

    test8() {
        let yesterday = new FitnessDay(2000, 170, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)))
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [yesterday]);
        calendar.logWeight(185)
        calendar.logWeight(200)
        return [calendar.getCurrentWeight() == 200,
            'testLoggedWeightTwice',
            'Logging weight doesn\'t update current weight',
            calendar.getCurrentWeight(),
            200
        ]
    }

    test9() {
        let yesterday = new FitnessDay(2000, 190, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)))
        let today = new FitnessDay(2000, 200, new Date(new Date().getTime()))
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [yesterday, today]);
        return [calendar.getWeightFluctuation() == 10,
            'testWeightFluctuation',
            'Calendar doesn\'t calculate weight changes correctly.',
            calendar.getWeightFluctuation(),
            10
        ]
    }

    test10() {
        let yesterday = new FitnessDay(2000, 210, new Date(new Date().getTime() - (24 * 60 * 60 * 1000)))
        let today = new FitnessDay(2000, 200, new Date(new Date().getTime()))
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [yesterday, today]);
        return [calendar.getWeightFluctuation() == -10,
            'testWeightFluctuation2',
            'Calendar doesn\'t calculate weight changes correctly.',
            calendar.getWeightFluctuation(),
            -10
        ]
    }

    test11() {
        let today = new FitnessDay(2000, 200, new Date(new Date().getTime()))
        let calendar = new FitnessCalendar(190, new Date('2022-12-30'), [today]);
        return [calendar.getWeightFluctuation() == 0,
            'testWeightFluctuationOneDay',
            'Calendar doesn\'t calculate weight changes correctly.',
            calendar.getWeightFluctuation(),
            0
        ]
    }
}


runTests(new Tests())

