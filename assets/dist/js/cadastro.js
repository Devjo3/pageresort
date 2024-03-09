document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "registrar.php", true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        if (xhr.responseText == "Registro realizado com sucesso!") {
          document.getElementById("popup").style.display = "block";
          setTimeout(function () {
            document.getElementById("popup").style.display = "none";
          }, 3000);
        } else {
          alert(xhr.responseText);
        }
      }
    };
    xhr.send(formData);
  });
});
