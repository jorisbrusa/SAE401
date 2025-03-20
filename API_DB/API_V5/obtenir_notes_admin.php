<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

require_once 'db.php';

if (!isset($_GET["Eleve_ID"])) {
    echo json_encode(["error" => "Eleve_ID requis"]);
    exit;
}

$eleve_id = $_GET["Eleve_ID"];

// Récupération des notes des examens de code pour un élève spécifique
$stmt_code = $pdo->prepare("SELECT Date, Numero_Examen, Note FROM Resultat_Examen_Code WHERE Eleve_ID = ?");
$stmt_code->execute([$eleve_id]);
$notes_code = $stmt_code->fetchAll(PDO::FETCH_ASSOC);

// Récupération des notes des examens de simulation pour un élève spécifique
$stmt_simu = $pdo->prepare("SELECT Date, Numero_Examen, Impression FROM Resultat_Examen_Simu WHERE Eleve_ID = ?");
$stmt_simu->execute([$eleve_id]);
$notes_simu = $stmt_simu->fetchAll(PDO::FETCH_ASSOC);

// Retourner un JSON avec les notes de l'élève
echo json_encode([
    "examen_code" => $notes_code,
    "examen_simu" => $notes_simu
]);
?>
