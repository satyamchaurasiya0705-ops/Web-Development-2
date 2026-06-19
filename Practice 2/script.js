function checkArmstrong() {
    let num = document.getElementById("number").value;

    if (num === "") {
        document.getElementById("result").innerHTML =
            "Please enter a number.";
        return;
    }

    let originalNum = parseInt(num);
    let digits = num.length;
    let sum = 0;
    let temp = originalNum;

    while (temp > 0) {
        let digit = temp % 10;
        sum += Math.pow(digit, digits);
        temp = Math.floor(temp / 10);
    }

    if (sum === originalNum) {
        document.getElementById("result").innerHTML =
            originalNum + " is an Armstrong Number.";
    } else {
        document.getElementById("result").innerHTML =
            originalNum + " is not an Armstrong Number.";
    }
}