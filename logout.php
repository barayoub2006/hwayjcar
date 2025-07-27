<?php
// 1. ابدأ الجلسة
session_start();

// 2. قم بإلغاء كل متغيرات الجلسة
$_SESSION = array();

// 3. قم بتدمير الجلسة
session_destroy();

// 4. أعد توجيه المستخدم إلى الصفحة الرئيسية
header("location: index1.php");
exit;
?>