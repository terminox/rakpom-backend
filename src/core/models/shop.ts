import CoordinatesItem from './coordinates_item'
import ImageItem from './image_item'

export class OperatingDays {
  sunday: boolean
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thursday: boolean
  friday: boolean
  saturday: boolean

  constructor(
    sunday: boolean,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean
  ) {
    this.sunday = sunday
    this.monday = monday
    this.tuesday = tuesday
    this.wednesday = wednesday
    this.thursday = thursday
    this.friday = friday
    this.saturday = saturday
  }
}

export class OperatingHours {
  open: string
  close: string

  constructor(open: string, close: string) {
    this.open = open
    this.close = close
  }
}

export default class Shop {
  id: string
  shopName: string
  shopOwnerName: string
  coordinates: CoordinatesItem
  phone: string
  bankName: string
  bankAccountNumber: string
  operatingDays: OperatingDays
  operatingHours: OperatingHours
  juniorPriceTHB: number
  seniorPriceTHB: number
  shopImages: ImageItem[]
  hairStyleImages: ImageItem[]

  constructor(
    id: string,
    shopName: string,
    shopOwnerName: string,
    coordinates: CoordinatesItem,
    phone: string,
    bankName: string,
    bankAccountNumber: string,
    operatingDays: OperatingDays,
    operatingHours: OperatingHours,
    juniorPriceTHB: number,
    seniorPriceTHB: number,
    shopImages: ImageItem[],
    hairStyleImages: ImageItem[]
  ) {
    this.id = id
    this.shopName = shopName
    this.shopOwnerName = shopOwnerName
    this.coordinates = coordinates
    this.phone = phone
    this.bankName = bankName
    this.bankAccountNumber = bankAccountNumber
    this.operatingDays = operatingDays
    this.operatingHours = operatingHours
    this.juniorPriceTHB = juniorPriceTHB
    this.seniorPriceTHB = seniorPriceTHB
    this.shopImages = shopImages
    this.hairStyleImages = hairStyleImages
  }
}
