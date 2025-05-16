const queryString = window.location.search;
const parametrosUrl = new URLSearchParams(queryString);
const usuario = parametrosUrl.get("usuarioTwitch");
const mostrarVistas = obtenerBooleanos("mostrarVistas", true);
const mostrarSubs = obtenerBooleanos("mostrarSubs", true);
const mostrarSeguidores = obtenerBooleanos("mostrarSeguidores", true);
const tamanoFuente = parametrosUrl.get("tamañoFuente") || "40";
const widgetColor = parametrosUrl.get("widgetColor") || "#FFFFFF";
const mostrarSombra = obtenerBooleanos("mostrarSombra", true);
const sombraColor = parametrosUrl.get("sombraColor") || "#000000";

const main_container = document.getElementById("main-container");
main_container.style.fontSize = `${tamanoFuente}px`;
main_container.style.color = widgetColor;


const hexToRgb = (hex) => {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

const {r, g, b} = hexToRgb(sombraColor);
if(mostrarSombra){
    main_container.style.textShadow = `rgb(${r}, ${g}, ${b},) 2px 2px 4px`;
}else{
    main_container.style.textShadow = `rgb(${r}, ${g}, ${b},) 0px 0px 0px`;

}

const metricasVistas = document.getElementById("metricas-vistas");
const metricasSubs = document.getElementById("metricas-subs");
const metricasSeguidores = document.getElementById("metricas-seguidores");

if(!mostrarVistas){
    metricasVistas.style.display = "none";
}

if(!mostrarSubs){
    metricasSubs.style.display = "none";
}

if(!mostrarSeguidores){
    metricasSeguidores.style.display = "none";
}

async function obtenerVistas() {
    const response = await fetch(`https://decapi.me/twitch/viewercount/${usuario}`);
    const vistas = await response.text();
    
    return isNaN(Number(vistas)) ? 0 :  Number(vistas);
}

async function obtenerSubs(){
    const response = await fetch(`https://decapi.me/twitch/subcount/${usuario}`);
    const subs = await response.text();

    return isNaN(Number(subs)) ? 0 :  Number(subs);
}

async function obtenerSeguidores(){
    const response = await fetch(`https://decapi.me/twitch/followcount/${usuario}`);
    const seguidores = await response.text();

    return isNaN(Number(seguidores)) ? 0 :  Number(seguidores);
}

async function actualizarMetricas() {
    document.getElementById("vistas").innerHTML = await obtenerVistas();
    document.getElementById("subs").innerHTML = await obtenerSubs();
    document.getElementById("seguidores").innerHTML = await obtenerSeguidores();

    setTimeout(actualizarMetricas, 15000);
}

actualizarMetricas();

//https://decapi.me/auth/twitch?redirect=subcount&scopes=channel:read:subscriptions+user:read:email

//HELPERS//

function obtenerBooleanos(parametro, valor){
    const urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams);

    const valorParametro = urlParams.get(parametro);

    if(valorParametro === null){
        return valor;
    }

    if(valorParametro === 'true'){
        return true;
    }else if(valorParametro === 'false'){
        return false;
    }else{
        return valor;
    }
}