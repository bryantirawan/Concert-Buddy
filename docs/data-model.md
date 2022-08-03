## Users
| Name | Type | Unique | Optional |
|---|---|---|---|
| email | email | yes | no |
| concert | many to many | no | yes |

## Concerts
| Name | Type | Unique | Optional |
|---|---|---|---|
| venue | str | no | no |
| city | str | no | no |
| date | date | no | no |
| artist | str | no | no |
| concert_id | str | yes | no |
| venue_id | str | no | no |
| artist_id | str | no | no |
| fellow_user | many to many | no | yes |

## Ticket
| Name | Type | Unique | Optional |
|---|---|---|---|
| price | int | no | no |
| section | str | no | no |
| row | str | no | no |
| seat | str | no | no |
| sold | bool | no | no |
| picture_url | URL | no | no |
| concert | one to many | no | no |
| seller | one to many | no | no |
| buyer | one to many | no | no |

## Order Item
| Name | Type | Unique | Optional |
|---|---|---|---|
| user | one to many | no | no |
| ticket | one to many | no | no |
| address | one to many | no | yes |
| venmo | str | no | no |

## Address
| Name | Type | Unique | Optional |
|---|---|---|---|
| user | one to one | no | no |
| street_address | str | no | no |
| apartment_address | str | no | yes |
| country | str | no | no |
| city | str | no | no |
| zip | str | no | no |
