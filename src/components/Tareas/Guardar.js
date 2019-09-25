import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import TextField from '@material-ui/core/TextField';

import * as tareasActions from '../../actions/tareasActions';

class Guardar extends Component {
	componentDidMount() {
		const {
			match: { params: { usu_id, tar_id } },
			tasks,
			cambioUsuarioId,
			cambioTitulo,
			cleanForm
		} = this.props;

		if (usu_id && tar_id) {
			const task = tasks[usu_id][tar_id];
			cambioUsuarioId(task.userId);
			cambioTitulo(task.title);
		}
		else {
			cleanForm();
		}
	}

	cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value);
	};

	guardar = () => {
		const {
			match: { params: { usu_id, tar_id } },
			tasks,
			usuario_id,
			titulo,
			agregar,
			editar
		} = this.props;

		const nueva_tarea = {
			userId: usuario_id,
			title: titulo,
			completed: false
		};

		if (usu_id && tar_id) {
			const tarea = tasks[usu_id][tar_id];
			const tarea_editada = {
				...nueva_tarea,
				completed: tarea.completed,
				id: tarea.id
			};
			editar(tarea_editada);
		}
		else {
			agregar(nueva_tarea);
		}
	};

	disabled = () => {
		const { usuario_id, titulo, loading } = this.props;
		if (loading) {
			return true;
		}
		if (!usuario_id || !titulo) {
			return true;
		}
		return false;
	};

	mostrarAccion = () => {
		const { error, loading } = this.props;
		if (loading) {
			return <Spinner />;
		}
		if (error) {
			return <Fatal mensaje={error} />;
		}
	};

	render() {
		return (
			<div>
				{
					(this.props.regresar) ?
					<Redirect to='/tareas' />
					: ''
				}
				<h1>Guardar Tarea</h1>
				{/* Usuario id:
				<input
					type='number'
					value={ this.props.usuario_id }
					onChange={ this.cambioUsuarioId }
				/> */}
				<TextField
					label="Usuario ID"
					type="number"
					value={this.props.usuario_id}
					onChange={this.cambioUsuarioId}
					margin="normal"

				/>

				<br /><br />
				{/* <input
					value={ this.props.titulo }
					onChange={ this.cambioTitulo }
				/> */}

				<TextField
					label="Titulo"
					value={this.props.titulo}
					// className={classes.textField}
					onChange={this.cambioTitulo}
					// defaultValue="Bare"
					margin="normal"
					inputProps={{ 'aria-label': 'bare' }}
				/>
				<br /><br />
				<button
					disabled={ this.disabled() }
					onClick={ this.guardar }
				>
					Guardar
				</button>
				{ this.mostrarAccion() }
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);