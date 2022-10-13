import { PlayerCheckboxes } from '@/components/PlayerCheckboxes'
import { TeamDisplayer } from '@/components/TeamDisplayer'
import useHeroeStores from '@/store/main.store'
import useOwnerStores from '@/store/owners.store'
import { BACKGROUND_URL } from '@/utils/constats'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const { fetch, reset } = useHeroeStores()
  const { generateMatch, reset: _reset } = useOwnerStores()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    fetch().then(() => {
      setReady(true)
    })
  }, [fetch, generateMatch])

  const onGenerateMatch = () => {
    reset()
    _reset()
    generateMatch()
  }

  return (
    <div>
      <Head>
        <title>League of Arams</title>
        <meta name='description' content='Arams Generator for League of Legends' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main
        className='flex flex-col gap-3 p-8 h-screen pt-32'
        style={{
          backgroundImage: `url(${BACKGROUND_URL})`,
        }}
      >
        <div className='absolute z-10 top-3 right-10 left-10 flex flex-col gap-2'>
          <PlayerCheckboxes />
          <button
            type='button'
            disabled={!ready}
            onClick={onGenerateMatch}
            className='self-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            WE ARE READY
          </button>
        </div>
        <TeamDisplayer team={0} />
        <TeamDisplayer team={1} />
      </main>
    </div>
  )
}
