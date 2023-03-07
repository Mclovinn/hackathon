/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { jsx } from 'react/jsx-runtime';
import React from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

function QrCodeReader(_a) {
    var delay = _a.delay, width = _a.width, height = _a.height, onRead = _a.onRead, action = _a.action, deviceId = _a.deviceId, facingMode = _a.facingMode;
    var webcamRef = React.useRef(null);
    var analyze = React.useCallback(function () {
        var _a, _b;
        if (!webcamRef)
            return;
        if (!webcamRef.current)
            return;
        var imgSrc = (_b = (_a = webcamRef.current
            .getCanvas()) === null || _a === void 0 ? void 0 : _a.getContext('2d')) === null || _b === void 0 ? void 0 : _b.getImageData(0, 0, width, height);
        if (!imgSrc)
            return;
        if (!imgSrc.data)
            return;
        var code = jsQR(imgSrc.data, width, height);
        if (code) {
            if (onRead)
                onRead(code);
            if (action)
                action(code.data);
        }
    }, [webcamRef, width, height, onRead, action]);
    React.useEffect(function () {
        var interval = setInterval(function () {
            analyze();
        }, delay);
        return function () { return clearInterval(interval); };
    });
    return (jsx(Webcam, { audio: false, ref: webcamRef, width: width, height: height, videoConstraints: { deviceId: deviceId, facingMode: facingMode } }));
}

export { QrCodeReader as default };
