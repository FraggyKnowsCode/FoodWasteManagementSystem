CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    phone_number VARCHAR(15),
    address TEXT,
    account_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE FoodWasteData (
    waste_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_of_waste DATE NOT NULL,
    food_category ENUM('vegetables', 'fruits', 'grains', 'dairy') NOT NULL,
    amount_wasted FLOAT NOT NULL,
    cause_of_waste TEXT NOT NULL,
    location TEXT NOT NULL,
    disposal_method ENUM('landfill', 'compost', 'donation') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE ReductionPrograms (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    program_name TEXT NOT NULL,
    description_of_program TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    participating_organizations TEXT NOT NULL,
    amount_saved FLOAT NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES Users(user_id)
);

CREATE TABLE FoodDonation (
    donation_id INT AUTO_INCREMENT PRIMARY KEY, 
    donor_id INT,
    recipient_id INT,
    amount_donated FLOAT,                
    food_type VARCHAR(100),                     
    donation_date DATE NOT NULL,
    FOREIGN KEY (donor_id) REFERENCES Users(user_id),
    FOREIGN KEY (recipient_id) REFERENCES Users(user_id)
);

CREATE TABLE Feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    feedback_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    satisfaction_level ENUM('very satisfied', 'satisfied', 'neutral', 'dissatisfied', 'very dissatisfied'),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE CostManagement (
    cost_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    cost_type ENUM('labour', 'maintenance', 'transportation', 'event', 'other') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    description TEXT,
    cost_date DATE NOT NULL,
    program_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES ReductionPrograms(program_id)
);

CREATE TABLE Admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    admin_role ENUM('superadmin', 'manager') DEFAULT 'manager',
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
