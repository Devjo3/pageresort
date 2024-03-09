<?php
$servername = "localhost";
$username = "u850203140_belavista";
$password = "Bela2024$";
$dbname = "u850203140_bela_vista";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
  die("Conexão falhou: " . $conn->connect_error);
}
?>
