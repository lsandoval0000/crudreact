import React, { Component } from 'react';

class Formulario extends Component {

    constructor(props){
        super(props);

        this.tituloRef = React.createRef();
        this.entradaRef = React.createRef();
    }

    crearPost = (e)=>{
        e.preventDefault();
        const post = {
            title: this.tituloRef.current.value,
            body : this.entradaRef.current.value,
            userId: 1
        }
        this.props.crearPost(post);
    }

    render() {
        return (
            <form className="col-8" onSubmit={this.crearPost}>
                <legend className="text-center">Crear Nuevo Post</legend>
                <div className="form-group">
                    <label>Título del post</label>
                    <input type="text" className="form-control" placeholder="Titulo del Post" ref={this.tituloRef} />
                </div>
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea className="form-control" placeholder="Contenido" ref={this.entradaRef}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Crear</button>
            </form>
        );
    }
}

export default Formulario;