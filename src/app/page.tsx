import Hero from '@/components/Hero'
import Image from 'next/image'
import {LoadEnv} from '@/domain/auth/api'

export default function Home() {
  LoadEnv()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-primary-color">
      <Hero />
    </main>
  )
}
