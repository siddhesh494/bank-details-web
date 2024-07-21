import React from 'react'
import { map } from 'lodash'

const Table = ({
  headers,
  data,
  handleAccountNumberClick
}) => {
  return (
    <table
      className="table-auto w-full bg-white border border-gray-300 "
    >
      <thead className="bg-blue-400 text-white">
        <tr>
          {map(headers, (value, key) => {
            return (
              <th key={key} className="border border-gray-300 px-4 py-2">{value}</th>
            )
          })}
        </tr>
      </thead>

      {data.length ? (
        <tbody>
          {map(data, (obj, ind) => {
            return (
              <tr key={ind}>
                {map(obj, (value, key) => {
                  if(headers[key]) {
                    return (
                      <td 
                        className={`border border-gray-300 px-4 py-2 ${key === 'accountNumber' ? "cursor-pointer underline text-blue-500" : ""}`}
                        onClick={() => {
                          if(key === 'accountNumber') {
                            handleAccountNumberClick(value)
                          }
                        }}  
                        key={key}
                      >
                        {value}
                      </td>
                    )
                  }
                })}
              </tr>
            )
          })}
        </tbody>
      ) : (
        <tbody className=''>
          <tr className='text-center'>
            No data found
          </tr>
        </tbody>
      )}
      
    </table>
  )
}

export default Table