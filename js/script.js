let maxleft;
let maxTop;
const minleft = 0;
const minTop = 0;
let timeDelta;
let imgs = [
    "media/img/arboles/arbol1.png",
    "media/img/arboles/arbol2.png",
    "media/img/arboles/arbol3.png",
    "media/img/arboles/arbol4.png"
]

var originalX;
var originalY;

window.onload = function(){
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
}

function sensorClick(){
    if(Date.now() - timeDelta < 150){//verifica que no heos arratrado ningun objeto
        createPopup();
    }

    //La funcion createpopup() se ejecuta cuando el usuario ejecuta un evento (ejemplo "click")
    function createPopup(parent){
        let p = document.getElementById("popup");
        if(p){
            p.parentNode.removeChild(p);
        }
        
        let popup = document.createElement("div");
        popup.id = "popup";
        popup.className = "popup";
        popup.style.top = parent.y -110 + "px";//top  = Y - 110px 
        popup.style.left = parent.x -75 + "px"; // left = x -75px

        //Se crea un elemento de ejecucion de javascript
        let text = document.createElement("span"); //contenido del span=id
        text.textContent = parent.id;
        popup.appendChild(text);

        var map = document.getElementsByClassName("map"); //se obtienen las propiedades del div que poseee el class
        map.appendChild(popup); //se ancla el objeto con class="map" al <div> popup
    }
}
    //la funcion "baseOnLoad()" se ejecuta al cargar el html
function baseOnLoad(){
    var map = document.getElementsByClassName("map")[0]; //se obtiene el elemento "map" del html
    let base = document.getElementsByClassName("base")[0]; //se obtiene el elemento "base" del html
    maxleft = base.width -50;// se establece un espacio maximo para la posisción de la izquierda
    maxTop = base.top -5;//se establece un espacio maximo para la posición del top


    for(let i = 0; i<6; i++){
        //Crea un nuevo elemento en ejecución de javaScript
        let sensor = document.createElement("img") //el elmento es un <img>
        sensor.src = imgs[i % imgs.length];//la url de la ultima posicion del array img[] que fue establecido en la linea
        sensor.alt = i;
        sensor.id = i;
        sensor.draggable = true;
        sensor.classList.add("sensor");
        sensor.classList.add("sensor");
        sensor.style.left = `${Math.floor(Math.random() * 900)}px`;
        sensor.style.top = `${Math.floor(Math.random() * 500)}px`;
        sensor.onclick = sensorClick;

        let parent = document.getElementsByClassName("map")[0];//se heredan los atributos del div "map"
        parent.appendChild(sensor); //se ancla el elemento "sensor" (<img>) al elemento "map"
    }
}

function startDrag(){
    timeDelta = DataTransfer.Now(); //Obtiene la fecha y hora actual
    if(!e){ //si no hay evento
        var e = window.event //se crea un elemento heredado
    }
    if(e.preventDefault){
        e.preventDefault();
    }
    targ = e.target? e.target : e.srcElement;
    originalX = targ.style.left;
    originalY = targ.style.top;


    if(!targ.classList.contains("dragme")){
        return
    }

    offsetX = e.clientX;
offsetY = e.clientY;

//coordX = parseInt{targ.style.left};
//coordY = parseInt{targ.style.top};
drag = true;

document.onmousemove = dragDiv; 
}

    



function dragDiv(e){
    if(!drag){
        return;
    }
    if(!e){
        e = window.event;

    }

    let newLeft = coordX + e.clientX - offsetX;
    if(newLeft <maxleft && newLeft > minLeft){
        targ.style.left = newLeft + 'px';
    }

    let newTop = coordY + e.clientY - offsetY;
    if(newTop <maxTop && newTop> minTop){
        targ.style.top = newTop+ 'px'
    }

    return false;

}

function stopDrag(){
    if(typeof drag ==  "undefined"){
        return;
    }

    if(drag){
        if(Date.now() - timeDelta > 150){
            let p = document.getElementById(popup);
            if(p){
                p.parentNode.removeChild(p);
            }


        }else{
            targ.style.left = originalX;
            targ.style.top = originalY;
        }
    }
    drag = false;
}