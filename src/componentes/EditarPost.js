import React, { Component } from 'react';

class EditarPost extends Component {
    
    constructor(props){
        super(props);

        this.tituloRef = React.createRef();
        this.entradaRef = React.createRef();
    }

    editarPost = (e)=>{
        e.preventDefault();
        const post = {
            title: this.tituloRef.current.value,
            body : this.entradaRef.current.value,
            userId: 1,
            id: this.props.post.id
        }
        this.props.editarPost(post);
    }

    cargarFormulario = ()=>{
        if(!this.props.post) return null;

        const {title,body} = this.props.post;

        return (
            <form className="col-8" onSubmit={this.editarPost}>
                <legend className="text-center">Editar Post</legend>
                <div className="form-group">
                    <label>Título del post</label>
                    <input type="text" className="form-control" defaultValue={title} ref={this.tituloRef} />
                </div>
                <div className="form-group">
                    <label>Contenido</label>
                    <textarea className="form-control" defaultValue={body} ref={this.entradaRef}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        );
    }
    
    render() {
        return(this.cargarFormulario());
    }
}

export default EditarPost;