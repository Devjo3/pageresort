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
