import axios from 'axios'
import { GetEquipmentResponse } from 'domains/EquipmentStore/types/equipment.types'
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { getWzRegion, getWzVersion } from 'utils/wz-version.utils'

export const getCategory = async (): Promise<GetEquipmentResponse> => {
  const result = await axios.get(
    `https://maplestory.io/api/${getWzRegion()}/${getWzVersion()}/item/category`
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
