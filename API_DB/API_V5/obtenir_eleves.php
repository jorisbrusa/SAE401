<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

require_once 'db.php';

try {
    if (isset($_GET["id"])) {
        $id = $_GET["id"];
        $stmt = $pdo->prepare("
            SELECT ID, NEPH_Email, Prenom, Nom, Auto_Ecole, Jour_inscription, code
            FROM Eleves
            WHERE ID = ?
        ");
        $stmt->execute([$id]);
    } else {
        $stmt = $pdo->query("
            SELECT ID, NEPH_Email, Prenom, Nom, Auto_Ecole, Jour_inscription, code
            FROM Eleves
        ");
    }

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (Exception $e) {
    echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
}
?>
