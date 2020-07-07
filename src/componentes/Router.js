import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Navegacion from './Navegacion';
import Posts from './Posts';
import SinglePost from './SinglePost';
import Formulario from './Formulario';
import swal from 'sweetalert2';
import EditarPost from './EditarPost';

class Router extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: []
        };
    }

    obtenerPosts= ()=>{
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(respuesta=>{
            this.setState({
                posts : respuesta.data
            });
        });
    }

    borrarPosts = (idPost)=>{
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${idPost}`)
        .then(resultado =>{
            if(resultado.status === 200){
                const posts = [...this.state.posts];
                let resultado = posts.filter(post => (
                    Number.parseInt(post.id) !== Number.parseInt(idPost)
                ));
                this.setState({
                    posts : resultado
                });
            }
        });
    }

    crearPost = (post)=>{
        axios.post('https://jsonplaceholder.typicode.com/posts',{post})
        .then(respuesta=>{
            if(respuesta.status === 201){
                let idPost = {id:respuesta.data.id}
                const nuevoPost = Object.assign({},respuesta.data.post,idPost);
                
                this.setState(prevState=>({
                    posts: [...prevState.posts,nuevoPost]
                }));

                swal.fire(
                    'Información!',
                    'El post fue creado!',
                    'success'
                );
            }
        });
    }

    editarPost = (post)=>{
        axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`,{post})
        .then(respuesta=>{
            
            if(respuesta.status === 200){
                let postId = respuesta.data.id;
                let posts = [...this.state.posts];

                let postEditar = posts.findIndex(post => postId ===post.id);

                posts[postEditar] = post;

                this.setState({
                    posts : posts
                });

                swal.fire(
                    'Información!',
                    'El post fue modificado!',
                    'success'
                );
            }
        });
    }

    componentDidMount() {
        this.obtenerPosts();
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <div className="row justify-content-center">
                        <Header/>
                        <Navegacion/>
                        <Switch>
                            <Route exact path="/" render={()=>{
                                return (
                                    <Posts 
                                        posts = {this.state.posts}
                                        borrarPosts = {this.borrarPosts}
                                    />
                                );
                            }}/>

                            <Route exact path="/post/:postId" render={(props)=>{
                                
                                const posts = [...this.state.posts];
                                const id = props.match.params.postId;
                                const filtro = posts.filter(post=> (
                                    post.id === Number.parseInt(id) 
                                ));
                                return (<SinglePost
                                    post = {filtro[0]}
                                />
                                );
                            }}/>

                            <Route exact path="/crear" render={ (props)=>{
                                return (
                                    <Formulario 
                                        crearPost = {this.crearPost}
                                    />
                                );
                            }} />

                            <Route exact path="/editar/:postId" render={(props)=>{
                                
                                const posts = [...this.state.posts];
                                const id = props.match.params.postId;
                                const filtro = posts.filter(post=> (
                                    post.id === Number.parseInt(id) 
                                ));
                                return (<EditarPost
                                    post = {filtro[0]}
                                    editarPost = {this.editarPost}
                                />
                                );
                            }}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}


export default Router;