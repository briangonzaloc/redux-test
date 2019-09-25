import axios from 'axios';
import {
	GET_ALL,
	LOADING,
	ERROR,
	CHANGE_USER,
	CHANGE_TITLE,
	SAVED,
	UPDATE,
	CLEAN
} from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
		
		const tareas = {};
		respuesta.data.map((tar) => (
			tareas[tar.userId] = {
				...tareas[tar.userId],
				[tar.id]: {
					...tar
				}
			}
		));

		dispatch({
			type: GET_ALL,
			payload: tareas
		})
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Tareas no disponibles.'
		})
	}
};

export const cambioUsuarioId = (valor) => (dispatch) => {
	dispatch({
		type: CHANGE_USER,
		payload: valor
	})
};

export const cambioTitulo = (valor) => (dispatch) => {
	dispatch({
		type: CHANGE_TITLE,
		payload: valor
	})
};

export const agregar = (nueva_tarea) => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
		dispatch({
			type: SAVED
		});
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Servicio no disponible en este momento.'
		});
	}
};

export const editar = (tarea_editada) => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);
		dispatch({
			type: SAVED
		});
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Servicio no disponible en este momento.'
		});
	}
};

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
	const { tareas } = getState().tareasReducer;
	const seleccionada = tareas[usu_id][tar_id];

	const actualizadas = {
		...tareas
	};
	actualizadas[usu_id] = {
		...tareas[usu_id]
	};
	actualizadas[usu_id][tar_id] = {
		...tareas[usu_id][tar_id],
		completed: !seleccionada.completed
	}

	dispatch({
		type: UPDATE,
		payload: actualizadas
	})
};

export const eliminar = (tar_id) => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`);
		dispatch({
			type: GET_ALL,
			payload: {}
		})
	}
	catch (error) {
		console.log(error.message);
		dispatch({
			type: ERROR,
			payload: 'Servicio no disponible en este momento.'
		})
	}
};

export const cleanForm = () => (dispatch) => {
	dispatch({
		type: CLEAN
	});
};