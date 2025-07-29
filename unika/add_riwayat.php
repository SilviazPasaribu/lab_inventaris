<?php
header("Access-Control-Allow-Origin: *"); // Bisa diganti * dengan domain spesifik
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$stmt = $conn->prepare("INSERT INTO riwayat_barang (
  kode_barang, nama_barang, aktivitas, jumlah, 
  kondisi_awal, kondisi_akhir, lokasi_awal, lokasi_akhir, 
  keterangan
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param("sssisssss",
  $data->kode_barang,
  $data->nama_barang,
  $data->aktivitas,
  $data->jumlah,
  $data->kondisi_awal,
  $data->kondisi_akhir,
  $data->lokasi_awal,
  $data->lokasi_akhir,
  $data->keterangan
);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "error" => $stmt->error]);
}
?>
