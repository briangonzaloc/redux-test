import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import * as tareasActions from '../../actions/tareasActions';


// const useStyles = makeStyles(theme => ({
// 	fab: {
// 		margin: theme.spacing(1),
// 	},
// 	extendedIcon: {
// 		marginRight: theme.spacing(1),
// 	},
// }));
class Tareas extends Component {

	// styles = useStyles();


	componentDidMount() {
		if (!Object.keys(this.props.tasks).length)
			this.props.traerTodas();
	}

	componentDidUpdate() {
		const { tasks, loading, traerTodas } = this.props;

		if (!Object.keys(tasks).length && !loading) {
			traerTodas();
		}
	}

	showContent = () => {
		
		const { tasks, loading, error } = this.props;

		if (loading) {
			return <Spinner />
		}
		if (error) {
			return <Fatal mensaje={ error } />
		}

		return Object.keys(tasks).map((usu_id) => (
			<div key={ usu_id }>
				<h2>Usuario { usu_id }</h2>
				<div className='contenedor_tareas'>
					{ this.putTasks(usu_id) }
				</div>
			</div>
		));
	};

	putTasks = (usu_id) => {
		const { tasks, cambioCheck, eliminar } = this.props;
		const por_usuario = {
			...tasks[usu_id]
		};

		return Object.keys(por_usuario).map((tar_id) => (
			<div key={ tar_id }>
				<input type='checkbox'
					defaultChecked={ por_usuario[tar_id].completed }
					onChange={
						() => cambioCheck(usu_id, tar_id)
					}
				/>
				{ por_usuario[tar_id].title }
				<Link to={ `/tareas/guardar/${usu_id}/${tar_id}` }>
					<Button color="secondary" className='m_left'>
						<Fab color="secondary" aria-label="edit">
							<EditIcon />
						</Fab>
					</Button>
				</Link>
				<Button className='m_left' onClick={ () => eliminar(tar_id) }>
					{/* Eliminar */}
					<Fab disabled aria-label="delete" >
						<DeleteIcon />
					</Fab>
				</Button>
			</div>
		));
	};
	

	render() {
		return (
			<div>
				<Link to='/tareas/guardar'>
					<Button variant="contained" color="primary" >
						Agregar
					</Button>
				</Link>
				{ this.showContent() }
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);