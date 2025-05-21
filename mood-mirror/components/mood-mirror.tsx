"use client"

import { useState, useEffect } from "react"
import { CameraFeed } from "./camera-feed"
import { MoodDashboard } from "./mood-dashboard"
import { MoodAvatar } from "./mood-avatar"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, CameraOff } from "lucide-react"

export type Emotion = "happy" | "sad" | "surprised" | "disgusted" | "neutral"

export type EmotionData = {
  emotion: Emotion
  confidence: number
  timestamp: number
}

export type FacialExpression = "smile" | "frown" | "eyebrow-raise" | "squint" | "neutral"

export function MoodMirror() {
  const [cameraActive, setCameraActive] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData>({
    emotion: "neutral",
    confidence: 0.8,
    timestamp: Date.now(),
  })
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([])
  const [facialExpression, setFacialExpression] = useState<FacialExpression>("neutral")

  // Simulate emotion detection
  useEffect(() => {
    if (!cameraActive) return

    const emotions: Emotion[] = ["happy", "sad", "surprised", "disgusted", "neutral"]
    const expressions: FacialExpression[] = ["smile", "frown", "eyebrow-raise", "squint", "neutral"]

    const interval = setInterval(() => {
      // Randomly select an emotion and expression
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)]
      const randomExpression = expressions[Math.floor(Math.random() * expressions.length)]

      // Generate a random confidence score between 0.6 and 1.0
      const confidence = 0.6 + Math.random() * 0.4

      const newEmotionData = {
        emotion: randomEmotion,
        confidence,
        timestamp: Date.now(),
      }

      setCurrentEmotion(newEmotionData)
      setFacialExpression(randomExpression)
      setEmotionHistory((prev) => [...prev.slice(-19), newEmotionData])
    }, 2000)

    return () => clearInterval(interval)
  }, [cameraActive])

  const toggleCamera = () => {
    setCameraActive((prev) => !prev)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">MoodMirror</h1>
        <ThemeToggle />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Emotion Detection</CardTitle>
          <CardDescription>
            MoodMirror uses your camera to detect micro-expressions and predict your emotional state.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={toggleCamera} variant={cameraActive ? "destructive" : "default"}>
              {cameraActive ? <CameraOff className="mr-2 h-4 w-4" /> : <Camera className="mr-2 h-4 w-4" />}
              {cameraActive ? "Stop Camera" : "Start Camera"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <CameraFeed active={cameraActive} facialExpression={facialExpression} />
              <MoodAvatar emotion={currentEmotion.emotion} />
            </div>

            <MoodDashboard currentEmotion={currentEmotion} emotionHistory={emotionHistory} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
