import { RootState } from '@/store'
import { useSelector } from 'react-redux'

const useUser = () => {
  const user = useSelector((state: RootState) => state.user.user)

  return {
    user
  }
}

export default useUser
