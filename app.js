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