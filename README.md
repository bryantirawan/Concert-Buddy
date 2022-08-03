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

## Buddy Microservice
The Buddy microservice is mainly in charge of connecting users with concerts from the setlistfm api.

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
