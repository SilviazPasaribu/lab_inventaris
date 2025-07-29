<?php
header("Access-Control-Allow-Origin: *"); // Bisa diganti * dengan domain spesifik
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'db.php';

// Simpan gambar
$foto = '';
if (isset($_FILES['foto'])) {
    $target_dir = "uploads/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
   $filename = uniqid() . "_" . basename($_FILES["foto"]["name"]);
$target_file = $target_dir . $filename;
if (move_uploaded_file($_FILES["foto"]["tmp_name"], $target_file)) {
    $foto = $filename; // ✅ hanya simpan "68693c7e1b66e_laptop.webp"
}

}

// Ambil data lainnya
$nama = $_POST['nama_barang'];
$kode = $_POST['kode_barang'];
$jumlah = $_POST['jumlah'];
$kondisi = $_POST['kondisi'];
$lokasi = $_POST['lokasi'];
$tanggal = $_POST['tanggal_masuk'];

$stmt = $conn->prepare("INSERT INTO inventaris (nama_barang, kode_barang, jumlah, kondisi, lokasi, tanggal_masuk, foto) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssissss", $nama, $kode, $jumlah, $kondisi, $lokasi, $tanggal, $foto);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
