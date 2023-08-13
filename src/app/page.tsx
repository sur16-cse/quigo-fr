import Hero from '@/components/Hero'
import Image from 'next/image'
import {LoadEnv} from '@/domain/api'

export default function Home() {
  LoadEnv()
  return (
    <main className="flex min-h-screen flex-col bg-primary-color">
      <Hero />
    </main>
  )
}
