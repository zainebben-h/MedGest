<?php
include 'config.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

if ($method === 'POST' && isset($data['action'])) {
    
    // LOGIN
    if ($data['action'] === 'login') {
        $email = $data['email'];
        $password = $data['password'];
        
        $stmt = $conn->prepare("SELECT * FROM utilisateurs WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        
        if ($user && password_verify($password, $user['password'])) {
            echo json_encode([
                'success' => true,
                'token' => base64_encode($user['id'] . ':' . $user['role']),
                'user' => [
                    'id' => $user['id'],
                    'nom' => $user['nom'],
                    'email' => $user['email'],
                    'role' => $user['role']
                ]
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Email ou mot de passe incorrect']);
        }
    }
    
    // REGISTER
    elseif ($data['action'] === 'register') {
        $nom = $data['nom'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT);
        $role = $data['role'];
        
        $stmt = $conn->prepare("INSERT INTO utilisateurs (nom, email, password, role) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $nom, $email, $password, $role);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'id' => $conn->insert_id]);
        } else {
            echo json_encode(['success' => false, 'message' => $stmt->error]);
        }
    }
}
?>