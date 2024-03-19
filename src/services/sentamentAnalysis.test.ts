import { getSentiment, getSentimentAnalysisAndStats, getSentiments } from "./sentamentAnalysis"

const testData = [

]
describe("single strings pass analysis",()=>{
    test("check that an empty string comes back with a a score of 0",()=>{
        expect(getSentiment("")).toBe(-0)
    })
    test("accurate for strings",()=>{
        const testData = [
            {input: "brilliant",
            expected:0.521},
            {input: "calm captivated",
            expected:0.4065},
            {input: "aggression",
            expected:-.25},
            {input: "'m literally crying rn. I'd been watching since I was eight 🥹, I'm 18 now, you literally raised me from elementary to college, and ohhhhh, what a ride it's been. You'll always hold a special place in our hearts and history, and ironically enough, that's not a theory. We love you Mat, best wishes to you and your family🥹🫶🏻✨🤍.",
            expected:0.027428571428571424},
            {input: "You have the work-life balance of a dad in a Christmas movie.",
            expected:0.09807692307692308},
            {input: "The reason why you took off as a vtuber is because you have a very real sense of authenticity. After all, who would willingly choose to be you?",
            expected:0.05360714285714285},
            {input: "I hate you and your stupid face",
            expected:-0.10714285714285714},
            {input: "The storytelling is... somewhere between pathetic and perfunctory. Largely perfunctory.",
            expected:-0.04010000000000001},
        ]
        testData.forEach((data) => {
            expect(getSentiment(data.input)).toBe(data.expected)
        })
    })
    
})
describe("array of strings", ()=>{
    test("accurate for strings",()=>{
        const testData = [
            {input: ["brilliant","calm captivated","aggression","'m literally crying rn. I'd been watching since I was eight 🥹, I'm 18 now, you literally raised me from elementary to college, and ohhhhh, what a ride it's been. You'll always hold a special place in our hearts and history, and ironically enough, that's not a theory. We love you Mat, best wishes to you and your family🥹🫶🏻✨🤍.","You have the work-life balance of a dad in a Christmas movie.","The reason why you took off as a vtuber is because you have a very real sense of authenticity. After all, who would willingly choose to be you?","I hate you and your stupid face", "The storytelling is... somewhere between pathetic and perfunctory. Largely perfunctory.",],
            expected:[0.521, 0.4065, -.25,0.027428571428571424,0.09807692307692308,0.05360714285714285,-0.10714285714285714,-0.04010000000000001,]},
        ]
        testData.forEach((data) => {
            expect(getSentiments(data.input)).toStrictEqual(data.expected)
        })
    })
    describe("Stats are produced",()=>{
        const testData = [
            {input: ["brilliant","calm captivated","aggression","'m literally crying rn. I'd been watching since I was eight 🥹, I'm 18 now, you literally raised me from elementary to college, and ohhhhh, what a ride it's been. You'll always hold a special place in our hearts and history, and ironically enough, that's not a theory. We love you Mat, best wishes to you and your family🥹🫶🏻✨🤍.","You have the work-life balance of a dad in a Christmas movie.","The reason why you took off as a vtuber is because you have a very real sense of authenticity. After all, who would willingly choose to be you?","I hate you and your stupid face", "The storytelling is... somewhere between pathetic and perfunctory. Largely perfunctory.",],
            expected:{"mean": 0.08867122252747252, "median": 0.027428571428571424, "mostNegative": ["aggression", -0.25], "mostPositive": ["brilliant", 0.521], percentile: function percentile(){}, percentile20:0.4065, "raw": [["brilliant", 0.521], ["calm captivated", 0.4065], ["You have the work-life balance of a dad in a Christmas movie.", 0.09807692307692308], ["The reason why you took off as a vtuber is because you have a very real sense of authenticity. After all, who would willingly choose to be you?", 0.05360714285714285], ["'m literally crying rn. I'd been watching since I was eight 🥹, I'm 18 now, you literally raised me from elementary to college, and ohhhhh, what a ride it's been. You'll always hold a special place in our hearts and history, and ironically enough, that's not a theory. We love you Mat, best wishes to you and your family🥹🫶🏻✨🤍.", 0.027428571428571424], ["The storytelling is... somewhere between pathetic and perfunctory. Largely perfunctory.", -0.04010000000000001], ["I hate you and your stupid face", -0.10714285714285714], ["aggression", -0.25]], "standardDeviation": 0.24047227005851357, "variance": 0.05782691266709468}},
        ]
        testData.forEach((data) => {
            const result = getSentimentAnalysisAndStats(data.input);
        
            // Compare all properties except 'percentile'
            expect(result.mean).toEqual(data.expected.mean);
            expect(result.median).toEqual(data.expected.median);
            expect(result.mostNegative).toEqual(data.expected.mostNegative);
            expect(result.mostPositive).toEqual(data.expected.mostPositive);
            expect(result.raw).toEqual(data.expected.raw);
            expect(result.standardDeviation).toEqual(data.expected.standardDeviation);
            expect(result.variance).toEqual(data.expected.variance);
        
            // If you need to check the existence of the 'percentile' function
            expect(typeof result.percentile).toBe('function');
            expect(result.percentile(20)).toBe(data.expected.percentile20)
            
        });
        
    })
    
})