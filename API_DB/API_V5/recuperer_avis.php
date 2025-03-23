<?php
include 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

try {
    $query = "SELECT Date, Contenu FROM Avis ORDER BY Date DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $avis = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($avis);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
