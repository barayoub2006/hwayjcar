<?php
// ابدأ الجلسة
session_start();
// السطر 3: التأكد من استدعاء الملف الصحيح للاتصال بقاعدة البيانات
include 'db_connect.php';

// التحقق من أن الطلب هو POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // التحقق من وجود الحقول المطلوبة
    if (isset($_POST['fullname'], $_POST['email'], $_POST['phone'], $_POST['password'], $_POST['confirm_password'])) {
        
        $fullname = $_POST['fullname'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];

        if ($password !== $confirm_password) {
            die("خطأ: كلمتا المرور غير متطابقتين. الرجاء العودة والمحاولة مرة أخرى.");
        }

        // تشفير كلمة المرور
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // التحقق من أن الإيميل غير مسجل مسبقاً
        $stmt_check = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt_check->bind_param("s", $email);
        $stmt_check->execute();
        $stmt_check->store_result();

        if ($stmt_check->num_rows > 0) {
            die("خطأ: هذا البريد الإلكتروني مسجل بالفعل. الرجاء استخدام بريد إلكتروني آخر أو تسجيل الدخول.");
        }
        $stmt_check->close();

        // إدخال المستخدم الجديد في قاعدة البيانات
        $stmt_insert = $conn->prepare("INSERT INTO users (fullname, email, phone, password) VALUES (?, ?, ?, ?)");
        $stmt_insert->bind_param("ssss", $fullname, $email, $phone, $hashed_password);

        if ($stmt_insert->execute()) {
            // إعادة التوجيه إلى صفحة الدخول مع رسالة نجاح
            header("Location: login.html?status=registersuccess");
            exit();
        } else {
            echo "خطأ في التسجيل: " . $stmt_insert->error;
        }
        
        $stmt_insert->close();

    } else {
        die("خطأ: الرجاء ملء جميع الحقول المطلوبة.");
    }
    
    $conn->close();
}
?>