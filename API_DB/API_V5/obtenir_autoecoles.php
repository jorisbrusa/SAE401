<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

require_once 'db.php';

$stmt = $pdo->query("SELECT * FROM Auto_Ecole");

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
