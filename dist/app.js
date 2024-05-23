"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Function to get the number of days passed since a given date
function calculateDaysPassed(date) {
    const startDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
// Function to add a habit to the fake database
function addHabit(habit) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(habit),
        });
        if (!response.ok) {
            throw new Error('Failed to add habit');
        }
        const newHabit = yield response.json();
        return newHabit;
    });
}
// Function to get all habits from the fake database
function getHabits() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/habits');
        if (!response.ok) {
            throw new Error('Failed to fetch habits');
        }
        const habits = yield response.json();
        return habits;
    });
}
// Function to display habits
function displayHabits() {
    return __awaiter(this, void 0, void 0, function* () {
        const habits = yield getHabits();
        const activitiesDiv = document.querySelector('.activities');
        activitiesDiv.innerHTML = '';
        habits.forEach(habit => {
            const daysPassed = calculateDaysPassed(habit.startDate);
            habit.daysPassed = daysPassed;
            const actionDiv = document.createElement('div');
            actionDiv.className = 'action';
            actionDiv.innerHTML = `
        <ion-icon name="${habit.habitImage}"></ion-icon>
            <p>${habit.startDate} <br>${habit.name}</p>
            <p class="tracking-days">${daysPassed} days</p>
        `;
            activitiesDiv.appendChild(actionDiv);
        });
    });
}
// Event listener for form submission
document.querySelector('form').addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const habitInput = document.querySelector('#habit');
    const startDateInput = document.querySelector('#startDate');
    const ImageInput = document.querySelector('#dropdown');
    const newHabit = {
        name: habitInput.value,
        startDate: startDateInput.value,
        habitImage: ImageInput.value,
    };
    try {
        yield addHabit(newHabit);
        displayHabits();
        habitInput.value = '';
        startDateInput.value = '';
        ImageInput.value = '';
    }
    catch (error) {
        console.error('Error adding habit:', error);
    }
}));
// Initial display of habits
displayHabits();
