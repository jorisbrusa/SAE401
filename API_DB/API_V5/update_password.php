<?php
// Connexion à la base de données
$host = "mysql-test888.alwaysdata.net";
$dbname = "test888_easytodrive_db";
$user = "test888";
$password = "wxcvbn.1963";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    die("Erreur de connexion : " . $e->getMessage());
}

// Hasher le mot de passe
$motdepasse = "monmotdepasse";
$hashedPassword = password_hash($motdepasse, PASSWORD_BCRYPT);

// Mettre à jour dans la base de données
$email = "neph1234@example.com";
$stmt = $pdo->prepare("UPDATE Eleves SET code = ? WHERE NEPH_Email = ?");
$stmt->execute([$hashedPassword, $email]);

echo "Mot de passe mis à jour avec succès.";
?>
