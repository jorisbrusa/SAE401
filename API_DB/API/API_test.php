<?php
$DATABASE_URL = getenv('DATABASE_URL'); // Récupérer l'URL depuis les variables d'environnement

if (!$DATABASE_URL) {
    die("Erreur : la variable d'environnement DATABASE_URL n'est pas définie.");
}

// Découper l'URL pour extraire les infos de connexion
$database = parse_url($DATABASE_URL);
$host = $database["host"];
$port = $database["port"]; // Port PostgreSQL
$dbname = ltrim($database["path"], "/");
$user = $database["user"];
$password = $database["pass"];

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    echo "Connexion réussie à la base de données !";
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}


$method = $_SERVER["REQUEST_METHOD"]; // GET, POST, PUT, DELETE
$input = json_decode(file_get_contents("php://input"), true);

switch ($method) { // Traiter les requêtes
    case "GET": // Récupérer les données
        if (isset($_GET["route"])) { // Récupérer les données d'une table
            $route = $_GET["route"]; // Table
            $id = isset($_GET["id"]) && is_numeric($_GET["id"]) ? $_GET["id"] : null; // paramètre ID si présent
            
            $allowed_routes = [ // Routes autorisées
                "autoecoles" => "AutoEcole",
                "eleves" => "Eleves",
                "avis" => "Avis",
                "examen_code" => "RECode",
                "examen_simulation" => "RESimu"
            ];
            
            if (array_key_exists($route, $allowed_routes)) { // Vérifier si la route est autorisée
                $table = $allowed_routes[$route]; // Table correspondante
                $sql = $id ? "SELECT * FROM $table WHERE ID = ?" : "SELECT * FROM $table"; // Requête SQL
                $stmt = $pdo->prepare($sql); // Préparer la requête
                $stmt->execute($id ? [$id] : []); // Exécuter la requête
                echo json_encode($stmt->fetchAll()); // Renvoyer les données en json
            } else {
                echo json_encode(["error" => "Route invalide"]); // Route non autorisée (ou inexistante)
            }
        }
        break;
    
    case "POST": // Insérer des données
        if (isset($input["route"])) { // Vérifier si la route est définie
            $route = $input["route"]; // Table
            $allowed_routes = [ // Routes autorisées (donc POST uniquement sur les 3 tables suivantes)
                "eleves" => "Eleves", // Route => Table
                "examen_code" => "RECode", // Route => Table
                "examen_simulation" => "RESimu" // Route => Table
            ];
            
            if (array_key_exists($route, $allowed_routes)) { // Vérifier si la route est autorisée
                $table = $allowed_routes[$route];
                
                $columns = array_keys($input); // Colonnes
                $columns = array_diff($columns, ["route"]); // Exclure 'route'
                $placeholders = implode(", ", array_fill(0, count($columns), "?")); // Paramètres
                $columnNames = implode(", ", $columns); // Noms des colonnes
                
                $sql = "INSERT INTO $table ($columnNames) VALUES ($placeholders)"; // Requête SQL
                $stmt = $pdo->prepare($sql); // Préparer la requête
                
                $values = array_map(fn($col) => $input[$col], $columns); // Valeurs
                
                if ($stmt->execute($values)) { // si la requête s'exécute avec succès
                    echo json_encode(["success" => "Donnée insérée dans $table"]); // Renvoyer un message de succès
                } else {
                    echo json_encode(["error" => "Erreur lors de l'insertion"]); // sinon renvoyer un message d'erreur
                }
            } else {
                echo json_encode(["error" => "Table non autorisée"]);
            }
        }
        break;
    
    case "PUT": // modifier des données
        if (isset($input["route"]) && $input["route"] === "eleves" && isset($input["ID"])) { // Vérifier si la route est définie et si c'est la table 'eleves'
            $stmt = $pdo->prepare("UPDATE Eleves SET Prenom = ?, Nom = ? WHERE ID = ?"); // Requête SQL
            if ($stmt->execute([$input["Prenom"], $input["Nom"], $input["ID"]])) { // si la requête s'exécute avec succès
                echo json_encode(["success" => "Élève mis à jour"]); // Renvoyer un message de succès
            } else {
                echo json_encode(["error" => "Erreur lors de la mise à jour"]); // sinon renvoyer un message d'erreur
            }
        }
        break;
    
    case "DELETE":
        if (isset($input["route"]) && $input["route"] === "eleves" && isset($input["ID"])) { // Vérifier si la route est définie et si c'est la table 'eleves'
            $stmt = $pdo->prepare("DELETE FROM Eleves WHERE ID = ?");
            if ($stmt->execute([$input["ID"]])) {
                echo json_encode(["success" => "Élève supprimé"]);
            } else {
                echo json_encode(["error" => "Erreur lors de la suppression"]);
            }
        }

        if (isset($input["route"]) && $input["route"] === "avis" && isset($input["ID"])) { // Vérifier si la route est définie et si c'est la table 'avis'
            $stmt = $pdo->prepare("DELETE FROM Avis WHERE ID = ?");
            if ($stmt->execute([$input["ID"]])) {
                echo json_encode(["success" => "Avis supprimé"]);
            } else {
                echo json_encode(["error" => "Erreur lors de la suppression"]);
            }
        }

        if (isset($input["route"]) && $input["route"] === "examen_code" && isset($input["ID"])) { // Vérifier si la route est définie et si c'est la table 'examen_code'
            $stmt = $pdo->prepare("DELETE FROM RECode WHERE ID = ?");
            if ($stmt->execute([$input["ID"]])) {
                echo json_encode(["success" => "Examen de code supprimé"]);
            } else {
                echo json_encode(["error" => "Erreur lors de la suppression"]);
            }
        }

        if (isset($input["route"]) && $input["route"] === "examen_simulation" && isset($input["ID"])) { // Vérifier si la route est définie et si c'est la table 'examen_simulation'
            $stmt = $pdo->prepare("DELETE FROM RESimu WHERE ID = ?");
            if ($stmt->execute([$input["ID"]])) {
                echo json_encode(["success" => "Examen de simulation supprimé"]);
            } else {
                echo json_encode(["error" => "Erreur lors de la suppression"]);
            }
        }

        if (isset($input["route"]) && $input["route"] === "autoecoles" && isset($input["ID"])) { // Vérifier si la route est définie et si c'est la table 'autoecoles'
            $stmt = $pdo->prepare("DELETE FROM AutoEcole WHERE ID = ?");
            if ($stmt->execute([$input["ID"]])) {
                echo json_encode(["success" => "Auto-école supprimée"]);
            } else {
                echo json_encode(["error" => "Erreur lors de la suppression"]);
            }
        }

        break;
    
    default:
        echo json_encode(["error" => "Méthode non supportée"]);
}
?>
