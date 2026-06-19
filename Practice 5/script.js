function checkPrime() {
    let num = parseInt(document.getElementById("number").value);

    if (isNaN(num) || num < 2) {
        document.getElementById("result").innerHTML =
            "Please enter a number greater than 1.";
        return;
    }

    let isPrime = true;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        document.getElementById("result").innerHTML =
            num + " is a Prime Number.";
    } else {
        document.getElementById("result").innerHTML =
            num + " is not a Prime Number.";
    }
}