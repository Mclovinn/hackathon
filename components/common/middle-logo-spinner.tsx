import { CircularProgress } from '@mui/material'
import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import BlockwiseVerticalLogo from '../../lib/icons/blockwise-vertical-logo'
import BlockwiseIcon from '../../lib/icons/blockwise_icon'

const $Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url('images/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const $Spinner = styled.div`
  position: absolute;
  top: 65%;
`

interface Props {
  loading?: boolean
}

const MiddleLogoSpinner = ({ loading }: Props): ReactElement => {
  const [isDesktop, setDesktop] = useState(false)

  const updateMedia = () => {
    setDesktop(window.innerWidth > 620)
  }

  useEffect(() => {
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  })

  useEffect(() => {
    window && setDesktop(window.innerWidth > 620)
  }, [])

  return (
    <$Container>
      {isDesktop ? <BlockwiseIcon width={500} /> : <BlockwiseVerticalLogo width={180} />}
      <$Spinner>{loading && <CircularProgress />}</$Spinner>
    </$Container>
  )
}

export default MiddleLogoSpinner
