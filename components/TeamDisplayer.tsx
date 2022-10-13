import { HeroeAvatar } from '@/components/HeroeAvatar'
import { HeroePortrait } from '@/components/HeroePortrait'
import useOwnerStores from '@/store/owners.store'

export const TeamDisplayer = (props) => {
  const { team } = props
  const { owners, reRolledHeroes } = useOwnerStores()
  return (
    <div className='flex h-3/6 relative'>
      <div className='grid grid-cols-2 gap-2 mr-3 absolute'>
        {reRolledHeroes
          .filter((heroe) => heroe.team === team)
          .map((heroe, i) => (
            <HeroeAvatar key={i} name={heroe.id} />
          ))}
      </div>
      <section className='flex w-full gap-3 mb-3 justify-center'>
        {owners
          .filter((owner) => owner.team === team)
          .map((owner, i) => (
            <HeroePortrait key={i} owner={owner} />
          ))}
      </section>
    </div>
  )
}
