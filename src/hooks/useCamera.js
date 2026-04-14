import { useState, useRef, useCallback } from 'react';

export function useCamera() {
  const [photo, setPhoto] = useState(null);
  const [stream, setStream] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError(`Camera access denied: ${err.message}`);
      setIsCameraOpen(false);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setPhoto(dataUrl);
    closeCamera();
  }, []);

  const closeCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  }, [stream]);

  const clearPhoto = useCallback(() => {
    setPhoto(null);
  }, []);

  return {
    photo,
    setPhoto,
    isCameraOpen,
    error,
    videoRef,
    canvasRef,
    openCamera,
    capturePhoto,
    closeCamera,
    clearPhoto,
  };
}
