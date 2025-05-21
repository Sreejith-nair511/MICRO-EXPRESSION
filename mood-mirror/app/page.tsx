import { MoodMirror } from "@/components/mood-mirror"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <MoodMirror />
    </main>
  )
}
