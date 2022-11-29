var issueContainerE1 = document.querySelector("#issues-container");




var getRepoIssues = function(repo) {
    console.log(repo);

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            displayIssues(data);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });
};

var displayIssues = function(issues) {
    if(issues.length === 0) {
        issueContainerE1.textContent = "this repo has no open issues!";
        return;
    }
    
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueE1 = document.createElement("a");
        issueE1.classList = "list-item flex-row justify-space-between align-center";
        issueE1.setAttribute("href", issues[i].html_url);
        issueE1.setAttribute("target", "_blank");

        // create a span to hold issue title
        var titleE1 = document.createElement("span");
        titleE1.textContent = issues[i].title;

        // append to container

        issueE1.appendChild(titleE1);

        // create type element
        var typeE1 = document.createElement("span");
        // check if issue is an actual issue or a pull repuest
        if(issues[i].pull_request) {
            typeE1.textContent = "(Pull request)";

        } else {
            typeE1.textContent = "(Issue)";
        }
        // append to container
        issueE1.appendChild(typeE1);
        issueContainerE1.appendChild(issueE1);
    }
};

getRepoIssues("facebook/react");


  