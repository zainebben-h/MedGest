<?php
include 'config.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// GET ALL
if ($method === 'GET') {
    $result = $conn->query("
        SELECT m.*, u.nom, u.email 
        FROM medecins m 
        JOIN utilisateurs u ON m.utilisateur_id = u.id
    ");
    $medecins = [];
    while ($row = $result->fetch_assoc()) {
        $medecins[] = $row;
    }
    echo json_encode($medecins);
}

// CREATE
elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Créer utilisateur d'abord
    $nom = $data['nom'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT);
    $role = 'medecin';
    
    $stmt = $conn->prepare("INSERT INTO utilisateurs (nom, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nom, $email, $password, $role);
    $stmt->execute();
    $user_id = $conn->insert_id;
    
    // Créer médecin
    $specialite = $data['specialite'];
    $stmt = $conn->prepare("INSERT INTO medecins (utilisateur_id, specialite) VALUES (?, ?)");
    $stmt->bind_param("is", $user_id, $specialite);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $conn->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => $stmt->error]);
    }
}
?>