import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
  const { classes, rows, columns } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map(({ title, headProps = {}}) => (
              <TableCell {...headProps}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {columns.map((column, idx) => (
                <Row key={column.title} {...column} row={row}/>
              ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

function Row(props) {
  const { type, row, accessor, bodyProps = {}, actions = [] } = props
  let children
  if (type === 'actions') {
    children = actions.map(({ label, className, icon, onClick }) => (
      <IconButton aria-label={label} className={className} onClick={onClick}>
        <Icon children={icon} />
      </IconButton>
    ))
  } else {
    children = row[accessor]
  }
  return (
    <TableCell {...bodyProps}>{children}</TableCell>
  )
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
