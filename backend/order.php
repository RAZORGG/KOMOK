<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM orders");
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
        break;
    case 'POST':
        $nama = $input['nama'];
        $menu = $input['menu'];
        $jumlah = $input['jumlah'];
        $sql = "INSERT INTO orders (nama, menu, jumlah) VALUES ('$nama', '$menu', '$jumlah')";
        if ($conn->query($sql)) {
            echo json_encode(["message" => "Order ditambah"]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Gagal tambah order"]);
        }
        break;
    case 'PUT':
        $id = $input['id'];
        $nama = $input['nama'];
        $menu = $input['menu'];
        $jumlah = $input['jumlah'];
        $sql = "UPDATE orders SET nama='$nama', menu='$menu', jumlah='$jumlah' WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(["message" => "Order diupdate"]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Gagal update order"]);
        }
        break;
    case 'DELETE':
        $id = $input['id'];
        $sql = "DELETE FROM orders WHERE id=$id";
        if ($conn->query($sql)) {
            echo json_encode(["message" => "Order dihapus"]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Gagal hapus order"]);
        }
        break;
}
?>
