<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

$result = $conn->query("SELECT kode_barang, nama_barang, lokasi, kondisi, jumlah FROM inventaris");

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(["success" => true, "data" => $data]);
?>
