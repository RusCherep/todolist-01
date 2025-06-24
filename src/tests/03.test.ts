import {beforeEach, expect, test} from "vitest";
import {CityType, createHouse} from "./03.ts";

let Belarus: CityType;
// let student: StudentType;
beforeEach(() => {
    Belarus = {
        title : "Belarus",
        houses : [
            {
                street : "Nezaviosimosti",
                floorNumber : 15,
                isRepaired : true
            },
            {
                street : "Voznesenskaya",
                floorNumber : 2,
                isRepaired : false
            },
        ],
        government : [
            {
                governmentBuilding : "Hospital",
                address : "Uruchie",
                budget : 1000,
                numberOfStaff : 150
            },
            {
                governmentBuilding : "Fire Station",
                address : "Uruchie",
                budget : 5000,
                numberOfStaff : 100
            },
        ]

    }
})

test("Country title should be Belarus", () => {

    // expect(student.address.country.title).toBe("Belarus");

    expect(Belarus.title).toBe("Belarus");

})


test("house should be add", ()=>{

    createHouse (Belarus.houses);

    expect(Belarus.houses.length).toBe(3);
})