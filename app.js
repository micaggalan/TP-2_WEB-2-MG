import { consumirExcelDrive } from "./consumirExcelDrive.js";

const ID_EXCEL = "ID DE EXCEL A COMPLETAR";

document.addEventListener('DOMContentLoaded', async () => {
    const infoExcel = await consumirExcelDrive(ID_EXCEL);
    console.table(infoExcel);
});