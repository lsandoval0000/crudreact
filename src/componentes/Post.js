import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert2';

class Post extends Component {

    confirmarEliminacion = () =>{

        swal.fire({
            title: '¿Estas seguro?',
            text: "No serás capaz de deshacer esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.props.borrarPosts(this.props.info.id);
                swal.fire(
                    'Eliminado!',
                    'El post ha sido eliminado!',
                    'success'
                );
            }
        })
    }

    render() {
        const {id,title} = this.props.info;

        return (
            <tr>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                    <Link to={`/post/${id}`} className="btn btn-primary">Ver</Link>
                    <Link to={`/editar/${id}`} className="btn btn-warning">Editar</Link>
                    <button onClick={this.confirmarEliminacion} className="btn btn-danger" type="button">Borrar</button>
                </td>
            </tr>
        );
    }
}

export default Post;