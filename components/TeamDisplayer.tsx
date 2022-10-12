import { HeroeAvatar } from '@/components/HeroeAvatar'
import { HeroePortrait } from '@/components/HeroePortrait'
import useOwnerStores from '@/store/owners.store'

export const TeamDisplayer = (props) => {
  const { team } = props
  const { owners, reRoll, reRolledHeroes } = useOwnerStores()
  return (
    <div className='flex'>
      <div className='flex flex-col gap-2 mr-3'>
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
            <HeroePortrait key={i} owner={owner} onReroll={reRoll} />
          ))}
      </section>
    </div>
  )
}
