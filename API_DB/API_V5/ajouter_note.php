<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["Eleve_ID"], $input["Numero_Examen"], $input["Note"])) {
    echo json_encode(["error" => "Données incomplètes"]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO Resultat_Examen_Code (Eleve_ID, Numero_Examen, Note, Date) VALUES (?, ?, ?, NOW())");
$stmt->execute([$input["Eleve_ID"], $input["Numero_Examen"], $input["Note"]]);

echo json_encode(["success" => "Note ajoutée"]);
