import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  .then(({ token }) => {
    tokenService.setToken(token);
  });
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) return res.json();
    
    throw new Error('Bad Credentials!');
  })
  .then(({ token }) => tokenService.setToken(token));
}


function handleWin(){
  fetch(BASE_URL, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  });
}


function getWinScore(){
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  })
  .then(res=>res.json())
  .then(res => res.wins);
}

export default {
  signup,
  getUser,
  logout,
  login,
  handleWin,
  getWinScore
};