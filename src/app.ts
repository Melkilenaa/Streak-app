interface Habit {
    id?: number;
    name: string;
    startDate: string;
    daysPassed?: number;
    habitImage:string;
}

// Function to get the number of days passed since a given date
function calculateDaysPassed(date: string): number {
    const startDate = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Function to add a habit to the fake database
async function addHabit(habit: Habit) {
    const response = await fetch('http://localhost:3000/habits', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(habit),
    });

    if (!response.ok) {
        throw new Error('Failed to add habit');
    }

    const newHabit = await response.json();
    return newHabit;
}

// Function to get all habits from the fake database
async function getHabits(): Promise<Habit[]> {
    const response = await fetch('http://localhost:3000/habits');
    if (!response.ok) {
        throw new Error('Failed to fetch habits');
    }
    const habits: Habit[] = await response.json();
    return habits;
}

// Function to display habits
async function displayHabits() {
    const habits = await getHabits();
    const activitiesDiv = document.querySelector('.activities') as HTMLDivElement;
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
}

// Event listener for form submission
document.querySelector('form')!.addEventListener('submit', async (e) => {
    e.preventDefault();
    const habitInput = document.querySelector('#habit') as HTMLInputElement;
    const startDateInput = document.querySelector('#startDate') as HTMLInputElement;
    const ImageInput = document.querySelector('#ImageName') as HTMLInputElement;
    const newHabit: Habit = {
        name: habitInput.value,
        startDate: startDateInput.value,
        habitImage:ImageInput.value,
    };

    try {
        await addHabit(newHabit);
        displayHabits();
        habitInput.value = '';
        startDateInput.value = '';
        ImageInput.value =''
    } catch (error) {
        console.error('Error adding habit:', error);
    }
});

// Initial display of habits
displayHabits();

