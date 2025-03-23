<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Gérer la requête préflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once("db.php"); // Connexion PDO

// Lire et décoder les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['id']) &&
    isset($data['Date']) &&
    isset($data['Numero_Examen']) &&
    isset($data['Impression'])
) {
    $id = intval($data['id']);
    $date = $data['Date'];
    $numero = $data['Numero_Examen'];
    $impression = $data['Impression'];

    try {
        $stmt = $pdo->prepare("UPDATE Resultat_Examen_Simu SET Date = ?, Numero_Examen = ?, Impression = ? WHERE ID_S_Examen = ?");
        if ($stmt->execute([$date, $numero, $impression, $id])) {
            echo json_encode(["success" => true, "message" => "Impression mise à jour avec succès."]);
        } else {
            echo json_encode(["success" => false, "error" => "Erreur lors de la mise à jour."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => "Erreur PDO : " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Champs requis manquants."]);
}
?>
