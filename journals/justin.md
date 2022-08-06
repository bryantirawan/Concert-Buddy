## July 6, 2022

Today, I worked on:

* Updating the readme and docs files

Today was mostly a planning day where we began planning
out ideas for the project. We decided on a concert ticket
application that would allow you to connect to other users
who were also going to the concerts you are interested in.
Docs files included api integrations with the setlist fm api
as well as data table models that mapped out the different
tables we would be including in our database.

## July 7, 2022

Today, I worked on:

* creating wireframes for our project design

Ben and I worked in tandem to create the wireframe
images that planned out the design for each of the
pages we plan to include in our project. This was accomplished
through the balsamiq wireframes tool.

## July 11, 2022

Today, I worked on:

* Setting up the Django backend and react front end

Today we worked together as a whole group to set up
the Django and React needed to begin working on the project.
We worked off of Bryant's screen share and together created
our Django project/apps and started the new React application.
We also set up docker compose files to set up all the docker
containers we would need for each microservice.

## July 12, 2022

Today, I worked on:

* Fixing database / docker issues

Bryant and I began the day by pair programming and working on
building our buddy and concerts microservices. These would be use
to connect to setlist fm api and store the concert instances into
a concert model that would communicate with the other microservices.
Implemented polling to make connections between the microservices.
Had several database and docker issues when pulling gitlab changes
that would prevent the application from working so I spent most of
my time troubleshooting. Ending up deleting some of my branches and
re-cloning the git repo in an attempt to fix my issues. Finally got
things to work after a SEIR help ticket.

## July 13, 2022

Today, I worked on:

* Front end logic

Bryant and I pair programmed and began working on our react application
front end and making connections with the django backend and setlist fm
api. Bryant tried adding some new dependencies to implement some features
but it ended up breaking the rest of our code so it was removed.

## July 14, 2022

Today, I worked on:

* Select concerts page and fixing bugs in our React app

Today I worked mostly on the select concerts page that would be used
by users to search for concerts based on location. Bryant and I pair
programmed to created a front end function that would handle user input
and send a corresponding GET request to the setlist fm api.

## July 15, 2022

Today, I worked on:

* Artists Search Feature

Today I worked on a similar function as yesterday, instead this time
it was a feature that allowed users to make GET requests to search
concerts based on a particular artist name. This was another request
to the setlist fm api that has built in api endpoints to search
concerts by artist name. I pulled changes from main and merged with
my development branch which was something that I was having difficulty
with at the beginning of the project.

## July 18, 2022

Today, I worked on:

*  Error handling for select concerts page

Today I added error handling to the functions that make GET requests
to the setlistfm api. Included code to throw back an error if the fetch
request is unsuccessful so that it throws a 400 status. Also added
a visual 'invalid search request' that renders on the screen if
the concert state does not update with the search to show that the
fetch was unsuccessful.

## July 19, 2022

Today, I worked on:

* fixing functionality of search concert function after merge

Had some problems with my code after merge conflicts so fixed those
up quickly. Also tried playing around with the Django views to error
handle from the backend but ended up deciding to keep it mainly on the
frontend side.

## July 20, 2022

Today, I worked on:

* combining two microservices into one

Today as a team we decided to combine our buddy and concerts api so that
they would live under one microservice. This just made intuitive sense as
they work closely together and there does not seem to be a need to separate
these things. I worked on adding concerts api models to buddy api and
rewiring a lot of the code to go through buddy api instead of concert api.
Also deleted a concert poller as the concert data now exists in the same
database as the buddy model. Also reconfigured the docker compose files
to get rid of uneccessary containers.

## July 21, 2022

Today, I worked on:

* finalizing the combination of buddy api and concert api

After combining buddy and concert microservices, I merged with main and
there ended up being some problems afterword but we took care of anything
that wasn't working.

## July 22, 2022

Today, I worked on:

* misc bug fixes

Continued to fix small things that were not working as intended or did not
look right when rendering in the web browser.

## July 25, 2022

Today, I worked on:

* refactoring the error handling to use async await

Today Bryant informed me that the way I was doing error handling was
an older way of doing so and that I should reformat it to use async/
await and make sure that the json response we are receiving is ok.
I also reformatted the code where I was resetting the state of other
search fields after a search has been completed.

## July 26, 2022

Today, I worked on:

* editing the CSS of the react pages

Erica did a lot of work on the custom CSS for the overall application. Ben
also implemented a lot of bootstrap in several of the pages so there
were places where these two CSS profiles were clashing and the rendered
page was not what we were hoping for. I went through the CSS files today,
made small changes, and saw how that impacted the overall rendering of the page
until we got something closer to what we desired. Also made a slight reformatting
to how the page was determining invalid search results for easier conditional
rendering.

## July 27, 2022

Today, I worked on:

* the select concerts page and reformatting tables

Reformatted some more CSS and how tables were rendering on the page.
Fixed the margins for some pages. Also helped Ben with researching
how to make a sign-up that works with our user authentication.

## July 28, 2022

Today, I worked on:

* adding no results to search concert results

Today I worked on reformatting the search concerts page to include
no results when the filtered list of concerts matching the search term
is zero. This involved a little bit of thinking as our concert state
is never zero as it holds previous concerts as well. So I had to set
another variable as a filtered list of the concert state and use that one
in our conditional rendering.

## July 29

## August 1, 2022

Today, I worked on:

* editing the custom CSS for sign-up and log-in pages

Edited sign-up and log-in page CSS and formatting for
colors, buttons, margins, etc. Also learned to check
the mobile view of the web page so that I could make
sure that my CSS edits were working as intended for
mobile versions as well.

## August 2, 2022

Today, I worked on:

* editing the ReadMe and Docs files so that they better match
our application features and functionality

Added all of the api endpoints in the Readme as well so that
readers have a better understanding of how our microservices
work together.

## August 3, 2022

Today, I worked on:

* deployment of the application

Erica spearheaded deployment and shared her screen as she created
the gitlab-ci.yml file and converted our api endpoints to work
on the deployed version.

## August 4, 2022

Group continued working on deployment and linting

## August 5, 2022

pushed final readme changes and docs changes to main
