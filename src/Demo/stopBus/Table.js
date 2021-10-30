import React from 'react';
import '../Schedule/index.scss';
import { Table } from 'react-bootstrap';
const row = (r, i, headers, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {

  const currentlyEditing = editIdx === i

  return (

    <tr key={`tr-${i}`}>
      <td>{i+1}</td>
      {headers.map((h, k) => (
        <td key={`td-${k}`}>
          {currentlyEditing ?
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleChange(e, h.prop, i)}
              name={h.prop}
              value={r[h.prop]}
            /> : r[h.prop]}
        </td>
      ))}

      {currentlyEditing ?
        <td><i className="material-icons"
          onClick={() => stopEditing(i)}>check_circle</i>
        </td> :

        <td><i className="material-icons"
          onClick={() => startEditing(i)}>edit</i>
        </td>}

      <td><i className="material-icons"
        onClick={() => handleRemove(i)}>delete</i>
      </td>
    </tr>
  )
}



const Table2 = ({ data, headers, handleRemove, startEditing, editIdx, handleChange, stopEditing }) => (
  < div >

    <Table className="sizeTable "  striped  hover size="sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          {headers.map((h, i) =>
            <th key={`th-${i}`} scope="col">{h.name}</th>
          )}
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody >
        {data.map((r, i) =>
          row(r, i, headers,
            handleRemove,
            startEditing,
            editIdx,
            handleChange,
            stopEditing))}
      </tbody>
    </Table>

  </div >
)


export default Table2


