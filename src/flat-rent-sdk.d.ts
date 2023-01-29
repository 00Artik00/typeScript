export interface Database {
    id: string,
    title: string,
    details: string,
    photos: [string, string],
    coordinates: [number, number],
    bookedDates: [],
    price?: number
    totalPrice?: number
}
export interface Parameters {
    city: string,
    checkInDate: Date,
    checkOutDate: Date,
    priceLimit: number
}
export const database: Database[]


export function cloneDate(date: Date): Date
export function addDays(date: Date, days: number): Date

export const backendPort: number
export const localStorageKey: string

export class FlatRentSdk {

    get(id: string): Promise<Object | null>
    search(parameters: Parameters): Promise<Database[]>
    book(flatId: string, checkInDate: Date, checkOutDate: Date): Promise<Object | null>

    _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void

    _resetTime(date: Date): void

    _calculateDifferenceInDays(startDate: Date, endDate: Date): number

    _generateDateRange(from: Date, to: Date): Date[]

    _generateTransactionId: () => number

    _areAllDatesAvailable(flat: Database, dateRange: Date[]): boolean

    _formatFlatObject(flat: Database, nightNumber: number): Database

    _readDatabase(): Database[]

    _writeDatabase(database: Database): void

    _syncDatabase(database: Database): void
}

