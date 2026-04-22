<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Connexion MySQL Railway
$host = 'mysql.railway.internal';
$user = 'root';
$pass = 'EXsKSQKTIEZAfJkHiCQWIzdVpwjqAxBt';
$db   = 'railway';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$conn->set_charset("utf8");
?>