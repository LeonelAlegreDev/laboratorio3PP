import Aereo from "./clases/Aereo.js";
import Terrestre from "./clases/Terrestre.js";

let tabla = document.getElementById("tabla_datos");
let tbody = tabla.querySelector("tbody");

let tipo = document.getElementById("filtro_tipo");
let id = document.getElementById("filtro_id").checked;
let modelo = document.getElementById("filtro_modelo").checked;
let anoFab = document.getElementById("filtro_anoFab").checked;
let velMax = document.getElementById("filtro_velMax").checked;
let altMax = document.getElementById("filtro_altMax").checked;
let autonomia = document.getElementById("filtro_autonomia").checked;
let cantPue = document.getElementById("filtro_cantPue").checked;
let cantRue = document.getElementById("filtro_cantRue").checked;

let veh_aereos = [];
let veh_terrestres = [];
let registros = [];

CargarDatos(veh_aereos, veh_terrestres);
MostrarDatos(tabla, id, modelo, anoFab, velMax, tipo.value, altMax, autonomia, cantPue, cantRue);
ManejarEventos();

function CargarDatos(veh_aereos, veh_terrestres){
    var data = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"Dodge Viper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook", "anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R", "anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989, "velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953, "velMax":174, "altMax":3, "autonomia":870}]';
    data = JSON.parse(data);
    data.forEach(element => {
        const id = element.id;
        const modelo = element.modelo;
        const anoFab = element.anoFab;
        const velMax = element.velMax;

        if(element.altMax !== undefined && element.autonomia !== undefined){
            const altMax = element.altMax;
            const autonomia = element.autonomia;
            const vehiculo = new Aereo(id, modelo, anoFab, velMax, altMax, autonomia);
        
            veh_aereos.push(vehiculo);
        }
        else if(element.cantRue !== undefined && element.cantPue !== undefined){
            const cantRue = element.cantRue;
            const cantPue = element.cantPue;
            const vehiculo = new Terrestre(id, modelo, anoFab, velMax, cantPue, cantRue);
        
            veh_terrestres.push(vehiculo);
        }
        else{
            console.log("Error al convertir datos.");
        }
    });
}

function MostrarDatos(tabla, id, modelo, anoFab, velMax, tipo, altMax, autonomia, cantPue, cantRue){
    tbody.innerHTML = "";
    registros = [];

    switch (tipo) {
        case "todos":
            veh_aereos.forEach(element => {
                let registro = {
                    id: element.id,
                    modelo: element.modelo,
                    anoFab: element.anoFab,
                    velMax: element.velMax,
                    altMax: element.altMax,
                    autonomia: element.autonomia,
                    cantPue: "N/A",
                    cantRue: "N/A"
                }
                registros.push(registro);
            });
            veh_terrestres.forEach(element => {
                let registro = {
                    id: element.id,
                    modelo: element.modelo,
                    anoFab: element.anoFab,
                    velMax: element.velMax,
                    altMax: "N/A",
                    autonomia: "N/A",
                    cantPue: element.cantPue,
                    cantRue: element.cantRue
                }
                registros.push(registro);
            });
            // mostrar tabla todos
            break;
        case "terrestre":
            veh_terrestres.forEach(element => {
                let registro = {
                    id: element.id,
                    modelo: element.modelo,
                    anoFab: element.anoFab,
                    velMax: element.velMax,
                    altMax: "N/A",
                    autonomia: "N/A",
                    cantPue: element.cantPue,
                    cantRue: element.cantRue
                }
                registros.push(registro);
            });
            break;
        case "aereo":
            veh_aereos.forEach(element => {
                let registro = {
                    id: element.id,
                    modelo: element.modelo,
                    anoFab: element.anoFab,
                    velMax: element.velMax,
                    altMax: element.altMax,
                    autonomia: element.autonomia,
                    cantPue: "N/A",
                    cantRue: "N/A"
                }
                registros.push(registro);
            });
            break;
    }

    registros.forEach(element => {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);

        

        for (var propiedad in element) {
            if (element.hasOwnProperty(propiedad)) {
                let td = document.createElement("td");
                tr.appendChild(td);
                td.appendChild(document.createTextNode(element[propiedad]));
                td.setAttribute(propiedad, element[propiedad]);
            }
        }
    });
}

function ManejarEventos(){
    tipo.addEventListener("change", function(){
        MostrarDatos(tabla, id, modelo, anoFab, velMax, tipo.value, altMax, autonomia, cantPue, cantRue);
    });

    document.getElementById("btn_promedio").addEventListener("click", () =>{
        let cant = 0;
        let suma = 0;
        let promedio = 0;

        registros.forEach(element => {
            if(!isNaN(element.velMax)){
                cant++;
                suma = suma + element.velMax;
            }
        });

        promedio = suma / cant;

        document.getElementById("txb_promedio").value = promedio;
    });

    let tr = tbody.querySelectorAll("tr");
    tr.forEach(element => {
        element.addEventListener("dblclick", (tr) => {
            let modal = document.getElementById("modal_abm");
            modal.style.display = "block";
            tabla.style.display = "none";
            document.getElementById("filtros_container").style.display = "none";
        });
    });

    document.getElementById("btn_cancelar").addEventListener("click", () =>{
        let modal = document.getElementById("modal_abm");
        modal.style.display = "none";
        tabla.style.display = "block";
        document.getElementById("filtros_container").style.display = "block";
    });
}


