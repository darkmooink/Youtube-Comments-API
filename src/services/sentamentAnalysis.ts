import { zipArrays } from "../functions/arrayFunctions";
import { CommentData } from "../types/comment";

let Sentiment = require('natural').SentimentAnalyzer;
let stemmer = require('natural').PorterStemmer;
let analyzer = new Sentiment("English",stemmer,'senticon');

// For working with Multiple Examples You Need A Tokenizer
let natural = require("natural");
let tokenizer = new natural.WordTokenizer();
  
// interface settings {
//     language?:"English",
//     stemmer?:"porter",
//     vocab?:"afinn" | "senticon" | "pattern"
//     accountForLength?:boolean

// }

export function getSentiment(text:string, accountForLength?:boolean):number{
    const tokens = tokenizer.tokenize(text)
    const adjustment = accountForLength?Math.sqrt(tokens.length):1
    let score = analyzer.getSentiment(tokens) as number
     
    return (isNaN(score)?-0:score)*adjustment as number;
}

export function getSentiments(texts:string[], accountForLength?:boolean): number[]{
    texts = [...texts]
    let sentiments: number[] = []
    while (texts.length>0){
        const sentimentAnal = getSentiment(texts.pop() as string, accountForLength)
        sentiments.push(sentimentAnal)
    }
    sentiments.reverse()
    return sentiments
}

export function getSentimentAnalysisAndStats(texts:string[]){
    const sentiments = getSentiments(texts, false)
    const joined = zipArrays(texts, sentiments)
    joined.sort((a: [string, number], b:[string, number])=>{
        return b[1]-a[1]
    })
    const stats = {
        raw: joined,
        mostPositive: joined[0],
        mostNegative: joined[joined.length - 1],
        mean: joined.reduce((acc, pair) => acc + pair[1], 0) / joined.length,
        median: joined[Math.floor(joined.length / 2)][1],
        variance: -0, // To be computed
        standardDeviation: -0, // To be computed
        percentile: function (p: number) {
            return this.raw[Math.floor(this.raw.length / 100 * p)][1];
        },
    };
    // Computing Variance
    const mean = stats.mean;
    let varianceSum = 0;
    joined.forEach(pair => {
        varianceSum += Math.pow((pair[1] - mean), 2);
    });
    stats.variance = varianceSum / joined.length;
    
    // Computing Standard Deviation
    stats.standardDeviation = Math.sqrt(stats.variance);
    
    return stats
}

export function getSentimentAnalysisAndStatsFromComments(comments:CommentData[], includeReplies=false){
    const rawComments : string[] = []
    comments.forEach((comment)=>{
        rawComments.push(comment.text)
        if (includeReplies){
            comment.replies?.forEach((comment)=>{
                rawComments.push(comment.text)
            })
        }
    })
    return getSentimentAnalysisAndStats(rawComments)
}