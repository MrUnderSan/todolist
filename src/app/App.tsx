import './App.css'
import { Decks } from '../features/decks/Decks.tsx'
import { GlobalError } from './GlobalError/GlobalError.tsx'
import { useAppSelector } from './store.ts'
import { LinearLoader } from '../common/components/Loader/LinearLoader.tsx'
import { selectAppStatus } from './app-selectors.ts'

export const App = () => {

  const appStatus = useAppSelector(selectAppStatus)
  const isAppLoading = appStatus === 'loading'

  return (
    <div>
      {isAppLoading && <LinearLoader />}
      <Decks />
      <GlobalError />
    </div>
  )
}
