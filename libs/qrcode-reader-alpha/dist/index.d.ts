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
  deviceId?: string
  facingMode?: string
}
declare function QrCodeReader({
  delay,
  width,
  height,
  onRead,
  action,
  deviceId,
  facingMode,
}: QrCodeReaderProps): JSX.Element

export { QrCodeReaderProps, QrCodeReader as default }
