import create from 'zustand'

type State = {
  heroes: {
    [name: string]: {
      id: string
    }
  }
  remainingHeroes: {
    [name: string]: {
      id: string
    }
  }
  fetch: () => Promise<any>
  reset: () => void
}

export const useHeroeStores = create<State>((set, get) => ({
  heroes: {},
  remainingHeroes: {},
  fetch: async () => {
    const response = await fetch('https://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json', {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    }).then((response) => response.json())
    set(() => ({ heroes: response.data, remainingHeroes: { ...response.data } }))
    return response
  },
  reset: () => {
    set(() => ({ remainingHeroes: { ...get().heroes } }))
  },
}))

export default useHeroeStores
