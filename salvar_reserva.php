<?php
include 'conexao.php';

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Checar conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Obter dados do formulário
$data_checkin = $_POST['checkInDate'];
$data_checkout = $_POST['checkOutDate'];
$apartamentos = isset($_POST['roomType']) ? $_POST['roomType'] : array(); // Recebe um array de apartamentos selecionados

// Depurar os dados do formulário
var_dump($data_checkin);
var_dump($data_checkout);
var_dump($apartamentos);

// Percorre os apartamentos selecionados e insere uma reserva para cada um
foreach($apartamentos as $tipo_apartamento) {
    // Verificar se já existe uma reserva para o mesmo apartamento e período de tempo
    $sql = "SELECT * FROM reservas WHERE tipo_apartamento = '$tipo_apartamento' AND 
            ((data_checkin BETWEEN '$data_checkin' AND '$data_checkout') OR 
            (data_checkout BETWEEN '$data_checkin' AND '$data_checkout'))";

    // Depurar a consulta SQL
    var_dump($sql);

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Já existe uma reserva para o mesmo apartamento e período de tempo
        echo json_encode(['success' => false, 'message' => 'O apartamento '.$tipo_apartamento.' já está reservado para o período selecionado.']);
    } else {
        // Não há reserva conflitante, inserir a nova reserva no banco de dados
        $sql_insert = "INSERT INTO reservas (data_checkin, data_checkout, tipo_apartamento) VALUES ('$data_checkin', '$data_checkout', '$tipo_apartamento')";
        // Depurar a consulta de inserção
        var_dump($sql_insert);

        if ($conn->query($sql_insert) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Reserva realizada com sucesso para o apartamento '.$tipo_apartamento.'.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Erro ao processar a reserva para o apartamento '.$tipo_apartamento.'.']);
        }
    }
}

$conn->close();
?>
