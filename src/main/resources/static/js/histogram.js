// Grades
var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
    49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

// Intial run when webpage loads
gradeUpdate();


// Grade Updater Checker Function
function gradeUpdate() {
    var Max = parseFloat(document.getElementById("Max").value);
    var Aplus = parseFloat(document.getElementById("A+").value);
    var A = parseFloat(document.getElementById("A").value);
    var Aminus = parseFloat(document.getElementById("A-").value);
    var Bplus = parseFloat(document.getElementById("B+").value);
    var B = parseFloat(document.getElementById("B").value);
    var Bminus = parseFloat(document.getElementById("B-").value);
    var Cplus = parseFloat(document.getElementById("C+").value);
    var C = parseFloat(document.getElementById("C").value);
    var Cminus = parseFloat(document.getElementById("C-").value);
    var D = parseFloat(document.getElementById("D").value);
    var F = parseFloat(document.getElementById("F").value);
    // If statement to check bounds
    if (
        !isNaN(Max) && !isNaN(Aplus) && !isNaN(A) && !isNaN(Aminus) && !isNaN(Bplus) &&
        !isNaN(B) && !isNaN(Bminus) && !isNaN(Cplus) && !isNaN(C) && !isNaN(Cminus) &&
        !isNaN(D) && !isNaN(F) &&
        Max > Aplus && Aplus > A && A > Aminus && Aminus > Bplus &&
        Bplus > B && B > Bminus && Bminus > Cplus && Cplus > C &&
        C > Cminus && Cminus > D && D > F) {
            countGrades();
    }
    else {
        alert("Please fix Lower Bounds")
    }

} 
 
// Histogram Function
function countGrades() {
     // Lower Bounds
    var Max = parseFloat(document.getElementById("Max").value);
    var Aplus = parseFloat(document.getElementById("A+").value);
    var A = parseFloat(document.getElementById("A").value);
    var Aminus = parseFloat(document.getElementById("A-").value);
    var Bplus = parseFloat(document.getElementById("B+").value);
    var B = parseFloat(document.getElementById("B").value);
    var Bminus = parseFloat(document.getElementById("B-").value);
    var Cplus = parseFloat(document.getElementById("C+").value);
    var C = parseFloat(document.getElementById("C").value);
    var Cminus = parseFloat(document.getElementById("C-").value);
    var D = parseFloat(document.getElementById("D").value);
    var F = parseFloat(document.getElementById("F").value);
    // Grade Count 
    var gradeCounts = {
        "A+": 0,
        "A": 0,
        "A-": 0,
        "B+": 0,
        "B": 0,
        "B-": 0,
        "C+": 0,
        "C": 0,
        "C-": 0,
        "D": 0,
        "F": 0
    };

    for (var i = 0; i < grades.length; i++) {
        var grade = grades[i];
        if (grade >= Aplus && grade <= Max) {
        gradeCounts["A+"]++;
        } else if (grade >= A) {
        gradeCounts["A"]++;
        } else if (grade >= Aminus) {
        gradeCounts["A-"]++;
        } else if (grade >= Bplus) {
        gradeCounts["B+"]++;
        } else if (grade >= B) {
        gradeCounts["B"]++;
        } else if (grade >=Bminus) {
        gradeCounts["B-"]++;
        } else if (grade >= Cplus) {
        gradeCounts["C+"]++;
        } else if (grade >= C) {
        gradeCounts["C"]++;
        } else if (grade >= Cminus) {
        gradeCounts["C-"]++;
        } else if (grade >= D) {
        gradeCounts["D"]++;
        } else if (grade >= F) {
        gradeCounts["F"]++;
        }
        // error handling
        // else display an error message
    }
    
    
    // console.log("A+:", gradeCounts["A+"]);
    // console.log("A:", gradeCounts["A"]);
    // console.log("A-:", gradeCounts["A-"]);
    // console.log("B+:", gradeCounts["B+"]);
    // console.log("B:", gradeCounts["B"]);
    // console.log("C+:", gradeCounts["C+"]);
    // console.log("C:", gradeCounts["C"]);
    // console.log("C-:", gradeCounts["C-"]);
    // console.log("D:", gradeCounts["D"]);
    // console.log("F:", gradeCounts["F"]);
    var tableBody = document.getElementById("gradeTableBody");
    tableBody.innerHTML = ""; // Clear previous content

  for (var grade in gradeCounts) {
    var count = gradeCounts[grade];

    var row = document.createElement("tr");
    var gradeCell = document.createElement("td");
    var graphCell = document.createElement("td");

    gradeCell.textContent = grade;

    var graphBar = document.createElement("div");
    graphBar.className = "graph-bar";
    graphBar.style.width = count * 12 + "px";

    var graphLabel = document.createElement("span");
    graphLabel.className = "graph-label";
    graphLabel.textContent = count;

    var graphContainer = document.createElement("div");
    graphContainer.className = "graph-container";
    graphContainer.appendChild(graphBar);
    graphContainer.appendChild(graphLabel);

    graphCell.appendChild(graphContainer);

    row.appendChild(gradeCell);
    row.appendChild(graphCell);

    tableBody.appendChild(row);
  }

  return gradeCounts;
}

// Run the function after every keypress
document.addEventListener("change", function(event) {
    gradeUpdate();
});


// // When the new grade is entered add to grades and run count grades if grade within bounds
var button = document.querySelector('input[value = "SUBMIT"]')
button.addEventListener('click', function(evt) {
    var text = parseFloat(document.getElementById('fname').value);
    var minValue = parseFloat(document.getElementById("F").value);
    var maxValue = parseFloat(document.getElementById("Max").value);
    evt.preventDefault()
    if (text >= minValue && text <= maxValue) {
        grades.push(text)
        countGrades();
    }
    else {
        alert("Please Enter a Valid Grade Within the Bounds")
        countGrades();
    }

})


