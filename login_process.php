<?php
session_start(); // بداية الجلسة لحفظ معلومات المستخدم
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // البحث عن المستخدم عبر الإيميل
    $stmt = $conn->prepare("SELECT id, fullname, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $fullname, $hashed_password);
        $stmt->fetch();

        // التحقق من تطابق كلمة المرور المشفرة
        if (password_verify($password, $hashed_password)) {
            // كلمة المرور صحيحة، ابدأ الجلسة
            $_SESSION['loggedin'] = true;
            $_SESSION['user_id'] = $id;
            $_SESSION['user_fullname'] = $fullname;

            // إعادة التوجيه للصفحة الرئيسية
            header("Location: index1.html");
            exit();
        } else {
            // كلمة المرور خاطئة
            die("Error: Invalid email or password.");
        }
    } else {
        // الإيميل غير موجود
        die("Error: Invalid email or password.");
    }

    $stmt->close();
    $conn->close();
}
?>