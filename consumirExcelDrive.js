const CONVERTIR_RAW = true;
const CONVERTIR_FECHA = true;

/**
 * Consume un excel de google drive para poder obtener la informacion
 * @param {String} fileId del excel creado en google Drive
 * @returns la informacion del excel en formato json
 */
async function consumirExcelDrive(fileId) {
    const url = `https://docs.google.com/spreadsheets/d/${fileId}/export?format=xlsx`;
    try {
        const respuesta = await fetch(url);
        manejarErrorRespuesta(respuesta);
        const json = await procesarExcelRawAJson(respuesta);
        return json;

    } catch (error) {
        mostrarErrorConsumirExcel(error);
    }
}

async function procesarExcelRawAJson(respuesta) {
    const infoRawArchivo = await respuesta.arrayBuffer();
    const excelInfo = obtenerInfoExcel(infoRawArchivo);
    const numeroHoja = excelInfo.SheetNames[0];
    const infoHojaRaw = excelInfo.Sheets[numeroHoja];
    return obtenerJsonDe(infoHojaRaw);
}
function mostrarErrorConsumirExcel(error) {
    console.error(
        'Error fetching or processing file:',
        error
    );
}
function obtenerJsonDe(infoHojaRaw) {
    return XLSX.utils.sheet_to_json(infoHojaRaw, {
        raw: CONVERTIR_RAW
    });
}
function obtenerInfoExcel(infoArchivo) {
    return XLSX.read(infoArchivo, {
        type: "array",
        cellDates: CONVERTIR_FECHA,
        raw: true
    });
}
function manejarErrorRespuesta(respuesta) {
    if (!respuesta.ok) {
        throw new Error('Fallo en la respuesta');
    }
}


export  {
    consumirExcelDrive
}