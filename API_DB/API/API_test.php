<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

// Connexion à MySQL avec PDO
$host = "mysql-test888.alwaysdata.net";
$dbname = "test888_easytodrive_db";
$user = "test888";
$password = "wxcvbn.1963"; // Remplace par ton vrai mot de passe

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "❌ Erreur de connexion : " . $e->getMessage()]);
    exit;
}

// Vérifier la méthode HTTP
$method = $_SERVER["REQUEST_METHOD"];
$input = json_decode(file_get_contents("php://input"), true);

// Vérifier si une ressource est demandée (ex: ?route=eleves)
$route = isset($_GET["route"]) ? $_GET["route"] : null;

// Associer les routes aux tables MySQL
$allowed_routes = [
    "autoecoles" => "AutoEcole",
    "eleves" => "Eleves",
    "avis" => "Avis",
    "examen_code" => "RECode",
    "examen_simulation" => "RESimu"
];

if (!$route || !array_key_exists($route, $allowed_routes)) {
    echo json_encode(["error" => "Ressource invalide"]);
    exit;
}

$table = $allowed_routes[$route];

// Traiter les requêtes
switch ($method) {
    case "GET":
        getData($pdo, $table);
        break;

    case "POST":
        addData($pdo, $table, $input);
        break;

    case "PUT":
        updateData($pdo, $table, $input);
        break;

    case "DELETE":
        deleteData($pdo, $table, $input);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée"]);
}

// ---------------- FONCTIONS ----------------

// Fonction GET : Récupérer les données
function getData($pdo, $table) {
    $id = isset($_GET["id"]) && is_numeric($_GET["id"]) ? $_GET["id"] : null;
    $sql = $id ? "SELECT * FROM $table WHERE ID = ?" : "SELECT * FROM $table";
    $stmt = $pdo->prepare($sql);
    if ($id) {
        $stmt->execute([$id]);
    } else {
        $stmt->execute();
    }
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

// Fonction POST : Ajouter des données
function addData($pdo, $table, $input) {
    if (!$input) {
        http_response_code(400);
        echo json_encode(["error" => "Données manquantes"]);
        return;
    }
    
    $columns = implode(", ", array_keys($input));
    $values = implode(", ", array_fill(0, count($input), "?"));
    $sql = "INSERT INTO $table ($columns) VALUES ($values)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array_values($input));

    echo json_encode(["message" => "Données insérées"]);
}

// Fonction PUT : Modifier des données
function updateData($pdo, $table, $input) {
    if (!isset($input["ID"])) {
        http_response_code(400);
        echo json_encode(["error" => "ID manquant"]);
        return;
    }

    $id = $input["ID"];
    unset($input["ID"]);

    $columns = implode(" = ?, ", array_keys($input)) . " = ?";
    $sql = "UPDATE $table SET $columns WHERE ID = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute(array_merge(array_values($input), [$id]));

    echo json_encode(["message" => "Données mises à jour"]);
}

// Fonction DELETE : Supprimer des données
function deleteData($pdo, $table, $input) {
    if (!isset($input["ID"])) {
        http_response_code(400);
        echo json_encode(["error" => "ID manquant"]);
        return;
    }

    $sql = "DELETE FROM $table WHERE ID = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$input["ID"]]);

    echo json_encode(["message" => "Données supprimées"]);
}
?>
