//import json file


let username = document.location.search.substr(1).split('=')[1]
console.log(username);

let githubUser;
let userRepo;

if (username.length > 2) {
    fetch(`https://api.github.com/users/${username}`)
        .catch(function(err) {
            console.log(err);
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            //get first 20 repos
            githubUser = data
            console.log(githubUser);

            fetch(data.repos_url).catch(function(err) {
                console.log(err);
            }).then(function(response) {
                return response.json();
            }).then(function(data) {
                userRepo = data
                return { githubUser, userRepo };
            }).then(function(data) {
                displayUser(data);
            })


        })
}

function displayUser(data) {

    let user = data.githubUser;
    let repos = data.userRepo.slice(0, 20);
    console.log(repos)

    let userDiv = document.getElementById('user');
    let accImage = document.getElementById('account-image');
    let reposDiv = document.getElementById('repos');


    let userImage = document.createElement('img');
    userImage.classList.add('block-left', 'avatar');

    let accImageSrc = document.createElement('img');

    let userName = document.createElement('h1');
    userName.classList.add('block-left', 'heading__blue');

    let userBio = document.createElement('p');
    userBio.classList.add('block-left', 'bio');

    let userID = document.createElement('p');
    userID.classList.add('block-left', 'username');

    let userRepoCount = document.getElementById('userRepoCount');
    let userRepoList = document.getElementById('repository-list');

    userName.innerHTML = user.name;
    userImage.src = user.avatar_url;
    accImageSrc.src = user.avatar_url;
    userBio.innerHTML = user.company;
    userID.innerHTML = user.login;

    userRepoCount.innerHTML = user.public_repos;


    userRepoList.innerHTML = repos.map(function(repo) {

        let langClass = repo.language ? repo.language.replace(" ", "-") : ''
        console.log(langClass);


        console.log(timeSince(repo.created_at))

        return `<div class="repository">
                        <div class="repo__meta">
                            <div class="repo__name">
                                <h2>${repo.name}</h2>
                                <p>${repo.visibility=="public"?"Public":"Private"}</p>
                            </div>
                            <div class="repo__descriptions">
                                <p>${repo.description}</p>
                            </div>
                            <div class="repo__additional-details">
                                <div class="repo-attribute repo__tech"><div class='lang-dot  ${langClass}'></div>${repo.language?repo.language:'' } </div>
                                <div class="repo-attribute repo__stars"><svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star">
                                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                            </svg>${repo.stargazers_count!=0 ? 
                                repo.stargazers_count:''}</div>
                                <div class="repo-attribute repo__forks">
                                    <svg aria-label="fork" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked">
                                        <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                                    </svg>
                                    ${repo.forks}</div>
                                <div class="repo-attribute repo__updated">Updated ${timeSince(repo.created_at)}</div>
                            </div>
                        </div>
                        <div class="repo__options">
                            <div class="button">
                            
                                <div class="star__icon">
                                <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star">
                                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                            </svg>
                                </div>
                                Star
                            </div>
                        </div>
                    </div>`
    }).join('');

    userDiv.appendChild(userImage);
    userDiv.appendChild(userName);
    userDiv.appendChild(userID);
    userDiv.appendChild(userBio);
    accImage.appendChild(accImageSrc);


    // string to DATE object




    function timeSince(date) {
        date = new Date(date);
        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }



    //settimeout 1s
    setTimeout(function() {

        let spinner = document.getElementById('spinner');
        spinner.classList.add('hide');
    }, 100)

}