import { consumirExcelDrive } from "./consumirExcelDrive.js";

const ID_EXCEL = "18ru9f51UOUWRA3plW9GXlo8CupA0_DDuJKZn-H8vh6k";

document.addEventListener("DOMContentLoaded", async () => {

    const infoExcel = await consumirExcelDrive(ID_EXCEL);

    mostrarRecitales(infoExcel);

});

function mostrarRecitales(datos){

    const contenedor = document.querySelector(".productos");

    contenedor.innerHTML = "";

    datos.forEach(recital => {

        contenedor.innerHTML += `
            <div class="col-lg-4 col-md-6">

    <div class="card h-100">

        <div class="card-header">

            <h4 class="card-title">
                🎸 ${recital["nombre de la banda"]}
            </h4>

        </div>

        <div class="card-body">

            <p>📅 <strong>${recital["fecha"].toLocaleDateString()}</strong></p>

            <p>📍 ${recital["lugar/ciudad"]}</p>

            <p class="precio">
                💵 $${Number(recital["costo de la entrada"]).toLocaleString("es-AR")}
            </p>

            <p class="estrellas">
                ${"⭐".repeat(recital["puntaje"])}
            </p>

        </div>

        <div class="card-footer">

            <span class="badge ${
                recital["recomendas?"]=="Si"
                ? "bg-success"
                : "bg-danger"
            }">

                ${recital["recomendas?"]=="Si"
                ? "✔ Recomendado"
                : "✖ No recomendado"}

            </span>

        </div>

    </div>

</div>
        `;

    });

}
let recitales = [];

document.addEventListener("DOMContentLoaded", async () => {

    recitales = await consumirExcelDrive(ID_EXCEL);

    mostrarRecitales(recitales);

});
function mostrarEstadisticas(datos){

    // Cantidad de recitales
    document.getElementById("cantRecitales").textContent = datos.length;

    // Total gastado
    const total = datos.reduce((suma, recital) => {

        return suma + Number(recital["costo de la entrada"]);

    },0);

    document.getElementById("totalGastado").textContent =
        "$" + total.toLocaleString("es-AR");

    // Puntaje promedio
    const promedio = datos.reduce((suma, recital)=>{

        return suma + Number(recital["puntaje"]);

    },0) / datos.length;

    document.getElementById("puntajePromedio").textContent =
        promedio.toFixed(1);

    // Recomendados
    const recomendados = datos.filter(recital =>

        recital["recomendas?"] === "Si"

    ).length;

    document.getElementById("cantRecomendados").textContent =
        recomendados;

}
const btnEstadisticas = document.getElementById("btnEstadisticas");
const btnInicio = document.getElementById("btnInicio");

btnEstadisticas.addEventListener("click",(e)=>{

    e.preventDefault();

    document.getElementById("seccionRecitales").classList.add("d-none");

    document.getElementById("seccionEstadisticas").classList.remove("d-none");

    mostrarEstadisticas(recitales);

});

btnInicio.addEventListener("click",(e)=>{

    e.preventDefault();

    document.getElementById("seccionRecitales").classList.remove("d-none");

    document.getElementById("seccionEstadisticas").classList.add("d-none");

});