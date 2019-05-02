import React from 'react';
import Table from 'react-md/lib/DataTables/DataTable'
import TableBody from 'react-md/lib/DataTables/TableBody'
import TableRow from 'react-md/lib/DataTables/TableRow'
import TableColumn from 'react-md/lib/DataTables/TableColumn'
import TableHead from 'react-md/lib/DataTables/TableHeader'
import Button from 'react-md/lib/Buttons/Button'

function DataTable(props) {
  const { rows, columns, onRowClick } = props;

  return (
    <Table plain className='iTable'>
      <TableHead>
        <TableRow>
          {columns.map(({ title, headProps = {}}, idx) => (
            <TableColumn key={idx} {...headProps}>{title}</TableColumn>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.length === 0 && (
          <div>No Records Found</div>
        )}
        {rows.map(row => (
          <TableRow
            key={row.id}
            onClick={e => {
              e.stopPropagation()
              onRowClick(row)
            }}
          >
            {columns.map((column, idx) => (
              <Row key={idx} {...column} row={row}/>
            ))
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Row(props) {
  const {
    type, row, accessor, bodyProps = {}, actions = [],
    component: Cell, fn = () => null } = props
  let children
  if (type === 'actions') {
    children = actions.map(({ label, className, icon, onClick, type, component: Action }) => {
      if (type === 'component') {
        return (
          <Action key={icon} row={row} label={label} icon={icon} onClick={onClick} />
        )
      }
      return (
        <Button
          icon
          children={icon}
          tooltipLabel={label}
          key={icon}
          className={className}
          onClick={(e) => {
            e.stopPropagation()
            onClick(row)
          }}
        />
      )
    })
  } else if (type === 'component') {
    children = (
      <Cell row={row} />
    )
  } else if (type === 'function') {
    children = fn(row)
  }else {
    children = row[accessor]
  }
  return (
    <TableColumn {...bodyProps}>{children}</TableColumn>
  )
}

DataTable.defaultProps = {
  onRowClick: () => {}
}

export default DataTable