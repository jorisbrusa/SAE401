<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Inclusion de la connexion à la BDD
require_once("db.php"); // $pdo doit être défini ici

// Récupérer les données JSON
$data = json_decode(file_get_contents("php://input"), true);

// Compatibilité avec ID ou id
$id = $data["ID"] ?? $data["id"] ?? null;
$date = $data["Date"] ?? null;
$numero = $data["Numero_Examen"] ?? null;
$note = $data["Note"] ?? null;

// Vérification des champs
if (!$id || !$date || !$numero || $note === null) {
    echo json_encode(["success" => false, "error" => "Champs requis manquants"]);
    exit;
}

try {
    // Préparer la requête
    $stmt = $pdo->prepare("UPDATE Resultat_Examen_Code SET Date = ?, Numero_Examen = ?, Note = ? WHERE ID_C_Examen = ?");
    $success = $stmt->execute([$date, $numero, intval($note), intval($id)]);

    if ($success) {
        echo json_encode(["success" => true, "message" => "Note mise à jour avec succès."]);
    } else {
        echo json_encode(["success" => false, "error" => "Échec de la mise à jour dans la base de données."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Erreur PDO: " . $e->getMessage()]);
}
?>
