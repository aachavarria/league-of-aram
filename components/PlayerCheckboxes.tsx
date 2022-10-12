import useOwnerStores from '@/store/owners.store'

export const PlayerCheckboxes = () => {
  const { players, togglePlayer } = useOwnerStores()
  return (
    <ul className='items-center w-full text-sm text-white font-medium bg-gray-600 rounded-lg border border-black sm:flex'>
      {players.map((player) => (
        <li key={player.name} className='w-full border-b border-gray-200 sm:border-b-0'>
          <div className='flex items-center pl-3'>
            <input id='angular-checkbox-list' type='checkbox' defaultChecked={player.checked} onChange={(e) => togglePlayer(player.name, e.target.checked)} />
            <label htmlFor='angular-checkbox-list' className='py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300'>
              {player.name}
            </label>
          </div>
        </li>
      ))}
    </ul>
  )
}
