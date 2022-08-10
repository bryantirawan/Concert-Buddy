## Week 1 (July 4 - 8)
* This week our group worked on drafting out our initial plan for our project. We made initial design decisions on an excalidraw, where we mapped out the potential pages we wanted our site to have, the functionalities, and what the database models should look like / entail. I personally focused a lot on the ticket marketplace aspect / microservice, as portrayed in the attached [excalidraw](docs/Concert Buddy.png).

## Week 2 (July 11 - 15)
* This week our group worked together on creating the backend. We built out the docker compose.yml file, main database models, pollers, and settings. Our goal for this week was to get the application to a state where we could split up the work autonomously, and be able to work on different aspects without having many conflicts. For this to occur, we felt like we needed to set up the base application enough to a point where we had functioning pollers, microservices, and database schemas. This entire week we pretty much worked together as a group to get this running.

## Week 3 (July 18 - 22)
* This week we started splitting up and working on different microservices. Ben and I took the responsibility of working on the tickets microservice, while Bryant and Justin worked on the Buddy microservice. A lot of this week entailed building out the API endpoints and views we would need for our react pages in Django on the backend. I also personally created the front main page design this week, and assisted a bit with the selectconcert.js react page with obtaining the correct concert data. This is the week I also set up react pages such as the seller tickets page, and adjusted the design for the selectconcert.js page.

## Week 4 (July 25 - 29)
* This week I created the buyer and seller personal ticket pages in react. These are the pages that show the buyers tickets, and the tickets the seller currently has listed. This week we also adjusted some of the database models to include the ticket marketplace features, something that Bryant assisted me with in optimizing design. This week I also added the footer to the React pages to improve design. Lastly, I added a main page search bar feature that would allow a user to enter in a city on the page page and allow for it to redirect with that entry in the selectconcerts.js page.

## Week 5 (Aug 1 - 5)

### Aug 1, 2022
Today, I worked on:
* updating the SellerPersonalTicket.js page to fix bugs (i.e. making try except cases when there are no tickets that exist). I also worked on creating a PUT request to update the Ticket to allow for the seller to toggle sold = False.

### Aug 2, 2022
Today, I worked on:
* finished the SellerPersonalTicket.js page. Changed sold tickets to come from the orderitem model instead of ticket model. Also added a date filter. Also created a new view for changing tickets.

### Aug 3, 2022
Today, I worked on:
* adding tests to application. Cleaning up the file for deployment. Working on deployment. Today I also added tests to both the ticket and buddy microservices in Python.


## Week 6 (Aug 8 - 12)
* The end of last week / this week involved mainly deployment. Given my past experience with deployment on my last project, I personally spent a lot of time on deployment with this project, and corrected a lot of the bugs / errors involved with getting it working. We definitely ran into some new and unique issues with incorporating our pollers, but eventually overcame those issues after 2 or so days. After having the application fully deployed, I starting improving the design of the application again, making changes to 4 of the react pages.
