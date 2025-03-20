<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["NEPH_Email"], $input["Prenom"], $input["Nom"], $input["Auto_Ecole"], $input["code"])) {
    echo json_encode(["error" => "Données incomplètes"]);
    exit;
}

// Hachage du mot de passe
$input["code"] = password_hash($input["code"], PASSWORD_BCRYPT);

$stmt = $pdo->prepare("INSERT INTO Eleves (NEPH_Email, Prenom, Nom, Auto_Ecole, code) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$input["NEPH_Email"], $input["Prenom"], $input["Nom"], $input["Auto_Ecole"], $input["code"]]);

echo json_encode(["success" => "Élève ajouté"]);
