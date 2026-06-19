function generateFibonacci() {
    let n = parseInt(document.getElementById("num").value);

    if (isNaN(n) || n <= 0) {
        document.getElementById("result").innerHTML =
            "Please enter a valid positive number.";
        return;
    }

    let a = 0, b = 1;
    let series = "";

    for (let i = 1; i <= n; i++) {
        series += a + " ";

        let next = a + b;
        a = b;
        b = next;
    }

    document.getElementById("result").innerHTML =
        "Fibonacci Series: " + series;
}