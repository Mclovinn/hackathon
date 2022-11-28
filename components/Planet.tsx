import React from 'react'

interface Planet {
  id: any
  name: string
  population: string
  terrain: string
}

type Props = {
  planet: any
}

const Planet = ({ planet }: Props) => {
  return (
    <div>
      <h3>{planet.name}</h3>
      <p>Population - {planet.population}</p>
      <p>Terrain - {planet.terrain} </p>
      <hr />
    </div>
  )
}
export default Planet
