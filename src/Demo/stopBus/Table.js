import React from 'react';
import '../Schedule/index.scss';

const row = (r, i, headers, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {

  const currentlyEditing = editIdx === i

  return (

    <tr key={`tr-${i}`}>
      <td>{i}</td>
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



const Table = ({ data, headers, handleRemove, startEditing, editIdx, handleChange, stopEditing }) => (
  < div >
    
      <table className="table sizeTable ">
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
      </table>
    
  </div >
)


export default Table


