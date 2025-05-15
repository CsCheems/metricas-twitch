const queryString = window.location.search;
const parametrosUrl = new URLSearchParams(queryString);
const usuario = parametrosUrl.get("usuario");

async function obtenerVistas() {
    const response = await fetch(`https://decapi.me/twitch/viewercount/${usuario}`);
    const vistas = await response.text();
    
    return isNaN(Number(vistas)) ? 0 :  Number(vistas);
}

async function obtenerSubs(){
    const response = await fetch(`https://decapi.me/twitch/subcount/${usuario}`);
    const subs = await response.text();

    if(subs.includes('decapi.me')){
        return '-';
    }else{
        return subs;
    }
}

async function obtenerSeguidores(){
    const response = await fetch(`https://decapi.me/twitch/followcount/${usuario}`);
    const seguidores = await response.text();

    if(seguidores.includes('decapi.me')){
        return '-';
    }else{
        return seguidores;
    }
}

async function actualizarMetricas() {
    document.getElementById("vistas").innerHTML = await obtenerVistas();
    document.getElementById("subs").innerHTML = await obtenerSubs();
    document.getElementById("seguidores").innerHTML = await obtenerSeguidores();

    setTimeout(actualizarMetricas, 15000);
}

actualizarMetricas();