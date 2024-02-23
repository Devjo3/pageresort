<?php
// Conexão com o banco de dados (substitua as credenciais conforme necessário)

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bela_vista";

// Cria conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Recebe os dados do formulário
$nome = $_POST['nome'];
$telefone = $_POST['telefone'];
$email = $_POST['email'];
$endereco = $_POST['endereco'];
$cidade = $_POST['cidade'];
$estado = $_POST['estado'];
$senha = $_POST['senha']; // Recebendo a senha do formulário

// Criptografando a senha
$password_hash = password_hash($senha, PASSWORD_DEFAULT);

// Insere os dados na tabela
$sql = "INSERT INTO cliente (nome, telefone, email, endereco, cidade, estado, password_hash)
VALUES ('$nome', '$telefone', '$email', '$endereco', '$cidade', '$estado', '$password_hash')";

if ($conn->query($sql) === TRUE) {
    echo "Registro realizado com sucesso!";
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}

// Fecha a conexão
$conn->close();
?>
