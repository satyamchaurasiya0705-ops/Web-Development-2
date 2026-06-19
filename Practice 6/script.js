function reverseString() {
    let str = document.getElementById("text").value;

    let reversed = str.split("").reverse().join("");

    document.getElementById("result").innerHTML =
        "Reversed String: " + reversed;
}