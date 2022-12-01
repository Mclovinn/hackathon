import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import styled from 'styled-components'
import { Marker } from './marker/marker'
import { AddressType } from '../../../../types/address.type'

const $MapContainer = styled.div`
  height: 500px;
  width: 100%;
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
    <$MapContainer>
      {isMapLoaded && (
        <GoogleMapReact
          // TODO - Add apikey to .env
          bootstrapURLKeys={{ key: 'AIzaSyDQNOfJ5jYbCl9qryeIge7FpzGnSle26HE' }}
          defaultCenter={googleMapProps.center}
          defaultZoom={googleMapProps.zoom}
        >
          {markers &&
            markers.map((marker, index) => (
              <Marker key={index} number={index} lat={marker.latitude} lng={marker.longitude} />
            ))}
        </GoogleMapReact>
      )}
    </$MapContainer>
  )
}
