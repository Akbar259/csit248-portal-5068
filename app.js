// Enrolment Number: A85204925068 | Start Date: 13 November 2026

"use strict";

const PASSWORD_MIN_LENGTH = 6;
const NAME_MAX_LENGTH = 25;
const NUMBER_OF_STUDENTS = 5;
const MY_MARKS = 76;
const PASS_MARK = 48;

const registrationForm = document.querySelector("#registrationForm");

const studentTable = document.querySelector("#studentTable");

const errorsList = document.querySelector("#errors");

if (registrationForm) {
    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const fullName = document.querySelector("#fullName").value.trim();
        const email = document.querySelector("#email").value.trim();
        const phone = document.querySelector("#phone").value.trim();
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirmPassword").value;
        const city = document.querySelector("#city").value;

        const errors = [];

        if (fullName === "") {
            errors.push("Full name is required.");
        }

        if (fullName.length > NAME_MAX_LENGTH) {
            errors.push("Name must not exceed 25 characters.");
        }

        if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        if (!/^\d{9}$/.test(phone)) {
            errors.push("Phone must contain exactly 9 digits.");
        }

        if (password.length < PASSWORD_MIN_LENGTH) {
            errors.push("Password must contain at least 6 characters.");
        }

        if (password !== confirmPassword) {
            errors.push("Passwords do not match.");
        }

        if (city === "") {
            errors.push("Please select your city.");
        }

        errorsList.textContent = "";

        errors.forEach(function(error) {
            const li = document.createElement("li");
            li.textContent = error;
            errorsList.appendChild(li);
        });

        if (errors.length === 0) {
            const confirmed = confirm("Register " + fullName + "?");

            if (confirmed) {
                window.location.href = "board.html?name=" + encodeURIComponent(fullName);
            }
        }
    });
        const fullNameInput = document.querySelector("#fullName");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const passwordInput = document.querySelector("#password");
    const confirmPasswordInput = document.querySelector("#confirmPassword");
    const cityInput = document.querySelector("#city");
    const nameCounter = document.querySelector("#nameCounter");

    fullNameInput.addEventListener("keyup", function() {
        const remaining = Math.max(
            0,
            NAME_MAX_LENGTH - fullNameInput.value.length
        );

        nameCounter.textContent = remaining + " characters left";
    });

    const fields = [
        fullNameInput,
        emailInput,
        phoneInput,
        passwordInput,
        confirmPasswordInput,
        cityInput
    ];

    fields.forEach(function(field) {
        field.addEventListener("blur", function() {
            let invalid = false;

            if (field === fullNameInput &&
                (fullNameInput.value.trim() === "" ||
                fullNameInput.value.trim().length > NAME_MAX_LENGTH)) {
                invalid = true;
            }

            if (field === emailInput &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                invalid = true;
            }

            if (field === phoneInput &&
                !/^\d{9}$/.test(phoneInput.value.trim())) {
                invalid = true;
            }

            if (field === passwordInput &&
                passwordInput.value.length < PASSWORD_MIN_LENGTH) {
                invalid = true;
            }

            if (field === confirmPasswordInput &&
                confirmPasswordInput.value !== passwordInput.value) {
                invalid = true;
            }

            if (field === cityInput && cityInput.value === "") {
                invalid = true;
            }

            field.classList.toggle("invalid", invalid);
        });
    });
        const cityMessage = document.querySelector("#cityMessage");

    cityInput.addEventListener("change", function() {
        cityMessage.textContent = "You chose " + cityInput.value;
    });
}

// Student Marks Board

if (studentTable) {
    const welcome = document.querySelector("#welcome");
    const loadTime = document.querySelector("#loadTime");
    const errorMessage = document.querySelector("#errorMessage");
    const sortSelect = document.querySelector("#sortSelect");
    const backButton = document.querySelector("#backButton");

    const params = new URLSearchParams(window.location.search);
    const studentName = params.get("name");

    welcome.textContent = "Welcome, " + (studentName || "Student");
    loadTime.textContent = "Page loaded at: " + new Date().toLocaleString();

    let students = [];

    function grade(marks) {
        if (marks < PASS_MARK) {
            return "Fail";
        } else if (marks >= 75) {
            return "Distinction";
        } else {
            return "Pass";
        }
    }

    function displayStudents(studentList) {
        studentTable.textContent = "";

        studentList.forEach(function(student) {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = student.name;

            const marksCell = document.createElement("td");
            marksCell.textContent = student.marks;

            const cityCell = document.createElement("td");
            cityCell.textContent = student.city;

            const gradeCell = document.createElement("td");
            gradeCell.textContent = grade(student.marks);

            row.appendChild(nameCell);
            row.appendChild(marksCell);
            row.appendChild(cityCell);
            row.appendChild(gradeCell);

            studentTable.appendChild(row);
        });
    }

    async function loadStudents() {
        try {
            const response = await fetch("students.json");

            if (!response.ok) {
                throw new Error("Could not load students.json");
            }

            students = await response.json();

            displayStudents(students);

        } catch (error) {
            errorMessage.textContent = "Error loading students: " + error.message;
        }
    }

    sortSelect.addEventListener("change", function() {
        if (sortSelect.value === "name") {
            students.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        } else if (sortSelect.value === "marks") {
            students.sort(function(a, b) {
                return b.marks - a.marks;
            });
        }

        displayStudents(students);
    });

    backButton.addEventListener("click", function() {
        history.back();
    });

    loadStudents();
}

console.log("A85204925068");