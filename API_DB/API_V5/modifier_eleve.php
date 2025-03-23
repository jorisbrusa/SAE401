<?php
// En-têtes pour le CORS et JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php'; // Connexion à la BDD via PDO

// Lire le corps de la requête
$data = json_decode(file_get_contents("php://input"));

// Vérifier que l'ID est présent
if (!isset($data->ID)) {
    echo json_encode(["error" => "ID manquant"]);
    exit();
}

// Sécuriser les données reçues
$ID = $data->ID;
$NEPH_Email = $data->NEPH_Email ?? '';
$Prenom = $data->Prenom ?? '';
$Nom = $data->Nom ?? '';
$Auto_Ecole = $data->Auto_Ecole ?? '';
$Jour_inscription = $data->Jour_inscription ?? '';
$code = $data->code ?? '';

// Requête SQL
try {
    $sql = "UPDATE Eleves 
            SET NEPH_Email = :email,
                Prenom = :prenom,
                Nom = :nom,
                Auto_Ecole = :auto_ecole,
                Jour_inscription = :jour,
                code = :code
            WHERE ID = :id";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':email', $NEPH_Email);
    $stmt->bindParam(':prenom', $Prenom);
    $stmt->bindParam(':nom', $Nom);
    $stmt->bindParam(':auto_ecole', $Auto_Ecole);
    $stmt->bindParam(':jour', $Jour_inscription);
    $stmt->bindParam(':code', $code);
    $stmt->bindParam(':id', $ID);

    $stmt->execute();

    echo json_encode(["message" => "Élève mis à jour avec succès"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la mise à jour : " . $e->getMessage()]);
}
