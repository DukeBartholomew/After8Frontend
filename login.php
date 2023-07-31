<?php
session_start();

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the submitted username and password
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Perform validation and authentication logic here
    // You can use the provided username and password to verify the user's credentials
    // If the credentials are valid, set the session variable to indicate that the user is logged in
    if ($username === 'valid_username' && $password === 'valid_password') {
        $_SESSION['loggedIn'] = true;
        // Redirect the user to the inventory page after successful login
        header('Location: /inventory');
        exit();
    } else {
        // Invalid credentials, redirect back to the landing page with an error message
        header('Location: /landing?error=1');
        exit();
    }
} else {
    // If the form is not submitted, redirect back to the landing page
    header('Location: /landing');
    exit();
}
?>
