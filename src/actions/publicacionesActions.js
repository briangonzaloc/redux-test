import axios from 'axios';
import {
	LOADING,
	ERROR,
	UPDATE,
	COM_LOADING,
	COM_ERROR,
	COM_UPDATE
} from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';

const { GET_ALL: USERS_GET_ALL } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) => {
	dispatch({
		type: LOADING
	});

	let { users } = getState().usuariosReducer;
	const { publicaciones } = getState().publicacionesReducer;
	const user_id = users[key].id;

	try {
		const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);
		const news = response.data.map((post) => ({
			...post,
			comentarios: [],
			abierto: false
		}));
		const publicaciones_actualizadas = [
			...publicaciones,
			news
		];

		dispatch({
			type: UPDATE,
			payload: publicaciones_actualizadas
		});

		const publicaciones_key = publicaciones_actualizadas.length - 1;
		const usuarios_actualizados = [...users];
		usuarios_actualizados[key] = {
			...users[key],
			publicaciones_key
		};

		dispatch({
			type: USERS_GET_ALL,
			payload: usuarios_actualizados
		});
	}
	catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Publicaciones no disponibles.'
		});
	}
};

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
	const { publicaciones } = getState().publicacionesReducer;
	const selected = publicaciones[pub_key][com_key]; /*de que usuario, y cual publicacion se dio click*/ 

	const actualizada = {
		...selected,
		abierto: !selected.abierto
	};
	/* Esto se hace porque son inmutables. */
	const publicaciones_actualizadas = [...publicaciones];

	publicaciones_actualizadas[pub_key] = [
		...publicaciones[pub_key]
	];
	publicaciones_actualizadas[pub_key][com_key] = actualizada;
	
	dispatch({
		type: UPDATE,
		payload: publicaciones_actualizadas
	});
};

export const getComments = (pub_key, com_key) => async (dispatch, getState) => {
	dispatch({
		type: COM_LOADING
	});

	const { publicaciones } = getState().publicacionesReducer;
	const selected = publicaciones[pub_key][com_key];

	try {
		const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`)

		const actualizada = {
			...selected,
			comentarios: response.data
		};

		const publicaciones_actualizadas = [...publicaciones];

		publicaciones_actualizadas[pub_key] = [
			...publicaciones[pub_key]
		];
		publicaciones_actualizadas[pub_key][com_key] = actualizada;
		
		dispatch({
			type: COM_UPDATE,
			payload: publicaciones_actualizadas
		});
	}
	catch (error) {
		dispatch({
			type: COM_ERROR,
			payload: 'Comentarios no disponibles.'
		});
	}
};