<?php

include '../config.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Only POST method allowed"]);
    exit;
}

// JSONi decodemine
$input = json_decode(file_get_contents("php://input"), true);
$username = trim($input["username"] ?? "");

if (empty($username)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Username is required"]);
    exit;
}

$data = [
    "name" => null,
    "orders" => []
];

// Tellimuste pärimine
$sql_orders = "SELECT * FROM orders WHERE CustID = ?";
$stmt_orders = $link->prepare($sql_orders);
$stmt_orders->bind_param("s", $username);
$stmt_orders->execute();
$result_orders = $stmt_orders->get_result();

while ($row = $result_orders->fetch_assoc()) {
    $data["orders"][] = $row;
}
$stmt_orders->close();

// Kliendi nime pärimine
$sql_name = "SELECT Name FROM customers WHERE CustID = ?";
$stmt_name = $link->prepare($sql_name);
$stmt_name->bind_param("s", $username);
$stmt_name->execute();
$result_name = $stmt_name->get_result();

if ($row = $result_name->fetch_assoc()) {
    $data["name"] = $row["Name"];
}
$stmt_name->close();

echo json_encode($data);

$link->close();
