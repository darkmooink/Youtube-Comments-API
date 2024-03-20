import { zipArrays } from "./arrayFunctions"

describe("",()=>{
    const tests = [
        {
        array1:[],
        array2:[],
        expected:[]
        },{
        array1:[1,2,3],
        array2:['a','b','c'],
        expected:[[1,'a'],[2,'b'],[3,'c']]
        },{
        array1:[1,2,3],
        array2:['a','b'],
        expected:[[1,'a'],[2,'b'],[3,undefined]]
        },
    ]
    test("test zipping of empty arrays",()=>{
        const zippedArray = zipArrays(tests[0].array1, tests[0].array2)
        expect(zippedArray).toEqual(tests[0].expected)
    })
    test("testing zipping of arrays of equal length", ()=>{
        const zippedArray = zipArrays(tests[1].array1, tests[1].array2)
        expect(zippedArray).toEqual(tests[1].expected)
    })
    test("testing zipping of arrays of unequal length", ()=>{
        const zippedArray = zipArrays(tests[2].array1, tests[2].array2)
        expect(zippedArray).toEqual(tests[2].expected)
    })
})