import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import { Marker } from './marker/marker'
import { AddressType } from '../../../../types/address.type'
import { config } from '../../../../config/env.config'

const $Container = styled.div`
  margin-top: 40px;
  height: 450px;
  width: calc(100% - 400px);
`

interface MapProps {
  markers?: AddressType[]
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

    setGoogleMapProps({
      ...googleMapProps,
      center: {
        lat: markers[markers.length - 1].latitude,
        lng: markers[markers.length - 1].longitude,
      },
    })
    setIsMapLoaded(true)
  }, [googleMapProps, markers])

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
              <Marker key={index} number={index} lat={marker.latitude} lng={marker.longitude} />
            ))}
        </GoogleMapReact>
      )}
    </$Container>
  )
}
