<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input["Eleve_ID"], $input["Numero_Examen"], $input["Date"])) {
    echo json_encode(["error" => "Données incomplètes"]);
    exit;
}

$eleve_id = $input["Eleve_ID"];
$numero_examen = $input["Numero_Examen"];
$date = $input["Date"];

if (isset($input["Note"])) {
    // Ajout d'une note pour un examen de code
    $note = $input["Note"];
    $stmt = $pdo->prepare("INSERT INTO Resultat_Examen_Code (Eleve_ID, Numero_Examen, Note, Date) VALUES (?, ?, ?, ?)");
    $stmt->execute([$eleve_id, $numero_examen, $note, $date]);
    echo json_encode(["success" => "Note d'examen de code ajoutée avec succès"]);
} elseif (isset($input["Impression"])) {
    // Ajout d'une impression pour un examen de simulation
    $impression = $input["Impression"];
    $stmt = $pdo->prepare("INSERT INTO Resultat_Examen_Simu (Eleve_ID, Numero_Examen, Impression, Date) VALUES (?, ?, ?, ?)");
    $stmt->execute([$eleve_id, $numero_examen, $impression, $date]);
    echo json_encode(["success" => "Impression d'examen de simulation ajoutée avec succès"]);
} else {
    echo json_encode(["error" => "Aucune donnée valide à ajouter"]);
}
