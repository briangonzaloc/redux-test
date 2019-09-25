import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const Tabla = (props) => {

	const useStyles = makeStyles({
		root: {
			width: '100%',
		},
		tableWrapper: {
			maxHeight: 407,
			overflow: 'auto',
		},
	});

	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns = [
		{ id: 'name', label: 'Nombre', minWidth: 200 },
		{ id: 'email', label: 'Email', minWidth: 100 },
		{
			id: 'website',
			label: 'Enlace',
			minWidth: 120,
			align: 'right',
			// format: value => value.toLocaleString(),
		},
		{
			id: 'posts',
			label: 'Publicaciones',
			align: 'right',
			minWidth: 10,
		},
	];
	
	const getUsers = () => {
		let data = props.users.map( (user,key)=>(
			{ ...user,
				posts : (
					<Link to={`/publicaciones/${key}`}>
						<div className="eye-solid icon"></div>
					</Link>
				)
			}

		))
		return data;
	}
		
	const rows = getUsers()

	return (
		<Paper >
			<div className={classes.tableWrapper}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{columns.map(column => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
									{columns.map(column => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{column.format && typeof value === 'number' ? column.format(value) : value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'previous page',
				}}
				nextIconButtonProps={{
					'aria-label': 'next page',
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper >
	)
}

const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};

export default connect(mapStateToProps)(Tabla);