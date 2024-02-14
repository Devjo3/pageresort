    // Coordenadas de exemplo (substitua por suas próprias coordenadas)
    var coordenadas = [-19.897722,-49.520823];

    // Inicialize o mapa
    var mapa = L.map('mapa').setView(coordenadas, 13);

    // Adicione um provedor de mapas (usando OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapa);

    // Adicione um marcador ao mapa
    L.marker(coordenadas).addTo(mapa)
        .bindPopup('Localização')
        .openPopup();
