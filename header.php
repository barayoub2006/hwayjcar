<?php
session_start();
?>
<header>
    <nav>
        <a href="index1.php" class="logo"> <img src="logo.png" alt="dzdrive">
            <span>DzDrive</span>
        </a>
        <div class="menu-icon" id="menu-icon">
            <i class="fas fa-bars"></i>
        </div>
        <ul class="nav-links" id="nav-links">
            <li><a href="index1.php">الرئيسية</a></li> <li><a href="acheter1.php">شراء / كراء</a></li> <li><a href="about.php">من نحن</a></li> <li><a href="index1.php#contact">اتصل بنا</a></li> <?php
            if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
                echo '<li class="welcome-user">مرحباً، ' . htmlspecialchars($_SESSION["user_fullname"]) . '</li>';
                echo '<li><a href="logout.php" class="btn btn-logout">تسجيل الخروج</a></li>';
            } else {
                echo '<li><a href="login.html" class="btn btn-login">تسجيل الدخول</a></li>';
            }
            ?>
        </ul>
    </nav>
</header>