import React, { ReactElement } from 'react'
import { InferGetServerSidePropsType } from 'next'
import { useQuery } from 'react-query'
import styled from 'styled-components'

const InfoBox = styled.div`
  background: #222;
  color: #ddd;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: auto;
  row-gap: 20px;
  border-radius: 8px;
  padding-bottom: 20px;
  margin-top: 50px;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.palette.primary};
`

interface Person {
  name: string
}

type FetchPeople = {
  results: Person[]
}

type PeopleType = {
  people: Person[]
}

type ServerProps = {
  props: PeopleType
}
const fetchPeople = async (): Promise<Person[]> => {
  //this function hits the API and save the data at people as a json file.
  const res = await fetch('http://swapi.dev/api/people/')
  const people: FetchPeople = await res.json()
  return people.results
}

//here, we call the previous func, but on the server side, "people" is the final object than we will pass to the component.
export const getServerSideProps = async (): Promise<ServerProps> => {
  const data = await fetchPeople()

  return {
    props: {
      people: data,
    },
  }
}

const People = ({ people }: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement => {
  //at useQuery, we pass 3 attributes: a unique key, the function that makes the fetch, and a initial data,
  //this provide initialData to a query to prepopulate its cache if empty, we pass "people",which we get in the previous function
  const { data, status } = useQuery('people', fetchPeople, { initialData: people })
  console.log(data, status)
  return (
    <InfoBox>
      <Title>People</Title>
      {status === 'success' ? (
        people.map(
          (
            person,
            index //we can work with the RQ returned element, status
          ) => <div key={index}>{person.name}</div>
        )
      ) : (
        <div>error</div>
      )}
    </InfoBox>
  )
}

export default People
