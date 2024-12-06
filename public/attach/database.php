<?php
/* ------------------- Connect to MySQL ini ------------------- */
$dsn = "mysql:host=localhost;dbname=TIOSAM;charset=UTF8";
try {
    $pdo = new PDO($dsn, "root", "");
} catch (PDOException $e) {
    echo $e->getMessage();
}
/* ------------------- Connect to MySQL end ------------------- */
?>
