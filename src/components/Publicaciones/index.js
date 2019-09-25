import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comentarios from './Comentarios';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { getAll: getAllUsers } = usuariosActions;
const {
	traerPorUsuario: getPostsUser,
	abrirCerrar,
	getComments
} = publicacionesActions;

class Publicaciones extends Component {

	async componentDidMount() {
		const {
			getAllUsers,
			match: { params: { key } },
			getPostsUser
		} = this.props;

		if (!this.props.usuariosReducer.users.length) {
			await getAllUsers();
		}
		if (this.props.usuariosReducer.error) {
			return;
		}
		if (!('publicaciones_key' in this.props.usuariosReducer.users[key])) {
			await getPostsUser(key);
		}
	}

	putUser = () => {
		const {
			match: { params: { key } },
			usuariosReducer
		} = this.props;

		if (usuariosReducer.error) {
			return <Fatal mensaje={ usuariosReducer.error } />;
		}
		if (!usuariosReducer.users.length || usuariosReducer.loading) {
			return <Spinner />
		}

		const name = usuariosReducer.users[key].name;

		return (
			<h1>
				Publicaciones de { name }
			</h1>
		);
	};

	putPosts = () => {
		const {
			usuariosReducer,
			usuariosReducer: { users },
			publicacionesReducer,
			publicacionesReducer: { publicaciones },
			match: { params: { key } }
		} = this.props;

		if (!users.length) return;
		if (usuariosReducer.error) return;
		if (publicacionesReducer.loading) {
			return <Spinner />;
		}
		if (publicacionesReducer.error) {
			return <Fatal mensaje={ publicacionesReducer.error } />
		}
		if (!publicaciones.length) return;
		if (!('publicaciones_key' in users[key])) return;

		const { publicaciones_key } = users[key];
		return this.mostrarInfo(
			publicaciones[publicaciones_key],
			publicaciones_key
		);
	};

	mostrarInfo = (posts, pub_key) => (
		posts.map((post, com_key) => (
			<div
				key={post.id}
				onClick={
					() => this.mostrarComentarios(pub_key, com_key, post.comentarios)
				}
			>
				<Typography gutterBottom variant="h5" component="h2">
					{post.title}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{post.body}
				</Typography>
				
				{
					(post.abierto) ?
						<Comentarios
							comentarios={ post.comentarios }
						/>
						: ''
				}
				<Divider/>
			</div>
		))
	);

	mostrarComentarios = (pub_key, com_key, comentarios) => {
		this.props.abrirCerrar(pub_key, com_key)
		if (!comentarios.length) {
			this.props.getComments(pub_key, com_key)
		}
	};

	render() {
		return (
			<div>
				{ this.putUser() }
				{ this.putPosts() }
			</div>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
	return { usuariosReducer, publicacionesReducer };
};

const mapDispatchToProps = {
	getAllUsers,
	getPostsUser,
	abrirCerrar,
	getComments
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);