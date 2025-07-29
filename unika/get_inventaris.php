<?php
header("Access-Control-Allow-Origin: *"); // Bisa diganti * dengan domain spesifik
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'db.php';
$result = $conn->query("SELECT * FROM inventaris ORDER BY id DESC");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}
echo json_encode(["success" => true, "data" => $data]);
?>