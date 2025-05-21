"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { EmotionData } from "./mood-mirror"

interface MoodDashboardProps {
  currentEmotion: EmotionData
  emotionHistory: EmotionData[]
}

export function MoodDashboard({ currentEmotion, emotionHistory }: MoodDashboardProps) {
  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "happy":
        return "bg-green-500"
      case "sad":
        return "bg-blue-500"
      case "surprised":
        return "bg-yellow-500"
      case "disgusted":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getEmotionMessage = (emotion: string) => {
    switch (emotion) {
      case "happy":
        return "You're radiating positivity! Keep that smile going!"
      case "sad":
        return "It's okay to feel blue sometimes. Need a virtual hug?"
      case "surprised":
        return "Whoa! Did something unexpected just happen?"
      case "disgusted":
        return "Yikes! Did you smell something funky?"
      default:
        return "Keeping it cool and collected, I see."
    }
  }

  const formatConfidence = (confidence: number) => {
    return `${Math.round(confidence * 100)}%`
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Current Mood</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold capitalize">{currentEmotion.emotion}</span>
              <span className="text-lg font-medium">{formatConfidence(currentEmotion.confidence)}</span>
            </div>

            <Progress
              value={currentEmotion.confidence * 100}
              className={`h-2 ${getEmotionColor(currentEmotion.emotion)}`}
            />

            <p className="text-sm text-muted-foreground italic">{getEmotionMessage(currentEmotion.emotion)}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Mood History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-20 items-end gap-1">
            {emotionHistory.map((data, index) => (
              <div
                key={index}
                className={`w-full ${getEmotionColor(data.emotion)}`}
                style={{
                  height: `${data.confidence * 100}%`,
                  opacity: 0.3 + (index / emotionHistory.length) * 0.7,
                }}
                title={`${data.emotion} (${formatConfidence(data.confidence)})`}
              />
            ))}
            {emotionHistory.length === 0 && (
              <div className="w-full text-center text-muted-foreground py-8">
                No mood data yet. Start the camera to begin tracking.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
