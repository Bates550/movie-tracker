import React from 'react'
const { string } = React.PropTypes

export const Row = ({
  imgUrl,
  title,
  year,
  runtime,
}) => {
  return (
    <tr>
      <td><img src={imgUrl}/></td>
      <td>{title} ({year})</td>
      <td>{runtime}</td>
    </tr>
  )
}

Row.propTypes = {
  imgUrl: string,
  title: string,
  year: string,
  runtime: string,
}
