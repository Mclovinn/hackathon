import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import { Marker } from './marker/marker'
import { config } from '../../../../config/env.config'
import { EventType } from '../../../../types/tracking.type'

const $Container = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  max-width: 100%;
  max-height: 800px;
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
    zoom: 12,
  }

  const [googleMapProps, setGoogleMapProps] = useState(defaultProps)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  useEffect(() => {
    if (!markers) return

    const lastMark = markers[markers.length - 1]

    // TODO - change default center
    setGoogleMapProps({
      ...googleMapProps,
      center: {
        lat: Number(lastMark.location.latitude),
        lng: Number(lastMark.location.longitude),
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
