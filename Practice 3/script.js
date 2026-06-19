function getGrade(marks) {
    if (marks >= 90) return "A+";
    else if (marks >= 80) return "A";
    else if (marks >= 70) return "B";
    else if (marks >= 60) return "C";
    else if (marks >= 50) return "D";
    else return "F";
}

function calculateGrades() {
    let result = "";

    for (let i = 1; i <= 5; i++) {
        let marks = parseInt(document.getElementById("m" + i).value);

        if (isNaN(marks) || marks < 0 || marks > 100) {
            result += `<p>Student ${i}: Invalid Marks</p>`;
        } else {
            let grade = getGrade(marks);
            result += `<p>Student ${i}: Marks = ${marks}, Grade = ${grade}</p>`;
        }
    }

    document.getElementById("result").innerHTML = result;
}