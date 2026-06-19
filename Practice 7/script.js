function checkPalindrome() {
    let str = document.getElementById("text").value;

    let reversed = str.split("").reverse().join("");

    if (str === reversed) {
        document.getElementById("result").innerHTML =
            `"${str}" is a Palindrome.`;
    } else {
        document.getElementById("result").innerHTML =
            `"${str}" is not a Palindrome.`;
    }
}