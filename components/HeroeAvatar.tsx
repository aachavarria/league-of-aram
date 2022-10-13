import useOwnerStores from '@/store/owners.store'
import { AVATAR_URL } from '@/utils/constats'

export const HeroeAvatar = (props) => {
  const { name, team } = props
  const { replaceHeroePortrait } = useOwnerStores()

  const allowDrop = (ev) => {
    ev.preventDefault()
  }

  const drag = (ev) => {
    ev.dataTransfer.setData('text', JSON.stringify({ heroe: ev.target.id, team }))
  }

  const drop = (ev) => {
    ev.preventDefault()
    const data = JSON.parse(ev.dataTransfer.getData('text'))
    if (data.team !== team) {
      return
    }
    replaceHeroePortrait(null, name, data.name, data.heroe)
  }

  return <img id={name} onDrop={drop} onDragOver={allowDrop} draggable onDragStart={drag} src={`${AVATAR_URL}${name}.png`} className='w-20' alt='img' />
}
