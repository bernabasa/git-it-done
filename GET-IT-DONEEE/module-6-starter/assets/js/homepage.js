
var userFormE1 = document.querySelector("#user-form");
var nameInputE1 = document.querySelector("#username");
var repoContainerE1 = document.querySelector("#repos-container");
var repoSearchterm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
  event.preventDefault();
  console.log(event);
  // get value from input element
  var username = nameInputE1.value.trim();

  if(username) {
    getUserRepos(username);
    nameInputE1.value = "";
  } else {
    alert("Please enter a Github username");
  }
}

var displayRepos = function(repos, searchTerm) {
  // check if api returned any repos
  if(repos.length === 0){
    repoContainerE1.textContent = "No repositories found.";
    return;
  }
  console.log(repos);
  console.log(searchTerm);
  // clear old content
  repoContainerE1.textContent = "";
  repoSearchterm.textContent = searchTerm;
  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoE1 = document.createElement("a");
    repoE1.classList = "list-item flex-row justify-space-between align-center";
    repoE1.setAttribute("href", "./single-repo.html?repo=" + repoName);
    // create a span element to hold repository name
    var titleE1 = document.createElement("span");
    titleE1.textContent = repoName;

    // append to container
    repoE1.appendChild(titleE1);
    // create a status element
    var statusE1 = document.createElement("span");
    statusE1.classList= "flex-row align-center";
    // check if current repo has issues or not
    if(repos[i].open_issues_count > 0) {
      statusE1.innerHTML =
      "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
      } else {
        statusE1.innerHTML = "<i class = 'fas fa-check-square status-icon icon-success></i>";

      }

      // append to container
      repoE1.appendChild(statusE1);

    // append container to the dom
    repoContainerE1.appendChild(repoE1);

  }

}




var getUserRepos = function(user) {
    // format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      });
    } else {
      alert('Error: GitHub User Not Found');
    }
  })
  .catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub");
  });
}




userFormE1.addEventListener("submit", formSubmitHandler);