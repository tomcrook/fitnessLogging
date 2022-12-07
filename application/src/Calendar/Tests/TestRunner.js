"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function run_test(test) {
    var output = test();
    if (!output[0]) {
        console.log('[FAIL] ' + output[1] + " \n  - ERROR MSG: " + output[2] +
            " \n  - actual: " + output[3] + "  expected: " + output[4]);
    }
    else {
        console.log('[PASS] ' + output[1]);
    }
}
function runTests(tests) {
    var test_functions = Object.getPrototypeOf(tests);
    for (var test_1 in test_functions) {
        run_test(test_functions[test_1]);
    }
}
exports.default = runTests;
//# sourceMappingURL=TestRunner.js.map