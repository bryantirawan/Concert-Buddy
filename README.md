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
that have indicated they are attending that specific concert instance.

### `GET salespeople/`
Retrieve a list of salespeople

#### Response
```json
{
	"salespeople": [
		{
			"id": 1,
			"sales_person": "Barbara Jackson",
			"employee_num": 1
		}
	]
}
```
