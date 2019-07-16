const URL = 'https://wordsapiv1.p.rapidapi.com/words/?letterPattern=%5E%5BA-Za-z%5D*%24&partOfSpeech=noun&lettersMin=3&lettersMax=10&random=true'

function getWord( ){
    return fetch(URL, {
        method: 'GET',
        headers: new Headers ({
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': 'e00e57b6demshe618ad727391a2ep1cd46fjsn33f69c241330'
        })
    }).then(res=>{
        if (res.ok) return res.json()
    }).then(res=>{
        return res.word
    })
}
export default getWord;