<?php
include 'config.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM salles");
    $salles = [];
    while ($row = $result->fetch_assoc()) {
        $salles[] = $row;
    }
    echo json_encode($salles);
}

elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $nom = $data['nom'];
    $type = $data['type'];
    $capacite = $data['capacite'];
    
    $stmt = $conn->prepare("INSERT INTO salles (nom, type, capacite) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $nom, $type, $capacite);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'id' => $conn->insert_id]);
    } else {
        echo json_encode(['success' => false, 'message' => $stmt->error]);
    }
}
?>