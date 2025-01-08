# Queens Coffee Billing System

## Description
Queens Coffee Billing System is a MERN stack application designed to manage coffee shop operations efficiently. The system allows administrators to handle menu items, manage customer orders, track sales data, and provide a seamless user experience.

---

## Table of Contents
•	Features
•	Technologies
•	Installation
•	Usage
•	Components 
    o	Login Page
    o	Menu Page
    o	Modal
    o	Accounts Page
    o	Navbar
    o	Sales Page
•	Contributing

---

## Features
1. **Menu Management:**
   - Add, edit, delete, and view coffee shop menu items.
   - Filter menu items by category (e.g., coffee, chillers).

2. **Cart and Billing:**
   - Add items to the cart and update quantities.
   - Calculate and display the total bill amount.
   - Submit orders and save sales data.

3. **Sales Tracking:**
   - View daily, weekly, and monthly revenue summaries.

4. **User Accounts:**
   - Manage account details including name, email, and profile picture.

5. **Navigation and Authentication:**
   - Login functionality for secure access.
   - Sidebar navigation for seamless browsing.

---

## Technologies
- **Frontend:** React.js, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Routing:** React Router DOM
- **Styling:** CSS

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/queens-coffee.git
   ```
2. Navigate to the project directory:
   ```bash
   cd queens-coffee
   ```
3. Install dependencies for the frontend:
   ```bash
   cd client
   npm install
   ```
4. Install dependencies for the backend:
   ```bash
   cd ../server
   npm install
   ```
5. Start the backend server:
   ```bash
   npm start
   ```
6. Start the frontend development server:
   ```bash
   cd ../client
   npm start
   ```

---

## Usage
1. Visit `http://localhost:3000` in your browser to access the application.
2. Login with your credentials.
3. Use the navigation bar to explore various features:
   - Manage the menu, place orders, and view sales data.
   - Access account details and perform CRUD operations on menu items.
4. Generate bills and track sales summaries for analysis.

---

## Components

### Login Page
- Handles user authentication.
- Sends login details (username and password) to the backend.
- Redirects to the Menu page upon successful login.

### Menu Page
- Displays menu items fetched from the backend.
- Allows filtering, editing, and deleting of products.
- Tracks items added to the cart and calculates the total bill.
- Provides functionality to submit orders and save sales data.

### Modal Page
- Used for adding or editing products.
- Includes input fields for name, price, category, and image URL.
- Clears data after submission and displays appropriate buttons for actions.

### Accounts Page
- Displays user account details including name, email, and profile picture.
- Optionally embeds a Google map for location-specific details.

### Navbar
- Provides navigation links to various pages: Menu, Sales, and Account.
- Includes a logout button and branding with the letter "Q" logo.

### Sales Page
- Fetches daily, weekly, and monthly sales data from the backend.
- Displays the sales data in visually appealing cards.

---

## Screenshots
*Add screenshots or GIFs of the application here.*

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push:
   ```bash
   git push origin feature-name
   ```
4. Ensure Your Code is Well-Documented  
   Include clear and concise comments for any new functionality, and update documentation if necessary.  

5. Follow Coding Standards  
   Make sure your code adheres to the project's coding conventions and passes all tests before submission.  

6. Collaborate with Reviewers  
   Be open to feedback and make necessary changes to your Pull Request (PR) based on the maintainers' suggestions.  

7. Celebrate Your Contribution!  
   Once your PR is approved and merged, your contribution will become part of the project. 🎉  

Thank you for taking the time to contribute to Queens Coffee! Together, we can make this project even better.  
