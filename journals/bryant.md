
## Week 1 

This week, I led the discussion on what project we should do. We decided that we wanted to incorporate a 3rd party API to practice dealing with JSON bodies. Some ideas that came up were a surfing app that alerts you if a wave will be surfable and match you with friends also interested in surfing. We decided on a similar concept but with last minute concerts. We also added another microservice for ticket purchasing. I led the excalidraw to design the concert buddy matching microservice, needed pages, and models/schemas while Erica led the drawing and design for the ticket purchasing microservice. I also followed the microservice startup page to create our docker-compose.yml file and create relevant a buddy-matching microservice, a ticket purchasing microservice, a concert model/schema microservice, and pollers to connect all 3 microservices/containers. 

## Week 2 and 3 

My focus was making the MVP for the concert-buddy matching microservice. The first task was to successfully setup the models we drew from excalidraw. Then, we needed to connect setlist.fm API and React. Once we confirmed we were able to connect to the 3rd party api we worked on a page dedicated to searching concerts based on city or arist (selectconcert.js). The next step was more complicated as we now needed to incorporate back-end logic. When a user clicks I'm going to a concert, the logic needs to change both the concert and user schemas. We learned that many to many fields are much harder to manipulate/encode so I switched to using django-restframework instead of encoders. Also, we did not want our database to house multiple concert instances so we needed to check if a concert already existsed in our database. Once this backend logic was done, I was able to create a page showing concerts a user is going to and other users going to a concert (userconcerts.js and fellowusersgoingtoconcert.js). 

## Week 4

This week was all about auth. After several tutorials, I finally found one that works using jwt2 and an access/refresh token. Erica took the lead to build the ticket purchasing microservice these past 2 weeks and we needed to connect our react container, with ticekt purchasing and concert buddy microservices. We realized that the concert microservice was not really necessary so Justin was tasked with removing it. Ben helped both Erica and me. 

## Week 5

Focused on cleanup and deployment. I also wrote two tests related to part of the POST logic descrived above. Also realized we needed pagination so made that. 

## Week 6

Continued to make site visually appealing and cleanup code. 