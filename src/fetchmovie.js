const BASE_URL = 'https://swapi.co/api/';
export function fetchAllStarShips(){
    return fetch(`${BASE_URL}starships`, { mode: 'cors' }).then(res => res.json())
};


export default function(genre) {
    return fetch(
      `https://api.themoviedb.org/3/genre/${genre}/movies?api_key=4e55ce60390a48e75c13783cf897f2b8&language=en-US&include_adult=false&sort_by=created_at.asc`
    )
      .then(res => res.json())
      .then(res => res.results.map(result => result.title));
  }
  

  const BASE_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=6f7db60b'
  export function fetchMovies(){
      return fetch(`${BASE_URL}`)
  }