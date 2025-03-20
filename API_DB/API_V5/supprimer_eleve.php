<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["id"])) {
    echo json_encode(["error" => "ID manquant"]);
    exit;
}

$id = $input["id"];

$stmt = $pdo->prepare("DELETE FROM Eleves WHERE ID = ?");
$stmt->execute([$id]);

echo json_encode(["success" => "Élève supprimé"]);
