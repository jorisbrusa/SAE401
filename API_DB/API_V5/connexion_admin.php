<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["email"], $input["MDP"])) {
    echo json_encode(["error" => "Données incomplètes"]);
    exit;
}

$email = $input["email"];
$password = $input["MDP"];

// Vérifier si l'admin existe
$stmt = $pdo->prepare("SELECT ID_Admin, MDP FROM Admin WHERE Email = ?");
$stmt->execute([$email]);
$admin = $stmt->fetch(PDO::FETCH_ASSOC);

if ($admin) {
    // Vérification du mot de passe (si hashé, sinon simple comparaison)
    if ($password === $admin["MDP"]) { // Si stocké en texte brut
        echo json_encode(["success" => true, "ID_Admin" => $admin["ID_Admin"]]);
    } else {
        echo json_encode(["error" => "Mot de passe incorrect"]);
    }
} else {
    echo json_encode(["error" => "Email introuvable"]);
}

exit;
