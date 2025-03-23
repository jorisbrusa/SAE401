<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access, Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");

require_once("db.php"); // ici, on attend un $pdo (pas $conn)

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $id = intval($data['id']);

    try {
        $stmt = $pdo->prepare("DELETE FROM Resultat_Examen_Code WHERE ID_C_Examen = ?");
        if ($stmt->execute([$id])) {
            echo json_encode(["success" => true, "message" => "Note supprimée avec succès."]);
        } else {
            echo json_encode(["success" => false, "error" => "Erreur lors de la suppression."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => "Erreur PDO: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID manquant."]);
}
?>
