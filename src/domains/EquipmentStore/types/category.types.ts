import axios from 'axios'
import { GetEquipmentResponse } from 'domains/EquipmentStore/types/equipment.types'
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { getWzVersion } from 'utils/wz-version.utils'

export const getCategory = async (): Promise<GetEquipmentResponse> => {
  const result = await axios.get(
    `https://maplestory.io/api/${
      import.meta.env.VITE_REGION
    }/${getWzVersion()}/item/category`
  )
  return result.data
}

export const useGetCategory = ({
  options
}: {
  options?: UseQueryOptions<
    GetEquipmentResponse,
    unknown,
    GetEquipmentResponse,
    string[]
  >
}): UseQueryResult<GetEquipmentResponse, unknown> => {
  return useQuery(['getCategory'], () => getCategory(), options)
}
