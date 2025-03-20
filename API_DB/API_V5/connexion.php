<?php

// Configuration des en-têtes HTTP
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Connexion à la base de données MySQL
$host = "mysql-test888.alwaysdata.net";
$dbname = "test888_easytodrive_db";
$user = "test888";
$password = "wxcvbn.1963";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de connexion à la base de données"]);
    exit;
}

// Récupération des données envoyées
$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["NEPH_Email"], $input["code"])) {
    echo json_encode(["error" => "Données incomplètes"]);
    exit;
}

$email = $input["NEPH_Email"];
$password = $input["code"];

// Requête SQL pour récupérer le hash du mot de passe
$stmt = $pdo->prepare("SELECT ID, code FROM Eleves WHERE NEPH_Email = ?");
$stmt->execute([$email]);
$eleve = $stmt->fetch(PDO::FETCH_ASSOC);

if ($eleve) {
    // Vérification du mot de passe avec password_verify()
    if (password_verify($password, $eleve["code"])) {
        echo json_encode(["success" => true, "ID" => $eleve["ID"]]);
    } else {
        echo json_encode(["error" => "Mot de passe incorrect"]);
    }
} else {
    echo json_encode(["error" => "Email introuvable"]);
}
exit;
?>
