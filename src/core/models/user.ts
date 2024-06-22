import ImageItem from './image_item'

export enum UserGender {
  Male,
  Female,
}

export default class User {
  id: string
  name: string
  gender: UserGender
  age: number
  phone: string
  email: string | null
  avatar: ImageItem

  constructor(
    id: string,
    name: string,
    gender: UserGender,
    age: number,
    phone: string,
    email: string | null,
    avatar: ImageItem
  ) {
    this.id = id
    this.name = name
    this.gender = gender
    this.age = age
    this.phone = phone
    this.email = email
    this.avatar = avatar
  }
}
