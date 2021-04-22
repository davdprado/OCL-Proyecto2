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