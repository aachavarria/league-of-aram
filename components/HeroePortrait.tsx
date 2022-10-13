import useOwnerStores from '@/store/owners.store'
import { PORTRAIT_URL, REROLLED_ALLOWED } from '@/utils/constats'
import random from '../images/random.png'

export const HeroePortrait = (props) => {
  const { owner } = props
  const { reRoll, replaceHeroePortrait } = useOwnerStores()

  const allowDrop = (ev) => {
    ev.preventDefault()
  }

  const drag = (ev) => {
    ev.dataTransfer.setData('text', JSON.stringify({ heroe: ev.target.id, name: owner.name }))
  }

  const drop = (ev) => {
    ev.preventDefault()
    const data = JSON.parse(ev.dataTransfer.getData('text'))
    replaceHeroePortrait(owner.name, owner.heroe, data.name, data.heroe)
  }

  return (
    <div className='relative'>
      <img id={owner.heroe} onDrop={drop} onDragOver={allowDrop} draggable onDragStart={drag} src={`${PORTRAIT_URL}${owner.heroe}_0.jpg`} style={{ height: '100%' }} alt='img' />
      <div className='absolute bottom-2 left-3 text-white'>{owner.name}</div>
      <button className={`absolute bottom-2 right-2 border-2 ${owner.dice >= REROLLED_ALLOWED ? 'border-red-600' : 'border-gray-600'}`} onClick={() => reRoll(owner)}>
        <img src={random.src} className='w-8 h-8' alt='dice' />
      </button>
    </div>
  )
}
