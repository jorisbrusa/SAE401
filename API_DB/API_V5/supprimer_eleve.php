<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

if (!isset($_GET["ID"])) {
    echo json_encode(["error" => "ID manquant"]);
    exit;
}

$id = (int)$_GET["ID"];

try {
    $stmt = $pdo->prepare("DELETE FROM Eleves WHERE ID = ?");
    $stmt->execute([$id]);

    echo json_encode(["success" => "Élève supprimé"]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur SQL : " . $e->getMessage()]);
}
