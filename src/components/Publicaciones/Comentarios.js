import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import no_profile from '../../images/no-profile.jpg';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
	avatar: {
		margin: 10,
	},
});

const Comentarios = (props) => {
	const classes = useStyles();

	if (props.com_error) {
		return <Fatal mensaje={ props.com_error } />
	}
	if (props.com_loading && !props.comentarios.length) {
		return <Spinner />
	}

	const ponerComentarios = () => (
		props.comentarios.map((comentario) => (
			<li key={ comentario.id }>
				<Grid container>
					<Grid item xs={1}>
						<Avatar alt="Remy Sharp" src={no_profile} className={classes.avatar} />
					</Grid>
					<Grid item xs={11}>
						<b><u>{ comentario.email }</u></b>
						<br />
						{ comentario.body }
					</Grid>
				</Grid>
			</li>
		))
	);

	return (
		<ul>
			{ ponerComentarios() }
		</ul>
	);
};

const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);