<?php
// Database configuration
$servername = "localhost";
$username = "root"; // اسم المستخدم الافتراضي في XAMPP
$password = "";     // كلمة المرور الافتراضية في XAMPP فارغة
$dbname = "dzdrive_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// Set character set to UTF-8
$conn->set_charset("utf8mb4");
?>