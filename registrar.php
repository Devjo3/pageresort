<?php
// Conexão com o banco de dados (substitua as credenciais conforme necessário)
$servername = "localhost";
$username = "u850203140_belavista";
$password = "Bela2024$";
$dbname = "u850203140_bela_vista";

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
$documento = $_POST['documento']; // Recebendo o número de documento do formulário

// Verifica se o email já existe na tabela
$sql_check_email = "SELECT * FROM cliente WHERE email = '$email'";
$result_check_email = $conn->query($sql_check_email);

// Verifica se o documento já existe na tabela
$sql_check_documento = "SELECT * FROM cliente WHERE documento = '$documento'";
$result_check_documento = $conn->query($sql_check_documento);

if ($result_check_email->num_rows > 0) {
    // Se o email já existe, define a mensagem de erro
    $message = "Erro: Este email já está cadastrado.";
} elseif ($result_check_documento->num_rows > 0) {
    // Se o documento já existe, define a mensagem de erro
    $message = "Erro: Já existe um cliente cadastrado com este número de documento.";
} else {
    // Se o email e documento não existem, criptografa a senha e insere os dados na tabela
    $password_hash = password_hash($senha, PASSWORD_DEFAULT);

    $sql = "INSERT INTO cliente (nome, telefone, email, endereco, cidade, estado, password_hash, documento)
    VALUES ('$nome', '$telefone', '$email', '$endereco', '$cidade', '$estado', '$password_hash', '$documento')";

    if ($conn->query($sql) === TRUE) {
        // Se o registro for bem-sucedido, define a mensagem de sucesso
        $message = "Registro realizado com sucesso!";
        
        // Envio de email de confirmação
        $to = $email;
        $subject = "Confirmação de Cadastro";
        $message = "Olá $nome,\n\nObrigado por se cadastrar em nosso site. Seu registro foi realizado com sucesso.";
        $headers = "From: belavistahomeresort@outlook.com" . "\r\n" .
                   "Reply-To: belavistahomeresort@outlook.com" . "\r\n" .
                   "X-Mailer: PHP/" . phpversion();

        mail($to, $subject, $message, $headers);
    } else {
        // Se houver um erro durante a inserção, define a mensagem de erro com detalhes
        $message = "Erro: " . $sql . "<br>" . $conn->error;
    }
}

// Fecha a conexão
$conn->close();

// Retorna a mensagem como uma resposta AJAX
echo $message;
?>
