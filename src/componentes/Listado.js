import React, { Component } from 'react';
import Post from './Post';

class Listado extends Component {
    
    mostrarPosts = ()=>{
        const posts = this.props.posts;
        if (posts.length === 0) return null;
        
        return (
            <React.Fragment>
                {Object.keys(posts).map(post =>(
                    <Post
                        info = {this.props.posts[post]}
                        key = {post}
                        borrarPosts = {this.props.borrarPosts}
                    />
                ))}
            </React.Fragment>
        );
    }
    
    render() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {this.mostrarPosts()}
                </tbody>
            </table>
        );
    }
}

export default Listado;