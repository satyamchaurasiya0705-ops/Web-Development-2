function findFactorial() {
    let num = parseInt(document.getElementById("number").value);

    if (isNaN(num) || num < 0) {
        document.getElementById("result").innerHTML =
            "Please enter a valid non-negative number.";
        return;
    }

    let factorial = 1;

    for (let i = 1; i <= num; i++) {
        factorial *= i;
    }

    document.getElementById("result").innerHTML =
        "Factorial of " + num + " is " + factorial;
}