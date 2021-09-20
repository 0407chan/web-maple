import {
  GetEquipmentListQuery,
  GetEquipmentListResponse,
  GetEquipmentQuery,
  GetEquipmentResponse
} from '@/types/equipment'
import axios, { AxiosResponse } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

export const getEquipment = async (
  query: GetEquipmentQuery
): Promise<AxiosResponse<GetEquipmentResponse>> => {
  const result = await axios.get(
    `https://maplestory.io/api/KMS/352/item/${query.itemId}`
  )
  return result.data
}

export const useGetEquipment = (
  query: GetEquipmentQuery
): UseQueryResult<GetEquipmentResponse, unknown> => {
  return useQuery(
    ['getEquipment', query],
    async () => {
      return getEquipment(query)
    },
    { retry: false, refetchOnWindowFocus: false, keepPreviousData: true }
  )
}

export const getEquipmentList = async (
  query?: GetEquipmentListQuery
): Promise<AxiosResponse<GetEquipmentListResponse>> => {
  const result = await axios.get('https://maplestory.io/api/KMS/352/item', {
    params: query
  })
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
