export function calculatePersonalStylesScore(scores) {
    const groupStyles = { "D":0 , "I":0 , "S":0 , "A":0 }
    const keyToGroup = {
        1: "D",
        2: "I",
        3: "I",
        4: "S",
        5: "I",
        6: "S",
        7: "D",
        8: "D",
        9: "I",
        10: "I",
        11: "D",
        12: "A",
        13: "A",
        14: "S",
        15: "D",
        16: "A",
        17: "I",
        18: "D",
        19: "S",
        20: "A",
        21: "A",
        22: "S",
        23: "A",
        24: "S",
    }

    console.log(scores)
  
    Object.entries(keyToGroup).forEach(([key, value]) => {
        groupStyles[value] += scores[key]
        // console.log("key :", key, "adding values: ", value, groupStyles)
    })

    const sortedByValue = Object.entries(groupStyles)
    .sort((a, b) => b[1] - a[1])
    .reduce((obj, [key,value]) => {
        obj[key] = value
        return obj
    },{});

    return sortedByValue
}

export const typeMap = {
  I: "Influencer",
  A: "Analyzer",
  S: "Sympathizer",
  D: "Driver",
}