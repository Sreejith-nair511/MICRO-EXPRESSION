"use client"

import { useRef, useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { FacialExpression } from "./mood-mirror"

interface CameraFeedProps {
  active: boolean
  facialExpression: FacialExpression
}

export function CameraFeed({ active, facialExpression }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [permissionGranted, setPermissionGranted] = useState(false)

  useEffect(() => {
    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        if (!active) return

        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setPermissionGranted(true)
          setError(null)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setError("Camera access denied. Please grant permission to use this feature.")
        setPermissionGranted(false)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [active])

  // Draw facial landmarks on canvas
  useEffect(() => {
    if (!active || !permissionGranted || !canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    const drawLandmarks = () => {
      if (!canvas || !video || !ctx) return

      // Match canvas dimensions to video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Only draw if video is playing
      if (video.paused || video.ended) return

      // Simulate facial landmarks based on the current facial expression
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const faceWidth = canvas.width * 0.4
      const faceHeight = canvas.height * 0.6

      // Draw face outline
      ctx.strokeStyle = "#00ff00"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, faceWidth / 2, faceHeight / 2, 0, 0, 2 * Math.PI)
      ctx.stroke()

      // Draw eyes
      const eyeY = centerY - faceHeight * 0.1
      const eyeDistance = faceWidth * 0.25

      // Left eye
      ctx.beginPath()
      ctx.ellipse(centerX - eyeDistance, eyeY, faceWidth * 0.08, faceHeight * 0.05, 0, 0, 2 * Math.PI)
      ctx.stroke()

      // Right eye
      ctx.beginPath()
      ctx.ellipse(centerX + eyeDistance, eyeY, faceWidth * 0.08, faceHeight * 0.05, 0, 0, 2 * Math.PI)
      ctx.stroke()

      // Draw mouth based on expression
      const mouthY = centerY + faceHeight * 0.2
      ctx.beginPath()

      if (facialExpression === "smile") {
        // Happy mouth - upward curve
        ctx.moveTo(centerX - faceWidth * 0.2, mouthY)
        ctx.quadraticCurveTo(centerX, mouthY - faceHeight * 0.1, centerX + faceWidth * 0.2, mouthY)
      } else if (facialExpression === "frown") {
        // Sad mouth - downward curve
        ctx.moveTo(centerX - faceWidth * 0.2, mouthY)
        ctx.quadraticCurveTo(centerX, mouthY + faceHeight * 0.1, centerX + faceWidth * 0.2, mouthY)
      } else {
        // Neutral mouth - straight line
        ctx.moveTo(centerX - faceWidth * 0.2, mouthY)
        ctx.lineTo(centerX + faceWidth * 0.2, mouthY)
      }

      ctx.stroke()

      // Draw eyebrows based on expression
      const eyebrowY = eyeY - faceHeight * 0.08

      if (facialExpression === "eyebrow-raise") {
        // Raised eyebrows
        ctx.beginPath()
        ctx.moveTo(centerX - eyeDistance - faceWidth * 0.1, eyebrowY - faceHeight * 0.03)
        ctx.lineTo(centerX - eyeDistance + faceWidth * 0.1, eyebrowY - faceHeight * 0.05)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(centerX + eyeDistance - faceWidth * 0.1, eyebrowY - faceHeight * 0.05)
        ctx.lineTo(centerX + eyeDistance + faceWidth * 0.1, eyebrowY - faceHeight * 0.03)
        ctx.stroke()
      } else if (facialExpression === "squint") {
        // Furrowed eyebrows
        ctx.beginPath()
        ctx.moveTo(centerX - eyeDistance - faceWidth * 0.1, eyebrowY)
        ctx.lineTo(centerX - eyeDistance + faceWidth * 0.1, eyebrowY - faceHeight * 0.02)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(centerX + eyeDistance - faceWidth * 0.1, eyebrowY - faceHeight * 0.02)
        ctx.lineTo(centerX + eyeDistance + faceWidth * 0.1, eyebrowY)
        ctx.stroke()
      } else {
        // Normal eyebrows
        ctx.beginPath()
        ctx.moveTo(centerX - eyeDistance - faceWidth * 0.1, eyebrowY)
        ctx.lineTo(centerX - eyeDistance + faceWidth * 0.1, eyebrowY)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(centerX + eyeDistance - faceWidth * 0.1, eyebrowY)
        ctx.lineTo(centerX + eyeDistance + faceWidth * 0.1, eyebrowY)
        ctx.stroke()
      }

      // Add text to indicate detected expression
      ctx.fillStyle = "#00ff00"
      ctx.font = "16px sans-serif"
      ctx.fillText(`Detected: ${facialExpression}`, 10, 30)

      requestAnimationFrame(drawLandmarks)
    }

    const animationId = requestAnimationFrame(drawLandmarks)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [active, permissionGranted, facialExpression])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative">
        {error && (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!active && !error && (
          <div className="flex items-center justify-center h-[300px] bg-muted">
            <p className="text-muted-foreground">Camera is inactive. Click "Start Camera" to begin.</p>
          </div>
        )}

        <div className={`relative ${!active && "hidden"}`}>
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto" />
          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
      </CardContent>
    </Card>
  )
}
