# Concert Buddy

## Design
* [API design](docs/apis.md)
* [Data model](docs/data-model.md)
* [GHI](docs/ghi.md)
* [Integrations](docs/integrations.md)

## Name
Concert Buddy

## Team Members
* Ben Perlman
* Justin Pang
* Bryant Irawan
* Erica Dippold

## App Summary
Concert Buddy is a ticket sales application focused around connecting users with other users based on their musical interests.
Buyers and Sellers connect with each other based on concert locations and shared artists. Users can be both ticket buyers and
ticket sellers.

## Target Market
Our target market is anyone that enjoys going to concerts. In particular, those who are last minute planners as well as people with cancelled plans that need to sell tickets last minute. Our objective is to meet a market demand based on last minute urgency.

## Features & Functionality
* Users search for concerts located in particular cities and featuring specific artists
* User will receive a query of concerts that are occurring over the next couple of days using their city / artist preferences
* There will be a ticket marketplace for last minute buying and selling of concert tickets
* Connect with a concert buddy option -- the user will be able to find a concert buddy based on future concerts they are attending. They will be
able to connect with other users attending the same concerts.

## Set-up
* Fork and clone this repo
* Sign up for a setlistfm api key at https://api.setlist.fm/docs/1.0/index.html
* create a .env file in the outermost concert buddy directory and include api-key: {your api key}
* create a docker volume called postgres-data
* Set up docker containers using the docker-compose.yml file
* start up docker containers and wait for application to compile before accessing it through your browser

## Buddy Microservice
The Buddy microservice is mainly in charge of connecting users with concerts from the setlistfm api.
The Buddy microservice consists of two models titled 'Concert' and 'User'.

The 'Concert' model is used to organize the concert information that is being recieved from the setlistfm api.
Every single concert instance from the setlistfm api is not saved within the database corresponding to the 'Concert' Model.
Only when a user selects that they are going to a particular concert does the microservice save the selected concert
to the postgres database. This was an intended design to reduce the memory burden of the concerts that are being requested
from the setlistfm api. 'Concert' Model includes the city, venue, date, and artist for the concert along with id values for the
concert, artist, and venue. 'Concert' Model also includes a fellow_user field that is a many-to-many field holding all the users 
that have indicated they are attending the specific concert.

The 'User' model is a custom user model set up to include and email and concerts field. The email is mainly used for the 'Find a Buddy'
feature that allows users to connect to other users attending the same concerts as them. Concerts is a many-to-many field that includes 
all the concerts that a particular user is attending.

### `GET selectconcertsforcity/<str:location>/<str:page>/`
Search for concerts by city

#### Response
```json
{
    "setlist": [
        {
            "id": "13b25585",
            "versionId": "g2bf0484e",
            "eventDate": "05-08-2022",
            "lastUpdated": "2022-08-03T00:48:27.000+0000",
            "artist": {
                "mbid": "50feb379-8266-4efa-9707-2a4acb2b6b43",
                "name": "Pathology",
                    "sortName": "Pathology",
                    "disambiguation": "United States brutal death metal",
                    "url": "https://www.setlist.fm/setlists/pathology-13d4c5e5.html"
                },
            "venue": {
                "id": "53d28f3d",
                "name": "The Great Northern",
                "city": {
                    "id": "5391959",
                    "name": "San Francisco",
                    "state": "California",
                    "stateCode": "CA",
                    "coords": {
                        "lat": 37.775,
                        "long": -122.419
                        },
                    "country": {
                        "code": "US",
                        "name": "United States"
                        }
                    },
                "url": "https://www.setlist.fm/venue/the-great-northern-san-francisco-ca-usa-53d28f3d.html"
                },
            "tour": {
                "name": "The Uncreation of Civilization Tour 2022"
                },
            "sets": {
                "set": []
                },
            "url": "https://www.setlist.fm/setlist/pathology/2022/the-great-northern-san-francisco-ca-13b25585.html"
    }
}
```

## Ticket Microservice