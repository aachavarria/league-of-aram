import useHeroeStores from '@/store/main.store'
import { PLAYERS } from '@/utils/constats'
import uniqueRandomArray from 'unique-random-array'
import create from 'zustand'

interface Owner {
  name: string
  team: number
  heroe: string
  dice: number
}

interface Player {
  name: string
  checked: boolean
}

interface Heroe {
  id: string
  team: number
}

type State = {
  owners: Owner[]
  reRolledHeroes: Heroe[]
  players: Player[]
  generateMatch: () => void
  reRoll: (owner: Owner) => void
  togglePlayer: (owner: string, checked: boolean) => void
  reset: () => void
  replaceHeroePortrait: (ownerName: string, ownerHero: string, dropOwner: string, dropHero: string) => void
}

declare global {
  interface Window {
    karo: boolean
  }
}

export const useOwnerStores = create<State>((set, get) => ({
  owners: [],
  reRolledHeroes: [],
  players: PLAYERS,
  generateMatch: async () => {
    const { remainingHeroes } = useHeroeStores.getState()
    const random = uniqueRandomArray(Object.values(remainingHeroes).map((heroe) => heroe.id))
    const _owners = get()
      .players.filter(({ checked }) => checked)
      .sort(() => 0.5 - Math.random())

    const owners = _owners.map((player, i) => {
      const heroe = window.karo && player.name === 'mvkro' ? ['Annie', 'Lux', 'Ahri', 'Garen', 'Lulu', 'Leona'].sort(() => 0.5 - Math.random())[0] : random()
      delete remainingHeroes[heroe]
      return {
        name: player.name,
        team: i < _owners.length / 2 ? 0 : 1,
        heroe,
        dice: 0,
      }
    })

    useHeroeStores.setState({ remainingHeroes })
    set(() => ({ owners }))
  },
  reRoll: (owner) => {
    const { remainingHeroes, heroes } = useHeroeStores.getState()
    const _reRolledHeroes = get().reRolledHeroes
    set({ reRolledHeroes: [..._reRolledHeroes, { ...heroes[owner.heroe], team: owner.team }] })
    const random = uniqueRandomArray(Object.values(remainingHeroes).map((heroe) => heroe.id))
    const heroe = random()
    const _owners = [...get().owners]
    const one = _owners.find((_owner) => _owner.name === owner.name)
    one.heroe = heroe
    one.dice = one.dice + 1
    delete remainingHeroes[heroe]
    set({ owners: _owners })
    useHeroeStores.setState({ remainingHeroes })
  },
  togglePlayer: (name, checked) => {
    const players = [...get().players]
    const player = players.find((player) => player.name === name)
    player.checked = checked
  },
  replaceHeroePortrait: (ownerName: string, ownerHero: string, dropOwner: string, dropHero: string) => {
    const _owners = [...get().owners]
    const _reRolledHeroes = [...get().reRolledHeroes]
    if (ownerName) {
      const one = _owners.find((_owner) => _owner.name === ownerName)
      one.heroe = dropHero
    } else {
      const avatar = _reRolledHeroes.find((hero) => hero.id === ownerHero)
      avatar.id = dropHero
    }
    if (!dropOwner) {
      const avatar2 = _reRolledHeroes.find((hero) => hero.id === dropHero)
      avatar2.id = ownerHero
    } else {
      const two = _owners.find((_owner) => _owner.name === dropOwner)
      two.heroe = ownerHero
    }
    set({ owners: _owners, reRolledHeroes: _reRolledHeroes })
  },
  reset: () => {
    set({ owners: [], reRolledHeroes: [] })
  },
}))

export default useOwnerStores
