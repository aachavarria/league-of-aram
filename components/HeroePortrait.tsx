import { PORTRAIT_URL } from '@/utils/constats'
import random from '../images/random.png'

export const HeroePortrait = (props) => {
  const { owner, onReroll } = props
  return (
    <div className='relative'>
      <img src={`${PORTRAIT_URL}${owner.heroe}_0.jpg`} style={{ height: '100%' }} alt='img' />
      <div className='absolute bottom-2 left-3 text-white'>{owner.name}</div>
      <button className={`absolute bottom-2 right-2 border-2 ${owner.dice >= 2 ? 'border-red-600' : 'border-gray-600'}`} onClick={() => onReroll(owner)}>
        <img src={random.src} className='w-8 h-8' alt='dice' />
      </button>
    </div>
  )
}
