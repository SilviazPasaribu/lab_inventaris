<?php
header("Access-Control-Allow-Origin: *"); // Bisa diganti * dengan domain spesifik
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';


$query = "SELECT * FROM barang";
$result = mysqli_query($conn, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    // Tambahkan URL gambar penuh
    $row['gambar_url'] = 'http://localhost/unika/uploads/' . $row['gambar'];
    $data[] = $row;
}

echo json_encode(["success" => true, "data" => $data]);
?>
