# Getsomegit
A front-end app to get some gits. It consumes Github's API. Try it out here: [https://renchchua.github.io/getsomegit/](https://renchchua.github.io/getsomegit/)

## Basic information
Users enter the keywords that they want to search for. The app then returns the repo name and the owner of the repo in the format owner/repo name. The user can then click on any of the repo to find out more details. Details that will be shown are:

* Details of the repo
* Link to the repo
* Number of people watching the repo
* Number of people following the user (repos don't have followers. Only users can have followers)
* The languages that are in the repo

## Planning process and Workflow

1. Get something basic first.
  * Able to search and list repos returned.
  * Also console logged the returned results to see what other information we can pull from the call

2. Set up git and initial commit

3. From the first call to the API, find out how to display the following:
  * Avatar image.
  * Full name of the repo in the format of owner/repo.
  * Do the styling for change in color of each listed repo on hover.

4. Worked out how to display more details when user clicks on each search result
  * Show error messages if no keywords entered.
  * Show message if no repos found.
  * Used states to store information.
  * Came up with a way to identify which search result the user has clicked on by using event.target.id. But needed to ensure that all elements in the search result container has something that can be reduced to an ID that corresponds to the repo ID.
  * Restrict the number of characters in the description to 100.

5. Made two additional calls to GitHub API
  * One to get languages of the repos.
  * The other to get the information about the followers of the owner of the repo. But decided to only show the number of followers rather than all the information of the followers. Also realised that the number of followers shown is not accurate as Github's API returns a maximum of thirty entries.

6. Change Fontawesome link to be from https source.

7. Added this readme

## Things to improve

- [] Should make the app views responsive
- [] Can improve on the how the app looks

## Tech Stack
* Node
* React
* Bootstrap
