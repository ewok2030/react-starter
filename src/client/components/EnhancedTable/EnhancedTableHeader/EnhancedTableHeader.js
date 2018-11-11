import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

class EnhancedTableHeader extends React.Component {
  createSortHandler = property => (event) => {
    const { onRequestSort } = this.props;
    onRequestSort(event, property);
  };

  render() {
    const {
      columns, onSelectAllClick, order, orderBy, numSelected, rowCount, enableSelect
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {enableSelect && (
            <TableCell padding="checkbox">
              <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount} checked={numSelected === rowCount} onChange={onSelectAllClick} />
            </TableCell>
          )}

          {columns.map(
            col => (
              <TableCell key={col.id} numeric={col.isNumeric} sortDirection={orderBy === col.id ? order : false}>
                {col.enableSort ? (
                  <Tooltip title="Sort" placement={col.isNumeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                    <TableSortLabel active={orderBy === col.id} direction={order} onClick={this.createSortHandler(col.id)}>
                      {col.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  col.label
                )}
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      isNumeric: PropTypes.bool.isRequired,
      enableSort: PropTypes.bool.isRequired
    })
  ).isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  enableSelect: PropTypes.bool.isRequired
};

EnhancedTableHeader.defaultProps = {
  onSelectAllClick: null
};

export default EnhancedTableHeader;
