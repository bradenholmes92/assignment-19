import $ from 'jquery';
import {githubApiKey} from '../../secrets.js'
console.log($)

var forEach = function(arr, cb){
for(var i = 0 ; i < arr.length; i++){
  {cb(arr[i], i, arr)}
}
}


let appContainer = document.querySelector("#app-container")

let navBarInput = document.querySelector(".mr-sm-2")

 function buildProfileTemplate(userData, repoData){
  let userObj = userData
  //console.log(userObj)
  let arrOfRepos = repoData
  //console.log(arrOfRepos)

  let htmlTable =
  `

  <div class="col-sm-4 sidenav">
    <div class="thumbnail">
        <img src="${userObj.avatar_url}">
        <h4>${userObj.name}</h4>
        <p>${userObj.login}</p>
        </hr>
        <h7>${userObj.bio}</h7>
        <br>
        <h8><span>${userObj.email}</span></h8>
      </div>
    </div>
    <div class="col-sm-9">
    `

  forEach(arrOfRepos, function(repoElement, index, theArray){

    let repoName = repoElement.name
    let repoType = repoElement.language

    let reposList =
        `
          <h2><span>${repoName}</span></h2>
          <h7>${repoType}</h7>
      `
      htmlTable += reposList
    })
    htmlTable += `</div>`

    return htmlTable
  }

function controllerRouter(){
  let currentRoute = window.location.hash.slice(1)

  if (currentRoute === '') {
    currentRoute = 'bradenholmes92'
  }

  let fetchGitUser = $.getJSON(`http://api.github.com/users/${currentRoute}?access_token=${githubApiKey}`)

  let fetchGitRepo = $.getJSON(`http://api.github.com/users/${currentRoute}/repos?access_token=${githubApiKey}`)

  $.when(fetchGitUser, fetchGitRepo).then(function(userData, repoData){

		appContainer.innerHTML = buildProfileTemplate(userData[0], repoData[0] )
})

}

controllerRouter();
window.addEventListener('hashchange', controllerRouter)
navBarInput.addEventListener('keydown', function(eventObj){
  console.log(eventObj)
  if (eventObj.keyCode === 13 ) {
    window.location.hash = navBarInput.value
    navBarInput.value = ''
  }
})
