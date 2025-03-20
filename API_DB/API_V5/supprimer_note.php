<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["ID_C_Examen"])) {
    echo json_encode(["error" => "ID_C_Examen requis"]);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM Resultat_Examen_Code WHERE ID_C_Examen = ?");
$stmt->execute([$input["ID_C_Examen"]]);

echo json_encode(["success" => "Note supprimée"]);
