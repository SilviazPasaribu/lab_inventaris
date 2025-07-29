<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM admin WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$res = $stmt->get_result();

if ($row = $res->fetch_assoc()) {
    if (password_verify($password, $row['password'])) {
        echo json_encode(["success" => true, "message" => "Login berhasil"]);
    } else {
        echo json_encode(["success" => false, "message" => "Password salah"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Email tidak ditemukan"]);
}
?>