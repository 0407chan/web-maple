import axios from 'axios'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import { WzType } from 'types/wz-version.types'

export const getWzVersion = async (): Promise<WzType[]> => {
  const result = await axios.get('https://maplestory.io/api/wz')
  return result.data
}

export const useGetWzVersion = ({
  options
}: {
  options?: UseQueryOptions<WzType[], unknown, WzType[], string[]>
}): UseQueryResult<WzType[], unknown> => {
  return useQuery(['getWzVersion'], () => getWzVersion(), options)
}
