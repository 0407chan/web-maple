import axios from 'axios'
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query'
import {
  GetEquipmentListQuery,
  GetEquipmentListResponse,
  GetEquipmentQuery,
  GetEquipmentResponse
} from 'types/equipment'

export const getEquipment = async (
  query: GetEquipmentQuery
): Promise<GetEquipmentResponse> => {
  const result = await axios.get(
    `https://maplestory.io/api/${import.meta.env.VITE_REGION}/${
      import.meta.env.VITE_VERSION
    }/item/${query.itemId}`
  )
  return result.data
}

export const getEquipmentRawImage = async (
  query: GetEquipmentQuery
): Promise<string> => {
  const result = await axios
    .get(
      `https://maplestory.io/api/${import.meta.env.VITE_REGION}/${
        import.meta.env.VITE_VERSION
      }/item/${query.itemId}/iconRaw`,
      {
        responseType: 'arraybuffer'
      }
    )
    .then((response) => {
      const blob = new Blob([response.data], {
        type: response.headers['content-type']
      })
      const image = URL.createObjectURL(blob)
      return image
    })

  return result
}

export const useGetEquipment = ({
  query,
  options
}: {
  query: GetEquipmentQuery
  options?: UseQueryOptions<
    GetEquipmentResponse,
    unknown,
    GetEquipmentResponse,
    (string | GetEquipmentQuery)[]
  >
}): UseQueryResult<GetEquipmentResponse, unknown> => {
  return useQuery(['getEquipment', query], () => getEquipment(query), options)
}

export const getEquipmentList = async (
  query?: GetEquipmentListQuery
): Promise<GetEquipmentListResponse> => {
  const wzVersion = localStorage.getItem('wzVersion')
  const result = await axios.get(
    `https://maplestory.io/api/${import.meta.env.VITE_REGION}/${
      wzVersion || import.meta.env.VITE_VERSION
    }/item`,
    {
      params: query
    }
  )
  return result.data
}

export const useGetEquipmentList = (
  query?: GetEquipmentListQuery
): UseQueryResult<GetEquipmentListResponse, unknown> => {
  return useQuery(
    ['getEquipmentList', query],
    async () => {
      return getEquipmentList(query)
    },
    { retry: false, refetchOnWindowFocus: false, keepPreviousData: true }
  )
}
