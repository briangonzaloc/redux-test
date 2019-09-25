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

const INITIAL_STATE = {
	tasks: {},
	loading: false,
	error: '',
	usuario_id: '',
	titulo: '',
	regresar: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ALL:
			return {
				...state,
				tasks: action.payload,
				loading: false,
				error: '',
				regresar: false
			};

		case LOADING:
			return { ...state, loading: true };

		case ERROR:
			return { ...state, error: action.payload, loading: false };

		case CHANGE_USER:
			return { ...state, usuario_id: action.payload };

		case CHANGE_TITLE:
			return { ...state, titulo: action.payload };

		case SAVED:
			return {
				...state,
				tasks: {},
				loading: false,
				error: '',
				usuario_id: '',
				titulo: ''
			};

		case UPDATE:
			return { ...state, tasks: action.payload };

		case CLEAN:
			return { ...state, usuario_id: '', titulo: '' };

		default: return state;
	};
};