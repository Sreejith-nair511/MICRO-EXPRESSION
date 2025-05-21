"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Emotion } from "./mood-mirror"

interface MoodAvatarProps {
  emotion: Emotion
}

export function MoodAvatar({ emotion }: MoodAvatarProps) {
  const [animationClass, setAnimationClass] = useState("")

  useEffect(() => {
    // Set animation class based on emotion
    switch (emotion) {
      case "happy":
        setAnimationClass("animate-bounce")
        break
      case "sad":
        setAnimationClass("animate-pulse")
        break
      case "surprised":
        setAnimationClass("animate-ping")
        break
      case "disgusted":
        setAnimationClass("animate-spin")
        break
      default:
        setAnimationClass("")
    }
  }, [emotion])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Mood Avatar</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className={`text-7xl ${animationClass}`}>
          {emotion === "happy" && "😊"}
          {emotion === "sad" && "😢"}
          {emotion === "surprised" && "😲"}
          {emotion === "disgusted" && "🤢"}
          {emotion === "neutral" && "😐"}
        </div>
      </CardContent>
    </Card>
  )
}
