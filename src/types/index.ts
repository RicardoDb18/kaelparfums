export type CategoryType = 'arabes' | 'disenador' | 'nicho'
export type Gender = 'masculino' | 'femenino' | 'unisex'

export interface Product {
  id: string
  name: string
  brand: string
  description: string
  notes: string[]
  categoryType: CategoryType
  gender: Gender
  concentrations: Concentration[]
  images: string[]
  rating: number
  reviews: number
  isNew?: boolean
  isDecant?: boolean
}

export interface Concentration {
  type: 'EDP' | 'EDT' | 'Parfum' | 'Extrait'
  sizes: SizeOption[]
}

export interface SizeOption {
  ml: number
  price: number
  originalPrice?: number
  inStock: boolean
}

export interface Brand {
  id: string
  name: string
  logo: string
  description: string
  slug: string
}

export interface CartItem {
  product: Product
  concentration: string
  size: number
  quantity: number
}
