import { RegionType, WzType } from 'types/wz-version.types'

let currentWz: WzType | null = null

export function initializeWzVersion(wz: WzType): void {
  currentWz = wz
}

export function getWzVersion(): string {
  if (!currentWz) {
    throw new Error('WZ version has not been initialized')
  }

  return currentWz.mapleVersionId
}

export function getWzRegion(): RegionType {
  if (!currentWz) {
    throw new Error('WZ version has not been initialized')
  }

  return currentWz.region
}
