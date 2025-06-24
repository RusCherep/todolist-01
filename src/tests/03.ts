export type governmentType = {
    governmentBuilding: "Hospital" | "Fire Station"
    budget: number
    numberOfStaff: number
    address: string
}

export type HousesType = {
    isRepaired: boolean
    floorNumber: number
    street: string
}

export type CityType = {
    title: string
    government: governmentType[]
    houses: HousesType[]
}


export const Belarus: CityType = {

    title: "Belarus",
    houses: [
        {
            street: "Nezaviosimosti",
            floorNumber: 15,
            isRepaired: true
        },
        {
            street: "Voznesenskaya",
            floorNumber: 2,
            isRepaired: false
        },
    ],
    government: [
        {
            governmentBuilding: "Hospital",
            address: "Uruchie",
            budget: 1000,
            numberOfStaff: 150
        },
        {
            governmentBuilding: "Fire Station",
            address: "Uruchie",
            budget: 5000,
            numberOfStaff: 100
        },
    ]

}

export const createHouse = (newHouse: HousesType) => {
    return (
        newHouse.push({
            floorNumber: 10,
            isRepaired: true,
            street: "Logoisky tract"
        })
    )
}

export const changeBudget = () => {

}