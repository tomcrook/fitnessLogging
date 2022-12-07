
function run_test(test: Function) {
    let output = test();
    if (!output[0]) {
        console.log('[FAIL] ' + output[1] + " \n  - ERROR MSG: " + output[2] +
            " \n  - actual: " + output[3] +  "  expected: " + output[4])
    } else {
        console.log('[PASS] ' + output[1])
    }
}


function runTests(tests) {
    let test_functions = Object.getPrototypeOf(tests);
    for (let test in test_functions) {
        run_test(test_functions[test])
    }
}

export default runTests;