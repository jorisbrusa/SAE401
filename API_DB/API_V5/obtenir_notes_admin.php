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

// Inclure l'ID de chaque note pour modification/suppression
$stmt_code = $pdo->prepare("SELECT ID_C_Examen AS ID, Date, Numero_Examen, Note FROM Resultat_Examen_Code WHERE Eleve_ID = ?");
$stmt_code->execute([$eleve_id]);
$notes_code = $stmt_code->fetchAll(PDO::FETCH_ASSOC);

$stmt_simu = $pdo->prepare("SELECT ID_S_Examen AS ID, Date, Numero_Examen, Impression FROM Resultat_Examen_Simu WHERE Eleve_ID = ?");
$stmt_simu->execute([$eleve_id]);
$notes_simu = $stmt_simu->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "examen_code" => $notes_code,
    "examen_simu" => $notes_simu
]);
?>
