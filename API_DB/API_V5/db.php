<?php
$host = "mysql-test888.alwaysdata.net";
$dbname = "test888_easytodrive_db";
$user = "test888";
$password = "wxcvbn.1963";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de connexion : " . $e->getMessage()]);
    exit;
}
