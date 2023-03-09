/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { QRCode } from 'jsqr'
export { QRCode } from 'jsqr'
export { WebcamProps } from 'react-webcam'

interface QrCodeReaderProps {
  delay: number
  width: number
  height: number
  onRead?: (code: QRCode) => void
  action?: (str: string) => void
  videoConstraints?: MediaStreamConstraints['video']
}
declare function QrCodeReader({
  delay,
  width,
  height,
  onRead,
  action,
  videoConstraints,
}: QrCodeReaderProps): JSX.Element

export { QrCodeReaderProps, QrCodeReader as default }
