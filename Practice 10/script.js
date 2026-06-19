function toCelsius() {
    let temp = parseFloat(document.getElementById("temp").value);

    if (isNaN(temp)) {
        document.getElementById("result").innerHTML =
            "Please enter a valid temperature.";
        return;
    }

    let celsius = (temp - 32) * 5 / 9;

    document.getElementById("result").innerHTML =
        temp + "°F = " + celsius.toFixed(2) + "°C";
}

function toFahrenheit() {
    let temp = parseFloat(document.getElementById("temp").value);

    if (isNaN(temp)) {
        document.getElementById("result").innerHTML =
            "Please enter a valid temperature.";
        return;
    }

    let fahrenheit = (temp * 9 / 5) + 32;

    document.getElementById("result").innerHTML =
        temp + "°C = " + fahrenheit.toFixed(2) + "°F";
}