function plantilla(provincia) {
    let resultado = `
    <div class="provincia">
        <h1>${provincia.id==94}</h1>
        <p>
            Latitud: ${provincia.centroide.lat}<br>
            Longitud: ${provincia.centroide.lon}
        </p>
    </div>
    `;
    return resultado;
}


const apiProvincias = 'https://apis.datos.gob.ar/georef/api/provincias';

fetch(apiProvincias)
.then(res => res.json())
.then(data => {
    data.provincias.forEach(element => {
        provincias.innerHTML += plantilla(element);
        console.log(element);
    });
});
