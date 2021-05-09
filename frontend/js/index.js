const url = "http://localhost:8000";

window.addEventListener('load', openArchivo, false);

    function openArchivo() {
        document.getElementById('abrirArch').addEventListener('change', cargarArchivo, false);               
    }

    function cargarArchivo(ev) {
        var arch=new FileReader();
        arch.addEventListener('load',leerArchivo,false);
        arch.readAsText(ev.target.files[0]);
    }
    
    function leerArchivo(ev) {
        document.getElementById('contenido').value=ev.target.result;
    }


    function comunicar() {
        fetch(url+'/users')
        .then(response=> response.json())
        .then(data=>{
            data = JSON.stringify(data);
            document.getElementById('consolita').value=data;
        })
        .catch(err=>console.log(err));    
    }
    function enviarData() {
        fetch(url+'/compilar',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                informacion: document.getElementById('contenido').value
            })
        })
        .then(response=>response.json())
        .then(data=>{
            document.getElementById('consolita').value=data.respuesta;
            console.log(data.grafica);
            const tablaE =document.querySelector("#TablaErrores");
            const tablaS =document.querySelector("#TablaSimbolos");
            tablas(data.error,tablaE);
            tablasimb(data.simbolos,tablaS);
            graficar(data.grafico);
        })
        .catch(err=>console.log(err)); 
    }

    function graficar(dot) {
        d3.select("#Graph")
            .graphviz()
            .dot(dot)
            .render();
    }

    function tablas(datos,tabla) {
        tabla.innerHTML="";
        var contador=0;
        for(let valor of datos){
            contador++;
            tabla.innerHTML+=`
            <tr>
                <th scope="row">${contador}</th>
                <td>${valor.tipo}</td>
                <td>${valor.descripcion}</td>
                <td>${valor.linea}</td>
                <td>${valor.col}</td>
            </tr>`;
        }
    }
    function tablasimb(datos,tabla) {
        tabla.innerHTML="";
        var contador=0;
        for(let valor of datos){
            contador++;
            tabla.innerHTML+=`
            <tr>
                <th scope="row">${contador}</th>
                <td>${valor.id}</td>
                <td>${valor.tipo}</td>
                <td>${valor.tipoValor}</td>
                <td>${valor.fila}</td>
                <td>${valor.columna}</td>
            </tr>`;
        }
    }