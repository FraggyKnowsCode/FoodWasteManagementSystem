document.addEventListener('DOMContentLoaded', () => {
    const addUserForm = document.getElementById('add-user-form');
    if (addUserForm) {
        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addUser();
        });
    }

    const addFoodWasteForm = document.getElementById('add-foodwaste-form');
    if (addFoodWasteForm) {
        addFoodWasteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            addFoodWasteData();
        });
    }

    if (document.getElementById('users')) {
        fetchUsers();
    }

    if (document.getElementById('foodwaste-records')) {
        fetchFoodWasteData();
    }
});

// Function to fetch users from the server
function fetchUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched users:', data); // Log fetched users
            const userList = document.getElementById('users');
            userList.innerHTML = ''; // Clear existing users
            data.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username} - ${user.email}`;
                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Function to add a new user
function addUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const date_of_birth = document.getElementById('date_of_birth').value;
    const phone_number = document.getElementById('phone_number').value;
    const address = document.getElementById('address').value;
    const account_created = new Date().toISOString();
    const role = document.getElementById('role').value;

    const newUser = {
        username: username,
        email: email,
        password_hash: password, // In a real application, hash the password before sending
        first_name: first_name,
        last_name: last_name,
        date_of_birth: date_of_birth,
        phone_number: phone_number,
        address: address,
        account_created: account_created,
        role: role
    };

    console.log('Sending new user data:', newUser); // Log the data being sent

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if (response.ok) {
            console.log('User added successfully'); // Log success message
            fetchUsers(); // Refresh the user list
        } else {
            console.error('Error adding user:', response.statusText);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch food waste data from the server
function fetchFoodWasteData() {
    fetch('/api/foodwaste')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched food waste data:', data); // Log fetched food waste data
            const foodWasteList = document.getElementById('foodwaste-records');
            foodWasteList.innerHTML = ''; // Clear existing records
            data.forEach(record => {
                const li = document.createElement('li');
                li.textContent = `${record.food_category} - ${record.amount_wasted} - ${record.cause_of_waste}`;
                foodWasteList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching food waste data:', error));
}

// Function to add new food waste data
function addFoodWasteData() {
    const user_id = document.getElementById('user_id').value;
    const date_of_waste = document.getElementById('date_of_waste').value;
    const food_category = document.getElementById('food_category').value;
    const amount_wasted = document.getElementById('amount_wasted').value;
    const cause_of_waste = document.getElementById('cause_of_waste').value;
    const location = document.getElementById('location').value;
    const disposal_method = document.getElementById('disposal_method').value;

    const newFoodWasteData = {
        user_id: user_id,
        date_of_waste: date_of_waste,
        food_category: food_category,
        amount_wasted: amount_wasted,
        cause_of_waste: cause_of_waste,
        location: location,
        disposal_method: disposal_method
    };

    console.log('Sending new food waste data:', newFoodWasteData); // Log the data being sent

    fetch('/api/foodwaste', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFoodWasteData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Food waste data added successfully'); // Log success message
            fetchFoodWasteData(); // Refresh the food waste data list
        } else {
            console.error('Error adding food waste data:', response.statusText);
        }
    })
    .catch(error => console.error('Error:', error));
}