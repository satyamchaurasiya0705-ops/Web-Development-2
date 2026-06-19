function checkNumber() {
    let number = document.getElementById("num").value;

    if (number === "") {
        document.getElementById("result").innerHTML = "Please enter a number";
        return;
    }

    if (number % 2 === 0) {
        document.getElementById("result").innerHTML = number + " is Even";
    } else {
        document.getElementById("result").innerHTML = number + " is Odd";
    }
}