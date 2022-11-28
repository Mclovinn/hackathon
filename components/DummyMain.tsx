import { Trans } from '@lingui/macro'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.background};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.palette.primary};
`

const SubTitle = styled.h2`
  color: ${({ theme }) => theme.palette.secondary};
`

const Text = styled.span`
  color: ${({ theme }) => theme.palette.text};
`

const DummyMain = (): ReactElement => {
  return (
    <Container>
      <Title>
        <Trans id="dummyMainTitle">This is a title</Trans>
      </Title>
      <SubTitle>
        <Trans id="dummyMainSubtitle">This is a sub title</Trans>
      </SubTitle>
      <Text>
        <Trans id="dummyMainText">And this is a text</Trans>
      </Text>
    </Container>
  )
}

export default DummyMain
