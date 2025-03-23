<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    http_response_code(200);
    exit();
}


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

include 'db.php';


// Récupération du JSON envoyé
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->Eleve_ID) &&
    isset($data->Contenu) &&
    isset($data->Date)
) {
    $eleveID = $data->Eleve_ID;
    $contenu = $data->Contenu;
    $date = $data->Date;

    try {
        $query = "INSERT INTO Avis (Eleve_ID, Contenu, Date) VALUES (:eleveID, :contenu, :date)";
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(':eleveID', $eleveID, PDO::PARAM_INT);
        $stmt->bindParam(':contenu', $contenu, PDO::PARAM_STR);
        $stmt->bindParam(':date', $date, PDO::PARAM_STR);

        $stmt->execute();

        echo json_encode(["message" => "Avis ajouté avec succès"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur lors de l'insertion : " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Champs requis manquants"]);
}
