<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["ID_C_Examen"], $input["Note"])) {
    echo json_encode(["error" => "ID_C_Examen et Note requis"]);
    exit;
}

$stmt = $pdo->prepare("UPDATE Resultat_Examen_Code SET Note = ? WHERE ID_C_Examen = ?");
$stmt->execute([$input["Note"], $input["ID_C_Examen"]]);

echo json_encode(["success" => "Note mise à jour"]);
