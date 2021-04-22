import React, { Component } from 'react';
import {AddBox,ArrowRight,FolderOpen,Save,HighlightOff,List} from '@material-ui/icons';
import '../css/inicioStyle.css';
import '../js/funciones.js';
const puerto="localhost:3000";

class Inicio extends Component {
    render() {
        return (
            
            <div className="containerPrincipal">
                <div className="containerMenu">
                    <ul>
                        <li><a className="active" href="#"><ArrowRight/> Correr</a></li>
                        <li><a href="#"><AddBox/> Nueva Pestaña</a></li>
                        <li><a href="#"><HighlightOff/> Eliminar Pestaña</a></li>
                        <li><a href="#"><Save/> Guardar</a></li>
                        <li><a href="#"><List/> Reportes</a></li>
                    </ul>
                </div>
                <div className="containerInputs">
                        <div className="file-select" id="src-file1" >
                            <input type="file" name="src-file1" aria-label="Archivo" id="abrirArch"/>
                        </div>
                    <div className="containerText">
                        <br></br>
                        <div className="Editor">
                            <label>Editor:</label>
                            <br></br>
                            <textarea id="contenido" rows="10" cols="80"></textarea>
                        </div>
                        <div className="Consola">
                            <label>Consola:</label>
                            <br></br>
                            <textarea></textarea>
                        </div>
                    </div>
                    <div className="containerRepos">

                    </div>
                </div>
                <footer className="Piedepagina">

                </footer>
            </div>
        );
    }
}

export default Inicio;
