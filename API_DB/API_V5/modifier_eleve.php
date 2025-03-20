<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["id"])) {
    echo json_encode(["error" => "ID manquant"]);
    exit;
}

$id = $input["id"];
unset($input["id"]);

$fields = [];
$values = [];

foreach ($input as $col => $val) {
    if ($col === "code") {
        $val = password_hash($val, PASSWORD_BCRYPT);
    }
    $fields[] = "$col = ?";
    $values[] = $val;
}

$sql = "UPDATE Eleves SET " . implode(", ", $fields) . " WHERE ID = ?";
$values[] = $id;

$stmt = $pdo->prepare($sql);
$stmt->execute($values);

echo json_encode(["success" => "Élève mis à jour"]);
