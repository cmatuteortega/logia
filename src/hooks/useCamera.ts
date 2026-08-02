import { useCallback, useEffect, useRef, useState } from 'react';

const MAX_EDGE = 1280;

type TorchConstraint = MediaTrackConstraintSet & { torch?: boolean };

/** Rear-facing preview + still capture. Falls back silently to the placeholder
 *  viewfinder when there is no camera or the user denies permission. */
export function useCamera(active: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [torch, setTorch] = useState(false);
  const [torchSupported, setTorchSupported] = useState(false);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 } }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const track = stream.getVideoTracks()[0];
        setTorchSupported('torch' in (track?.getCapabilities?.() ?? {}));
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play().catch(() => {});
        }
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setReady(false);
      setTorch(false);
    };
  }, [active]);

  const toggleTorch = useCallback(() => {
    const next = !torch;
    setTorch(next);
    const track = streamRef.current?.getVideoTracks()[0];
    if (track && torchSupported) {
      void track.applyConstraints({ advanced: [{ torch: next } as TorchConstraint] }).catch(() => {});
    }
  }, [torch, torchSupported]);

  const capture = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return null;
    const scale = Math.min(1, MAX_EDGE / Math.max(video.videoWidth, video.videoHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(video.videoWidth * scale);
    canvas.height = Math.round(video.videoHeight * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.82);
  }, []);

  return { videoRef, ready, torch, torchSupported, toggleTorch, capture };
}
