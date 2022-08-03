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
    "setlist": [{
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
    ]
}
```

### `GET concerts/artist/<str:pk>/`
Search for concerts by artist

#### Response
```json
{
    "setlist": [{
            "id": "63b256e3",
            "versionId": "g3bf1b8c0",
            "eventDate": "05-08-2022",
            "lastUpdated": "2022-08-03T08:13:18.000+0000",
            "artist": {
                "mbid": "b83bc61f-8451-4a5d-8b8e-7e9ed295e822",
                "name": "Elton John",
                "sortName": "John, Elton",
                "disambiguation": "English singer, songwriter, pianist, and composer",
                "url": "https://www.setlist.fm/setlists/elton-john-63d6be6f.html"
                },
            "venue": {
                "id": "4bd637ce",
                "name": "Soldier Field",
                "city": {
                    "id": "4887398",
                    "name": "Chicago",
                    "state": "Illinois",
                    "stateCode": "IL",
                    "coords": {
                        "lat": 41.850033,
                        "long": -87.6500523
                        },
                    "country": {
                        "code": "US",
                        "name": "United States"
                        }
                    },
			    "url": "https://www.setlist.fm/venue/soldier-field-chicago-il-usa-4bd637ce.html"
				},
			"tour": {
				"name": "Farewell Yellow Brick Road World Tour"
				},
			"sets": {
				"set": []
				},
			"url": "https://www.setlist.fm/setlist/elton-john/2022/soldier-field-chicago-il-63b256e3.html"
		}
    ]
}
```

### `GET add/<str:concertdict>/`
Get concert data for post request

#### Response
```json
{
	"venue": "Venue",
	"venue_id": "venue_id",
	"artist_id": "artist_id",
	"city": "City",
	"date": "Date",
	"artist": "Artist",
	"concert_id": "concert_id"
}
```

### `GET concert/<str:pk>/`
Get concert data for concert detail page

#### Response
```json
{
	"id": 5,
	"venue": "Venue",
	"city": "City",
	"date": "Date",
	"artist": "Artist",
	"concert_id": "concert_id",
	"venue_id": "venue_id",
	"artist_id": "artist_id",
	"import_href": "/api/concerts/5"
}
```

### `GET userconcerts/`
Get list of concerts user is attending

#### Response
```json
[{
	"id": 5,
	"venue": "Venue",
	"city": "City",
	"date": "Date",
	"artist": "Artist",
	"concert_id": "concert_id",
	"venue_id": "venue_id",
	"artist_id": "artist_id",
	"import_href": "/api/concerts/5"
},]
```

### `GET concertfellowusers/<str:pk>/`
Get list of fellow users attending the concert

#### Response
```json
{
	"users": [
		{
			"id": 2,
			"password": "password",
			"last_login": null,
			"is_superuser": false,
			"username": "user",
			"first_name": "first",
			"last_name": "last",
			"is_staff": false,
			"is_active": true,
			"date_joined": "date joined",
			"email": "email@email.com"
		}
	]
}
```

## Ticket Microservice
The Ticket Microservice handles all of the ticket transactions that occur through the Concert Buddy Application.
The Ticket Microservice consists of five models titled 'ConcertVO', 'UserVO', 'Ticket', 'OrderItem', and 'Address'.

'ConcertVO' and 'UserVO' models are used in conjunction with polling to receive data from the Buddy Microservice.
'ConcertVO' receives concert information including venue, city, date, artist, and concert_id, whereas 'UserVO'
receives email, first name, and last name from the custom user model created in the Buddy Microserivce. This information
is used during ticket transactions making sure that each ticket has a designated concert, user buyer, and user seller.

The 'Ticket' model contains all of the relevant ticket information necessary for ticket transactions. This includes the
price of the ticket as well as the general tickets of the ticket, such as section, row, and seat number. Ticket sellers
are also able to upload a ticket image url of the ticket that is to be sold. This model utilizes one-to-many relationships
with concerts and users to ensure that each ticket only corresponds to one concert, buyer, or seller, but does not restrict
each concert, buyer, and seller from having many tickets.

An 'OrderItem' instance is created following the purchase of a ticket through Concert Buddy. Once users fill out the purchase
form, order information including the purchaser's home address and venmo username. The 'Address' model handles user entry of
their home addresses. The 'OrderItem' model includes a one-to-many relationship with address so that each order item only includes
the home address of the user that purchased the ticket. These instances will be stored in the database to maintain history of 
purchases which is available for users to view.

### `GET tickets/`
List all tickets

#### Response
```json
{
	"tickets": [
		{
			"id": 1,
			"price": "10.00",
			"section": "A",
			"row": "1",
			"seat": "1",
			"sold": false,
			"picture_url": "picture.com",
			"concert": {
				"id": 3,
				"import_href": "/api/concerts/3",
				"venue": "Venue",
				"city": "City",
				"date": "Date",
				"artist": "Artist",
				"concert_id": "concert id"
			},
		},
	]
}
```

### `PUT tickets/<int:pk>/`
Update ticket information when sold

#### Response
```json
{
    "id": 1,
    "price": "10.00",
    "section": "A",
    "row": "1",
    "seat": "1",
    "sold": true,
    "picture_url": "picture.com",
    "concert": {
        "id": 3,
        "import_href": "/api/concerts/3",
        "venue": "Venue",
        "city": "City",
        "date": "Date",
        "artist": "Artist",
        "concert_id": "concert_id"
    },
    "seller": {
        "import_href": "/api/users/3",
        "email": "123@123.com",
        "first_name": "first",
        "last_name": "last"
    },
    "buyer": {
        "import_href": "/api/users/2",
        "email": "user@user.com",
        "first_name": "first",
        "last_name": "last"
    },
    "concert_id": "concert_id"
}
```

### `PUT changetickets/<int:pk>/`
Edit information of a sold ticket back to unsold

#### Response
```json
{
	"id": 1,
	"price": "10.00",
	"section": "A",
	"row": "1",
	"seat": "1",
	"sold": false,
	"picture_url": "picture.com",
	"concert": {
        "id": 3,
        "import_href": "/api/concerts/3",
        "venue": "Venue",
        "city": "City",
        "date": "Date",
        "artist": "Artist",
        "concert_id": "concert_id"
    },
	"seller": {
		"import_href": "/api/users/3",
		"email": "123@123.com",
		"first_name": "first",
		"last_name": "last"
	},
	"buyer": null,
	"concert_id": "concert_id"
}
```