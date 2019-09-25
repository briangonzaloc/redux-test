import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Tabla from './Tabla';

import * as usuariosActions from '../../actions/usuariosActions';

class Usuarios extends Component {

	componentDidMount() {
		if (!this.props.users.length) {
			this.props.getAll();
		}
	}

	putContent = () => {
		if (this.props.loading) {
			return <Spinner />;
		}

		if (this.props.error) {
			return <Fatal mensaje={ this.props.error } />;
		}

		return <Tabla />
	};

	render() {
		return (
			<div>
				<h1>Usuarios</h1>
				{ this.putContent() }
			</div>
		)
	}
};

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);