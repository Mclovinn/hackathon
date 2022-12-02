import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import { Marker } from './marker/marker'
import { config } from '../../../../config/env.config'
import { EventType } from '../../../../types/tracking.type'

const $Container = styled.div`
  margin-top: 40px;
  height: 450px;
  width: calc(100% - 400px);
`

interface MapProps {
  markers?: EventType[]
}

export const Map = ({ markers }: MapProps) => {
  // Map TODO - Center in an average latitude and longitude
  let defaultProps = {
    center: {
      lat: 0,
      lng: 0,
    },
    zoom: 13,
  }

  const [googleMapProps, setGoogleMapProps] = useState(defaultProps)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  useEffect(() => {
    if (!markers) return

    // TODO - change default center
    setGoogleMapProps({
      ...googleMapProps,
      center: {
        lat: -31.3594539,
        lng: -64.208464,
      },
    })
    setIsMapLoaded(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers])

  return (
    // Important! Always set the container height explicitly
    <$Container>
      {isMapLoaded && (
        <GoogleMapReact
          // TODO - Add apikey to .env
          bootstrapURLKeys={{ key: config.googleCloudConfig.apiKey }}
          defaultCenter={googleMapProps.center}
          defaultZoom={googleMapProps.zoom}
        >
          {markers &&
            markers.map((marker, index) => (
              <Marker key={index} number={index + 1} lat={marker.location.latitude} lng={marker.location.longitude} />
            ))}
        </GoogleMapReact>
      )}
    </$Container>
  )
}
