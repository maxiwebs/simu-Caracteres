caracteres_ordenados = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ','á','é','í','ó','ú']
caracter_indefinido = "?";

diccionario_codificacion = {};
dump_memoria = [];

//Inicializo tamanio palabra en 0 y cantidad palabras 100 (tamanio pantalla 10*10)
var tamanio_palabra = 0;
var cantidad_palabras = 100;


//Genera la codificación,memoria y pantalla según el tamaño de palabra seleccionado por el usuario
function generar_instancia_vacia(){

  cargar_valores_por_default();
  mostrar_entradas_salidas();

  //Oculto campos de generar y cargar archivo
  var tabla_salidas = document.getElementById("generar_cargar");
  tabla_salidas.style.visibility = 'hidden';

}

//Muestra memoria y pantalla con el dump de memoria importado. La codificación segun tamaño de palabra.
function generar_instancia_desde_archivo(){

  //Carga el archivo del usuario y setea valores de memoria, codificacion y tamanio_palabra

  mostrar_entradas_salidas();

  //Oculto campos de generar y cargar archivo
  var tabla_salidas = document.getElementById("generar_cargar");
  tabla_salidas.style.visibility = 'hidden';
}

//Muestra las tablas de codificacion, memoria, pantalla, entrada de texto y botones
function mostrar_entradas_salidas(){

  mostrar_memoria();
  mostrar_pantalla();

  var tabla_salidas = document.getElementById("tabla_salidas");
  tabla_salidas.style.visibility = 'visible';

  //Tabla con caracteres y sus códigos
  mostrar_tabla_codificacion();

  //Input para ingresar texto por teclado
  mostrar_entrada();

}


//Carga los valores por defecto segun el tamanio de palabra seleccionado por el usuario
function cargar_valores_por_default(){

  //Tomo el tamaño de la palabra definido por el usuario en "Bits por caracter"
  tamanio_palabra = document.getElementById("tamanio_palabra").value;
  
  for (i = 0; i < tamanio_palabra*cantidad_palabras; i++){
    dump_memoria[i] = "-";
  }

  //Define el diccionario de codificación, con valores por defecto (no definidos por usuario)
  diccionario_codificacion = definir_codificacion(tamanio_palabra,caracteres_ordenados);
}


//Devuelve un diccionario con los caracteres del array y una codificacion binaria incremental
function definir_codificacion(tamanio_palabra,caracteres){

  diccionario_local = {};

    for (var i = 0; i < 2**tamanio_palabra; i++) {
      //diccionario_local[caracteres[i]] = createBinaryString(i,tamanio_palabra);
      diccionario_local[i] = caracteres[i];
    }

  return diccionario_local;
}

//Genera la tabla de codificaciones según el diccionario_codificacion
function mostrar_tabla_codificacion(){

  if (document.contains(document.getElementById("campos_codificacion"))) {
    document.getElementById("campos_codificacion").remove();
  }

  // Obtener la referencia del elemento body
  var body = document.getElementById("tabla_campos_codificacion");

  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  tabla.setAttribute("id", "campos_codificacion");
  var tblBody = document.createElement("tbody");

  var hilera = document.createElement("tr");

  //Celda con titulo Nro
  var celda = document.createElement("td");
  celda.style.border = "0";
  var textoCelda = document.createTextNode("N°");
  celda.appendChild(textoCelda);
  hilera.appendChild(celda);

  //Celda con titulo caracter
  var celda = document.createElement("td");
  celda.style.border = "0";
  var textoCelda = document.createTextNode("Caracter");
  celda.appendChild(textoCelda);
  hilera.appendChild(celda);

  //Celda con titulo codificacion
  var celda = document.createElement("td");
  celda.style.border = "0";
  celda.style.textAlignLast = "center";
  var textoCelda = document.createTextNode("Binario");
  celda.appendChild(textoCelda);
  hilera.appendChild(celda);
  tblBody.appendChild(hilera);

  // Crea las celdas
  for (var i = 0; i < 2**tamanio_palabra; i++) {
    indiceEnBinario = createBinaryString (i,tamanio_palabra);
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");
    var celda = document.createElement("td");
    celda.style.border = "0";
    var textoCelda = document.createTextNode(i);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);

    var celda = document.createElement("td");
    celda.style.border = "0";
    var entrada = document.createElement("INPUT");
    entrada.setAttribute("id", "caracter"+i);
    entrada.setAttribute("type","INPUT");
    entrada.setAttribute("maxlength",1);
    entrada.setAttribute("size",1);
    entrada.setAttribute("value",dame_caracter(indiceEnBinario));
    celda.appendChild(entrada);
    hilera.appendChild(celda);

    //Celda con codificacion
    var celda = document.createElement("td");
    celda.style.border = "0";
    var entrada = document.createElement("INPUT");
    entrada.setAttribute("id", "codificacion"+i);
    entrada.setAttribute("type","INPUT");
    entrada.setAttribute("maxlength",tamanio_palabra);
    entrada.setAttribute("size",5);
    entrada.setAttribute("readonly",true);
    entrada.setAttribute("value",indiceEnBinario);
    celda.appendChild(entrada);
    hilera.appendChild(celda);

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);

    //Muestro la tabla de codificacion
    var tabla_generar_codificacion = document.getElementById("tabla_generar_codificacion");
    tabla_generar_codificacion.style.visibility = 'visible'; 
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "1");

}

//Si cambian los valores originales, se rehace la codificación
function actualizar_codificacion(){

  //Capturo los datos ingresados en los campos
  tamanio_palabra = document.getElementById("tamanio_palabra").value;

  //Obtengo las codificaciones cargadas
  for (var i = 0; i<2**tamanio_palabra;i++){
    caracter = document.getElementById("caracter"+i).value;
    codificacion = document.getElementById("codificacion"+i).value;
    //diccionario_codificacion[caracter] = codificacion;
    indice_decimal = parseInt(codificacion,2);
    diccionario_codificacion[indice_decimal] = caracter;
    if (caracter == ""){
      break;
    }
  }

  //Limpia memoria, pantalla y campo de entrada
  limpiar_todo();
}

function mostrar_entrada(){

  if (document.contains(document.getElementById("entrada"))) {
    document.getElementById("entrada").remove();
  }

  var body = document.getElementById("div_entrada");

  var entrada = document.createElement("INPUT");
  entrada.setAttribute("id", "entrada");
  entrada.setAttribute("type","text");
  entrada.style.width = cantidad_palabras*2;
  entrada.setAttribute("maxlength",cantidad_palabras);
  entrada.setAttribute("onkeypress", "refrescar_ram_pantalla(event)");

  body.appendChild(entrada);
}

function mostrar_memoria(){

  if (document.contains(document.getElementById("memoria"))) {
      document.getElementById("memoria").remove();
  }

  var tabla_memoria = document.getElementById("tabla_memoria");
 
  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  tabla.setAttribute("id", "memoria");
  tabla.style.borderColor="#679D08";
  var tblBody = document.createElement("tbody");
 
  let dump_memoria_index = 0;
 
  // Crea las filas segun cantidad de palabras
  for (var i = 0; i < cantidad_palabras; i++) {

    var hilera = document.createElement("tr");
    hilera.setAttribute("id","fila"+i);

    //Creo columnas segun tamaño de palabra
    for (var j = 0; j <= tamanio_palabra; j++) {
      var celda = document.createElement("td");
      
      //Si la columna es la primera, pongo la posición de memoria
      if (j == 0){
        textoCelda = document.createTextNode(i);
        colorTextoFondo = {"colorFondo": "#679D08", "colorTexto": "white"};
      }else {
        textoCelda = document.createTextNode(dump_memoria[dump_memoria_index]);  
        celda.style.fontWeight = '900';
        dump_memoria_index++;
        colorTextoFondo = {"colorFondo": "#CBD6B8", "colorTexto": "black"};
      }

      celda.style.backgroundColor=colorTextoFondo["colorFondo"];
      celda.style.color=colorTextoFondo["colorTexto"];
      celda.style.textAlign = "center";
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    //Agrego fila con columnas generadas
    tblBody.appendChild(hilera);
  }
 
  tabla.appendChild(tblBody);
  tabla.setAttribute("border", "2");
  tabla_memoria.appendChild(tabla);
  //Ir al inicio de la memoria
  document.getElementById("fila0").scrollIntoView();

  var campo_entrada = document.getElementById("campo_entrada");
  campo_entrada.style.visibility = 'visible'; 
}

function mostrar_pantalla(){

  if (document.contains(document.getElementById("monitor"))) {
      document.getElementById("monitor").remove();
  }

  // Obtener la referencia del elemento body
  var body = document.getElementById("tabla_pantalla");

  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  tabla.setAttribute("id", "monitor");
  var tblBody = document.createElement("tbody");

  let celdas_rellenadas = 0;
  
  // Crea las columnas recorro hasta la raiz cuadrada de la cantidad de palabras (Ej 10 de 100)
  for (var f = 0; f < Math.sqrt(cantidad_palabras); f++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    //Genero filas, recorro hasta la raiz cuadrada de la cantidad de palabras (Ej 10 de 100)
    for (var c = 0; c < Math.sqrt(cantidad_palabras); c++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      celda.setAttribute("align","center");

      //Obtengo el caracter correspondiente a la codificación actual
      codigo_caracter_actual = "";

      //agrupo segun el tamanio_palabra para obtener el codigo del caracter
      for (var k = 0; k< tamanio_palabra; k++){
        //Obtengo el codigo del caracter de memoria
        codigo_caracter_actual+=dump_memoria[(celdas_rellenadas)*tamanio_palabra+k];

        //Si encuentra un codigo "-", quiere decir que no está definida la palabra
        if (codigo_caracter_actual[k] == "-"){
          celda.style.color = "white";
          //Termino el ciclo
          break;
        }
      }

      //Me da el caracter según el codigo, incluyendo si es vacío.
      caracter_actual = dame_caracter(codigo_caracter_actual);

      var textoCelda = document.createTextNode(caracter_actual);

      celda.style.border = "0";
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      celdas_rellenadas++;
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}



function refrescar_ram_pantalla(e){
  
  //Obtengo la tecla presionada por el usuario
  teclaPresionada = dameTeclaPresionada(e);

  //Obtengo la cantidad de caracteres en la entrada
  var textoInsertado = document.getElementById('entrada').value;
  cant_caracteres = textoInsertado.length+1;

  //Si no alcancé el maximo de caracteres
  if (cant_caracteres <= cantidad_palabras){
    refrescar_ram(teclaPresionada,cant_caracteres);
    refrescar_pantalla(teclaPresionada,cant_caracteres,cantidad_palabras);
  }
}

function refrescar_ram(teclaPresionada,cant_caracteres){   

    codificacionBinaria = dame_codificacion(teclaPresionada);

    indiceFilaMemoria = cant_caracteres-1;
    indiceInicioColumna = 1; //La columna cero es para la posición de memoria
    indiceMemoria = (cant_caracteres-1)*tamanio_palabra;

    var filaMemoria = document.getElementById("memoria").rows[indiceFilaMemoria].cells;
    
    var indice_codificacion = 0;
    for (i = indiceInicioColumna; i<indiceInicioColumna+parseInt(tamanio_palabra); i++){
        filaMemoria[i].innerHTML = codificacionBinaria[indice_codificacion];
        filaMemoria[i].style.fontWeight = "900";
        dump_memoria[indiceMemoria] =  codificacionBinaria[indice_codificacion];
        indice_codificacion++;
        indiceMemoria++;
    }
    
    //Pongo en amarillo la posición de memoria que acabo de modificar y limpio el resto
    for (i=0;i<cantidad_palabras;i++){
      var filaMemoria = document.getElementById("memoria").rows[i].cells;
  
      if(i == cant_caracteres-1){
        filaMemoria[0].style.fontWeight = "900";
        filaMemoria[0].style.color = "yellow";
      }else {
        filaMemoria[0].style.fontWeight = "normal";
        filaMemoria[0].style.color = "white";
      }
    }
  
    //Me desplazo hacia la fila que modifiqué
    ver_memoria_modificada(cant_caracteres);
}

function refrescar_pantalla(teclaPresionada,cant_caracteres,cantidad_palabras){

  indiceFila = dameFilaMonitor(cant_caracteres,cantidad_palabras);
  var filaMonitor = document.getElementById("monitor").rows[indiceFila].cells;
  columnaMonitor = dameColumnaMonitor(cant_caracteres,cantidad_palabras);

  caracterDefinido = caracter_en_diccionario(teclaPresionada);

  //Chequeo si no está definida en el diccionario_codificacion
  if (!caracterDefinido){
    teclaPresionada = caracter_indefinido;
  }

  filaMonitor[columnaMonitor].innerHTML = teclaPresionada;
  filaMonitor[columnaMonitor].style.color = "black";
}


function limpiar_todo(){

  //Limpiar entrada
  document.getElementById('entrada').value = "";
  limpiar_memoria();
  limpiar_pantalla();
  
}

function limpiar_memoria(){
  filasMemoria = cantidad_palabras;

  for (var i=0; i< filasMemoria; i++){
    var filaPantalla = document.getElementById("memoria").rows[i].cells;
    filaPantalla[0].style.color = "white";
    filaPantalla[0].style.fontWeight = "normal";
    for (var j=1; j<= tamanio_palabra; j++){
      dump_memoria[i+j] = "-";
      filaPantalla[j].innerHTML = "-";
      filaPantalla[j].style.fontWeight = "normal";
    }
  }
  //Ir al inicio de la memoria
  document.getElementById("fila0").scrollIntoView();
}

function limpiar_pantalla(){
  for (var i=0; i< Math.sqrt(cantidad_palabras); i++){
    var filaMonitor = document.getElementById("monitor").rows[i].cells;
    for (var j=0; j< Math.sqrt(cantidad_palabras); j++){
      filaMonitor[j].innerHTML = "-";
      filaMonitor[j].style.color = "white";
    }
  }
}

///// EXPORTAR
const estado_texto = {
  tamanio_palabra : 0,
  codificacion : {},
  memoria : []
};

//Genera json a partir de los datos actuales
function exportar_json(){

  const exportObj = Object.create(estado_texto);
  exportObj.tamanio_palabra = tamanio_palabra;

  //let codificacion = diccionario_codificacion;
  
  //exportObj.codificacion = codificacion;
  exportObj.memoria = dump_memoria;
  exportName = "output";
  downloadObjectAsJson(exportObj, exportName);
}

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

//////IMPORTAR

function cargar_desde_json() {

	var files = document.getElementById('selectFiles').files;
  if (files.length <= 0) {
    return false;
  }
  
  var fr = new FileReader();
  
  fr.onload = function(e) { 
    var result = JSON.parse(e.target.result);

    if(result.hasOwnProperty('tamanio_palabra')){
      tamanio_palabra = result.tamanio_palabra;
    }else{
      tamanio_palabra = 2;
    }

    if(result.hasOwnProperty('memoria')){
      dump_memoria = result.memoria;
    }

    //Si hay diccionario del usuario lo cargo
    if(result.hasOwnProperty('codificacion')){
      diccionario_codificacion = result.codificacion;
    }else{
      //Sino defino el de caracteres ordenados
      diccionario_codificacion = definir_codificacion(tamanio_palabra,caracteres_ordenados);
    }
   
    generar_instancia_desde_archivo();
    //genera_memoria_pantalla_desde_json(tamanio_palabra,cantidad_palabras);
  };
  fr.readAsText(files.item(0)); 
}


///FUNCIONES AUXILIARES

//Devuelve true si el caracter está definido en el diccionario
function caracter_en_diccionario(caracter){

  caracterPresente = false;

  for (i = 0; i < Object.keys(diccionario_codificacion).length; i++){
    if (diccionario_codificacion[i] == caracter){
      caracterPresente = true;
      break;
    }
  }
  return caracterPresente;
}


//Con el codigo binario, obtengo el caracter
function dame_caracter(codigo_caracter_actual){

  //Defino default por si no lo encuentra
  let caracter = " ";

  //Si el codigo tiene un "-", devuelvo el mismo caracter
  if (codigo_caracter_actual[0] == "-"){
    caracter = "-";
  }else{//Si es un codigo de codificación binario

    //Parseo string del código binario a decimal
    i = parseInt(codigo_caracter_actual,2);

    //Obtengo el caracter con el índice, sobre el diccionario de codificación
    caracter = diccionario_codificacion[i];

  }      
  
  return caracter;
}

//Dado un caracter, me devuelve su codificacion binaria con cantidad de bits tamanio_palabra
function dame_codificacion(caracter){

  //Codificacion default por si no está el caracter elegido
  codificacion = ["-","-","-","-","-","-","-","-"];

  for (i = 0; i < Object.keys(diccionario_codificacion).length; i++){
    if (diccionario_codificacion[i] == caracter){
      codificacion = createBinaryString (i,tamanio_palabra);
      break;
    }
  }
  return codificacion;
}


//Devuelve el caracter presionado por la persona
function dameTeclaPresionada(e){
  var keynum;
  if(window.event) { // IE                    
    keynum = e.keyCode;
  } else if(e.which){ // Netscape/Firefox/Opera                   
    keynum = e.which;
  }
  teclaPresionada = String.fromCharCode(keynum);
  return teclaPresionada;
}


function dameFilaMonitor(cant_caracteres,cantidad_palabras){ 
  if(cant_caracteres % Math.sqrt(cantidad_palabras) == 0){
      indiceFila = ((cant_caracteres / Math.sqrt(cantidad_palabras))-1);
  }else{
      indiceFila = ~~(cant_caracteres / Math.sqrt(cantidad_palabras));
  }
  return indiceFila;
}

function dameColumnaMonitor(cant_caracteres,cantidad_palabras){
  if(cant_caracteres % Math.sqrt(cantidad_palabras) == 0){
      indiceColumna = Math.sqrt(cantidad_palabras)-1;
  }else{
      indiceColumna = (cant_caracteres % Math.sqrt(cantidad_palabras))-1;
  }
  return indiceColumna;
}

function dameColorFondoMemoria(tamanio_palabra,cantidad_palabras,numeroFila,numeroColumna){

  var colorTextoFondo = {"colorFondo": "679D08", "colorTexto": "white"}

  //Si la división entera entre el numero de columna y la cantidad de palabras más el numeroFila es par
  if (((~~(numeroColumna / tamanio_palabra)+numeroFila)%2) == 0){
    colorTextoFondo["colorFondo"] = "#CBD6B8";
    colorTextoFondo["colorTexto"] = "black";
  }
  return colorTextoFondo;

}

//Cantidad de filas de ram que entran en el frame
var cantidad_por_pantalla = 8;

//Si la posición de memoria no está en la pantalla, scrolleo el frame para ver el cambio
//Para no marear, lo hago en "páginas" dependiendo de la cantidad que entran en pantalla
//Esto "aplasta" los números a 0,8,16,24,etc
function ver_memoria_modificada(actual_modificada){

    //Todo lo que entra en la primer página, "no lo muevo"
  if (actual_modificada <= cantidad_por_pantalla){
    document.getElementById("fila0").scrollIntoView();
  }else{
    fila_para_centrar = ((~~((actual_modificada-1) / cantidad_por_pantalla)))*cantidad_por_pantalla;
    document.getElementById("fila"+fila_para_centrar).scrollIntoView();
  }
}


//Convierte de decimal a binario, hasta 32 bits
function createBinaryString (nMask,tamanio_palabra) {
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  //Recorto el substring con la cantidad de finales que necesito    
  return sMask.substring(32-tamanio_palabra);
}

