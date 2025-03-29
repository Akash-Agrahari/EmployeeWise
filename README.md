// Ta dhaaaa //

# User Management Dashboard

Welcome to the **User Management Dashboard**! This project is a web application designed to manage user data efficiently. It provides a clean and intuitive interface for performing CRUD (Create, Read, Update, Delete) operations on user information. The application is built using modern web technologies and focuses on simplicity, responsiveness, and user experience.

## Features

- **User Listing**: Displays a list of users fetched from an API with their details like name, email, and avatar.
- **Search Functionality**: Quickly search for users by their first or last name using the search bar.
- **Edit User**: Update user details such as first name, last name, and email through a dedicated edit form.
- **Delete User**: Remove a user from the list with a confirmation step to prevent accidental deletions.
- **Logout Functionality**: Securely log out of the application by typing "LOGOUT" for confirmation.
- **Responsive Design**: Fully responsive layout that works seamlessly on desktops, tablets, and mobile devices.

## Technologies Used

- **React.js**: For building the user interface and managing state.
- **React Router**: For navigation and routing between pages.
- **Axios**: For making API requests to fetch and manipulate user data.
- **React Toastify**: For displaying notifications and alerts.
- **Tailwind CSS**: For styling the application with a modern and responsive design.

## How It Works

1. **Authentication**: The app checks for a token in local storage to ensure the user is authenticated. If not, it redirects to the login page.
2. **User Management**:
   - Users are fetched from an API and displayed in a list.
   - You can search for users, edit their details, or delete them with confirmation.
3. **Logout**: Users can securely log out by confirming their action.

## API Integration

The application uses the [Reqres API](https://reqres.in/) for simulating user data. This includes fetching user lists, updating user details, and deleting users.

## Project Structure

- **Pages**: Contains the main pages like `Landing.jsx` for the user dashboard.
- **Components**: Reusable components like `Cursor` for custom UI elements.
- **Styles**: Tailwind CSS is used for styling the application.

## Future Enhancements

- Add user creation functionality.
- Implement authentication with a real backend.
- Improve error handling and validation.
- Add pagination for large user lists.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Start the development server with `npm start`.
4. Open the app in your browser at `http://localhost:3000`.

---

This project is a great starting point for building a full-fledged user management system. Feel free to explore, modify, and enhance it as needed!

## You can Run it Online Via 
https://employee-wise-1uq3.vercel.app/