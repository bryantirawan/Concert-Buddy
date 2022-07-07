## Users
| Name | Type | Unique | Optional |
|---|---|---|---|
| id | int | yes | no |
| username | str | yes | no |
| password | str | no | no |
| contact info | str | no | no |
| location | str | no | no |
| payment info | str? int? | no | yes? |

## Concerts
| Name | Type | Unique | Optional |
|---|---|---|---|
| id | int | yes | no |
| name | str | yes | no |
| artist | str | no | no |
| venue | str | no | no |
| location | str | no | no |
| date | date | no | no |
| time | time | no | no |

## Tickets
| Name | Type | Unique | Optional |
|---|---|---|---|
| id | int | yes | no |
| price | int | no | no |
| section | str | no | no |
| row | str | no | no |
| concert | relates to concerts | no | no |
| ticket barcode | image | yes | no |

## Messaging?
| Name | Type | Unique | Optional |
|---|---|---|---|
| id? | int | yes | no |
| from_user_id? | int | no | no |
| to_user_id? | int | no | no |
| message content | str | no | no |

## Kanye Lyrics
| Name | Type | Unique | Optional |
|---|---|---|---|
| id | int | yes | no |
| lyrics | str | no | no |