import React, { useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import Planet from '../../components/Planet'

const Content = styled.div`
  margin: 2rem auto;
  background: #0000;
  width: 500px;
  text-align: center;
`
const fetchPlanets = async (page: any) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
  const planets = await res.json()
  return planets
}

export async function getStaticProps(page: any) {
  const planets = await fetchPlanets(page)
  return { props: { planets } }
}

export default function Planets() {
  const [page, setPage] = useState(1)

  const { status, data, isFetching } = useQuery(['planets', page], () => fetchPlanets(page), { keepPreviousData: true })
  return (
    <Content>
      <h1>List planets</h1>
      {status === 'loading' && <div> loading data</div>}
      {status === 'error' && <div> error fetching data</div>}
      {data && (
        <div>
          {data?.results?.map((planet: { name: React.Key | null | undefined }) => (
            <>
              <div>
                <Planet key={planet.name} planet={planet} />
              </div>
            </>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(prevState => Math.max(prevState - 1, 0))} disabled={page === 1}>
          Prev Page
        </button>

        <button onClick={() => setPage(prevState => prevState + 1)}>Next Page</button>
      </div>

      <div>{isFetching ? 'Fetching...' : null}</div>
    </Content>
  )
}
