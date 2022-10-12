import { AVATAR_URL } from '@/utils/constats'

export const HeroeAvatar = (props) => {
  const { name } = props
  return <img src={`${AVATAR_URL}${name}.png`} className='w-20' alt='img' />
}
