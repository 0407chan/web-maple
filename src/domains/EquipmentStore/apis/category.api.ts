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

const hello = {
  Equip: {
    Accessory: [
      { item1: 'Badge' },
      { item1: 'Belt' },
      { item1: 'Earrings' },
      { item1: 'Emblem' },
      { item1: 'Face Accessory' },
      { item1: 'Medal' },
      { item1: 'Eye Decoration' },
      { item1: 'Earring' },
      { item1: 'Ring' },
      { item1: 'Pendant' },
      { item1: 'Pocket Item' },
      { item1: 'Power Source' },
      { item1: 'Shoulder Accessory' },
      { item1: 'Totem' }
    ],
    Armor: [
      { item1: 'Hat' },
      { item1: 'Cape' },
      { item1: 'Top' },
      { item1: 'Glove' },
      { item1: 'Overall' },
      { item1: 'Bottom' },
      { item1: 'Shield' },
      { item1: 'Shoes' },
      { item1: 'Test Armor' }
    ],
    Other: [
      { item1: 'Android' },
      { item1: 'Dragon Equipment' },
      { item1: 'Mechanical Heart' },
      { item1: 'Mechanic Equipment' },
      { item1: 'Pet Equipment' },
      { item1: 'Bits' },
      { item1: 'Shovel' },
      { item1: 'Pickaxe' },
      { item1: 'Skill Effect' },
      { item1: 'Pet Use' }
    ],
    'One-Handed Weapon': [
      { item1: 'Scepter' },
      { item1: 'One-Handed Axe' },
      { item1: 'Katara' },
      { item1: 'Cane' },
      { item1: 'Dagger' },
      { item1: 'Desperado' },
      { item1: 'Whip Blade' },
      { item1: 'One-Handed Blunt Weapon' },
      { item1: 'Shining Rod' },
      { item1: 'Breath Shooter' },
      { item1: 'Soul Shooter' },
      { item1: 'Staff' },
      { item1: 'One-Handed Sword' },
      { item1: 'Wand' },
      { item1: 'Test Weapon' },
      { item1: 'Cash' },
      { item1: 'Psy-limiter' },
      { item1: 'Chain' },
      { item1: 'Gauntlet' },
      { item1: 'Ritual Fan' },
      { item1: 'Bladecaster' }
    ],
    'Secondary Weapon': [
      { item1: 'Ballast' },
      { item1: 'Magic Marble' },
      { item1: 'Spellbook' },
      { item1: 'Arrow Fletching' },
      { item1: 'Powder Keg' },
      { item1: 'Far Sight' },
      { item1: 'Card' },
      { item1: 'Iron Chain' },
      { item1: 'Bow Thimble' },
      { item1: 'Jewel' },
      { item1: 'Document' },
      { item1: 'Medal' },
      { item1: 'Magic Arrow' },
      { item1: 'Charm' },
      { item1: 'Orb' },
      { item1: 'Rosary' },
      { item1: 'Dagger Scabbard' },
      { item1: 'Wrist Band' },
      { item1: 'Arrowhead' },
      { item1: "Jett's Core" },
      { item1: "Nova's Essence" },
      { item1: 'Soul Ring' },
      { item1: 'Magnum' },
      { item1: 'Kodachi' },
      { item1: 'Whistle' },
      { item1: 'Jett Fists' },
      { item1: 'Mass' },
      { item1: 'Fox Marble' },
      { item1: 'Core Controller' },
      { item1: 'Charges' },
      { item1: 'Chess Piece' },
      { item1: 'Transmitter' },
      { item1: 'Wings' },
      { item1: 'Relic' },
      { item1: 'Lucent Wings' },
      { item1: 'Path' }
    ],
    'Two-Handed Weapon': [
      { item1: 'Two-Handed Axe' },
      { item1: 'Bow' },
      { item1: 'Crossbow' },
      { item1: 'Ancient Bow' },
      { item1: 'Dual Bowgun' },
      { item1: 'Gun' },
      { item1: 'Hand Cannon' },
      { item1: 'Knuckle' },
      { item1: 'Two-Handed Blunt' },
      { item1: 'Pole Arm' },
      { item1: 'Spear' },
      { item1: 'Two-Handed Sword' },
      { item1: 'Claw' },
      { item1: 'Katana' },
      { item1: 'Fan' },
      { item1: 'Lapis' },
      { item1: 'Lazuli' },
      { item1: 'Arm Cannon' }
    ],
    Character: [
      { item1: 'Body' },
      { item1: 'Head' },
      { item1: 'Face' },
      { item1: 'Hair' },
      { item1: 'Face' },
      { item1: 'Hair' }
    ],
    Monster: [{ item1: 'Crusader Codex' }, { item1: 'Monster Battle' }],
    Mount: [{ item1: 'Mount' }]
  }
}
