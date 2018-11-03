import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Checkbox from '@material-ui/core/Checkbox';

// Components
import EnhancedTableToolbar from './EnhancedTableToolbar/EnhancedTableToolbar';
import EnhancedTableHeader from './EnhancedTableHeader/EnhancedTableHeader';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: (props.initalOrderByColumnId === null) ? props.columns[0].id : props.initalOrderByColumnId,
            selected: [],
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllCheckbox = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: this.props.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleSelectCheckbox = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { title, classes, columns, data, enableSelect } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} title={title} />
                {this.props.isLoading && <LinearProgress />}
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHeader
                            columns={columns}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllCheckbox}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            enableSelect={enableSelect}
                        />
                        <TableBody>
                            {data
                                .sort(getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(r => {
                                    const isSelected = this.isSelected(r.id);
                                    return (<TableRow key={r.id} className={classes.row} tabIndex={-1}>
                                        {enableSelect &&
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} onChange={event => this.handleSelectCheckbox(event, r.id)} />
                                            </TableCell>
                                        }
                                        {columns.map((col, i) => <TableCell key={`${r.id}-${i}`}>{r[col.id]}</TableCell>)}
                                    </TableRow>);
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        isNumeric: PropTypes.bool.isRequired,
        enableSort: PropTypes.bool.isRequired,
    })).isRequired,
    initalOrderByColumnId: PropTypes.string,
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    enableSelect: PropTypes.bool,
};

EnhancedTable.defaultProps = {
    initalOrderByColumnId: null,
    isLoading: false,
    enableSelect: false,
};

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 720,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

export default withStyles(styles)(EnhancedTable);