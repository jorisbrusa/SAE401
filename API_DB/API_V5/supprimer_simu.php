<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Gérer la requête préliminaire OPTIONS (préflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclure la connexion PDO à la BDD
require_once("db.php");

// Récupérer les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $id = intval($data['id']);

    try {
        $stmt = $pdo->prepare("DELETE FROM Resultat_Examen_Simu WHERE ID_S_Examen = ?");
        if ($stmt->execute([$id])) {
            echo json_encode(["success" => true, "message" => "Impression supprimée avec succès."]);
        } else {
            echo json_encode(["success" => false, "error" => "Erreur lors de la suppression."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => "Erreur PDO : " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant."]);
}
?>
