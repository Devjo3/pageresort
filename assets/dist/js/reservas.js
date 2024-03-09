$(document).ready(function(){
    $('#reservationForm').submit(function(event){
        event.preventDefault();
        
        var formData = {
            checkInDate: $('#checkInDate').val(),
            checkOutDate: $('#checkOutDate').val(),
            roomType: $('#roomType').val()
        };

        jQuery.ajax({
            type: 'POST',
            url: 'salvar_reserva.php',
            data: formData,
            dataType: 'json',
            encode: true
        })
        .done(function(data){
            console.log(data);
            if(data.success) {
                alert('Reserva realizada com sucesso!');
            } else {
                alert(data.message);
            }
        })
        .fail(function(data){
            console.log(data);
            alert('Ocorreu um erro ao processar a reserva.');
        });
    });
});

// Função para exibir o popup após o registro ser concluído com sucesso
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        // Evita o envio padrão do formulário
        event.preventDefault();
        
        // Realiza a requisição AJAX para o PHP
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "registrar.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (xhr.responseText == "success") {
                    // Exibe o popup de sucesso
                    document.getElementById("popup").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("popup").style.display = "none";
                    }, 3000); // 3000 milissegundos = 3 segundos
                } else {
                    // Se houver algum erro, exibe o retorno do servidor
                    alert(xhr.responseText);
                }
            }
        };
        xhr.send(new FormData(this));
    });
});
