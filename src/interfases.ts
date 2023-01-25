export interface SearchFormData {
    inputCity: string
    inputIn: string
    inputOut: string
    inputMaxPrice: number
}
export interface Message {
    type: string,
    text: string
}
export interface Action {
    name: string,
    handler: () => void
}
export interface Estates {
    img: string,
    imgAlt: string,
    free: boolean,
    city: string,
    name: string,
    price: number,
    distanse: string,
    describe: string,
    id: string
}
export interface Favorites {
    id: string,
    name: string,
    img: string
}

