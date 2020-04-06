/** @jsx jsx */
import { jsx } from '@emotion/core'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'

const emptyGridRef = { update: () => undefined }

type GridRef = typeof emptyGridRef
type Context = { grid: GridRef; setGrid: Dispatch<SetStateAction<GridRef>> }

export const GridContext = createContext<Context>({
  grid: emptyGridRef,
  setGrid: (() => undefined) as Dispatch<SetStateAction<GridRef>>
})

export interface GridProviderProps {
  children: ReactNode
}

export const GridProvider = ({ children }: GridProviderProps) => {
  const [grid, setGrid] = useState<GridRef>(emptyGridRef)
  return (
    <GridContext.Provider value={{ grid, setGrid }}>
      {children}
    </GridContext.Provider>
  )
}

export const useGrid = () => useContext(GridContext)
