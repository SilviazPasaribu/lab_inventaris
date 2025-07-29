<?php
header("Access-Control-Allow-Origin: *"); // Bisa diganti * dengan domain spesifik
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$stmt = $conn->prepare("DELETE FROM inventaris WHERE kode_barang=?");
$stmt->bind_param("s", $data['kode_barang']);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Berhasil hapus"]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal hapus"]);
}
?>