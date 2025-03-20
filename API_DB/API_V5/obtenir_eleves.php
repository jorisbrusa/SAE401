<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

require_once 'db.php';

if (isset($_GET["id"])) {
    $id = $_GET["id"];
    $stmt = $pdo->prepare("SELECT ID, NEPH_Email, Prenom, Nom FROM Eleves WHERE ID = ?");
    $stmt->execute([$id]);
} else {
    $stmt = $pdo->query("SELECT ID, NEPH_Email, Prenom, Nom FROM Eleves");
}

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
