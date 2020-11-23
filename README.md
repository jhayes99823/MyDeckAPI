# MyDeckAPI

If you have suggestions on improvements you can contact me at @ hayesja99@gmail.com

Feel free to fork or add pull requests for additions

# Table of Contents
- [Models](#models)
  * [Session](#session)
  * [Player](#player)
  * [Pile](#pile)
  * [Card](#card)
- [Endpoints](#endpoints)
  * [Create Session](#create-session)
    + [POST](#post)
    + [URL: https://my-deck-api.herokuapp.com/api/v1/session](#url--https---my-deck-apiherokuappcom-api-v1-session)
    + [Interfaces Used In Request](#interfaces-used-in-request)
      - [NewPlayerDTO](#newplayerdto)
      - [NewPileDTO](#newpiledto)
      - [NewSessionDTO](#newsessiondto)
    + [Example Body Request](#example-body-request)
    + [Example Response](#example-response)
  * [Get Pile By Session Id and Pile Name](#get-pile-by-session-id-and-pile-name)
    + [GET](#get)
    + [URL: https://my-deck-api.herokuapp.com/api/v1/pile](#url--https---my-deck-apiherokuappcom-api-v1-pile)
    + [Query Params](#query-params)
    + [Example Query Param Request Values](#example-query-param-request-values)
    + [Example Response](#example-response-1)
  * [Get Player By Session Id and Player Name](#get-player-by-session-id-and-player-name)
    + [GET](#get-1)
    + [URL: https://my-deck-api.herokuapp.com/api/v1/player](#url--https---my-deck-apiherokuappcom-api-v1-player)
    + [Query Params](#query-params-1)
    + [Example Query Param Request Values](#example-query-param-request-values-1)
    + [Example Response](#example-response-2)
  * [Draw](#draw)
    + [POST](#post-1)
    + [URL: https://my-deck-api.herokuapp.com/api/v1/player/draw](#url--https---my-deck-apiherokuappcom-api-v1-player-draw)
    + [Body Request Values](#body-request-values)
    + [Example DEFAULT Body Request](#example-default-body-request)
    + [Example Body Request with Amount](#example-body-request-with-amount)
    + [Example Response](#example-response-3)
  * [Discard](#discard)
    + [POST](#post-2)
    + [URL: https://my-deck-api.herokuapp.com/api/v1/player/discard](#url--https---my-deck-apiherokuappcom-api-v1-player-discard)
    + [Body Request Values](#body-request-values-1)
    + [Example Body Request](#example-body-request-1)
    + [Example Response](#example-response-4)
  * [Shuffle from one pile to another pile](#shuffle-from-one-pile-to-another-pile)
    + [POST](#post-3)
    + [URL: https://my-deck-api.herokuapp.com/api/v1/pile/shuffle](#url--https---my-deck-apiherokuappcom-api-v1-pile-shuffle)
    + [Body Request Values](#body-request-values-2)
    + [Example Body Request](#example-body-request-2)
    + [Example Response](#example-response-5)
- [External Documentation](#external-documentation)
  * [RAPID API](#rapid-api)
  * [Postman Collection Documentation](#postman-collection-documentation)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>


# Models

## Session
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Player | Player[] | references Player IDs | x
| Piles | Pile[] | references Pile IDs | x
| Name | String | name of Session | 

## Player
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Name | String | must be unique | x
| Session Id | String | references a Session ID | x
| Cards | Card[] | cards in players "hand" | x

_Session Id and Cards set upon creation of Session_

## Pile
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Name | String | must be unique | x
| Session Id | String | references a Session ID | x
| Cards | Card[] | cards in pile | x

_Session Id and Cards set upon creation of Session_

## Card
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Suit | String | one of the suit values detailed below | x
| Value | String | one of the card values detailed below | x
| Code | String | first letter of suit + first value of card value | x
| Image URL | String | .png value | x

_All values set upon creation of Session_\
_Suit Values: ["DIAMOND", "HEART", "SPADES", "CLUBS"]_\
_Value Values: ["ACE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING"]_\
_*CREDIT TO: https://github.com/crobertsbmw/deckofcards for the images*_

# Endpoints

## Create Session

### POST
### URL: https://my-deck-api.herokuapp.com/api/v1/session

### Interfaces Used In Request

#### NewPlayerDTO
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Name | String | name of player | x
| Hand Count | Number | option to allow player different number of cards than default or one sent with session request | 

#### NewPileDTO
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Name | String | name of player | x
| Count | String | designate pile where remaining cards will go | x - at least one pile should have "required" here

#### NewSessionDTO
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Player Names | NewPlayerDTO[] | list of player dtos | x
| Pile Names | NewPileDTO[] | list of pile dtos | x
| Name | String | name of session | x
| Player Hand Count | Number | sets player hand count different from default | x

_Default Player Hand Count = 4_

### Example Body Request
```
{
    "playerNames": [
        {
            "name": "player 1"
        },
        {
            "name": "player 2"
        }
    ],
    "pileNames": [
        {
            "name": "draw",
            "count": "remaining"
        },
        {
            "name": "discard"
        }
    ],
    "playerHandCount": 5
}
```
### Example Response
```
{
  "success": true,
  "message": "New Session Created",
  "statusCode": 201,
  "data": {
    "id": "5fbc0a87b3f2d00004c73ad6",
    "piles": [
      {
        "name": "draw",
        "count": "remaining"
      },
      {
        "name": "discard"
      }
    ],
    "players": [
      {
        "name": "player 1"
      },
      {
        "name": "player 2"
      }
    ],
    "pile_ids": [
      "5fbc0a87b3f2d00004c73ae3",
      "5fbc0a87b3f2d00004c73b0e"
    ],
    "player_ids": [
      "5fbc0a87b3f2d00004c73ad7",
      "5fbc0a87b3f2d00004c73add"
    ]
  }
}
```

## Get Pile By Session Id and Pile Name

### GET
### URL: https://my-deck-api.herokuapp.com/api/v1/pile

### Query Params
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Session ID | String | references session id from creation | x
| Pile Name | String | unique pile name that you created | x

### Example Query Param Request Values
```
{
    "sessionId": "5fbc0a87b3f2d00004c73ad6"
    "name": "draw"
}
```

### Example Response

```
{
  "success": true,
  "message": "Pile Found",
  "statusCode": 200,
  "data": {
    "id": "5fbc0a87b3f2d00004c73ae3",
    "name": "draw",
    "cards": [
      {
        "_id": "5fbc0a87b3f2d00004c73ae4",
        "suit": "SPADE",
        "value": "7",
        "code": "S7",
        "imageURL": "https://deckofcardsapi.com/static/img/7S.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:16:23.611Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae5",
        "suit": "SPADE",
        "value": "ACE",
        "code": "SA",
        "imageURL": "https://deckofcardsapi.com/static/img/AS.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:16:23.611Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae6",
        "suit": "CLUB",
        "value": "ACE",
        "code": "CA",
        "imageURL": "https://deckofcardsapi.com/static/img/AC.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:16:23.611Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae7",
        "suit": "SPADE",
        "value": "10",
        "code": "S1",
        "imageURL": "https://deckofcardsapi.com/static/img/0S.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:16:23.611Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae8",
        "suit": "HEART",
        "value": "9",
        "code": "H9",
        "imageURL": "https://deckofcardsapi.com/static/img/9H.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:16:23.611Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae9",
        "suit": "HEART",
        "value": "8",
        "code": "H8",
        "imageURL": "https://deckofcardsapi.com/static/img/8H.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:16:23.611Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73aea",
        "suit": "DIAMOND",
        "value": "2",
        "code": "D2",
        "imageURL": "https://deckofcardsapi.com/static/img/2D.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73aeb",
        "suit": "CLUB",
        "value": "QUEEN",
        "code": "CQ",
        "imageURL": "https://deckofcardsapi.com/static/img/QC.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73aec",
        "suit": "DIAMOND",
        "value": "QUEEN",
        "code": "DQ",
        "imageURL": "https://deckofcardsapi.com/static/img/QD.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73aed",
        "suit": "DIAMOND",
        "value": "JACK",
        "code": "DJ",
        "imageURL": "https://deckofcardsapi.com/static/img/JD.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73aee",
        "suit": "HEART",
        "value": "3",
        "code": "H3",
        "imageURL": "https://deckofcardsapi.com/static/img/3H.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73aef",
        "suit": "HEART",
        "value": "5",
        "code": "H5",
        "imageURL": "https://deckofcardsapi.com/static/img/5H.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af0",
        "suit": "HEART",
        "value": "4",
        "code": "H4",
        "imageURL": "https://deckofcardsapi.com/static/img/4H.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af1",
        "suit": "DIAMOND",
        "value": "3",
        "code": "D3",
        "imageURL": "https://deckofcardsapi.com/static/img/3D.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af2",
        "suit": "SPADE",
        "value": "9",
        "code": "S9",
        "imageURL": "https://deckofcardsapi.com/static/img/9S.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af3",
        "suit": "HEART",
        "value": "KING",
        "code": "HK",
        "imageURL": "https://deckofcardsapi.com/static/img/KH.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af4",
        "suit": "HEART",
        "value": "7",
        "code": "H7",
        "imageURL": "https://deckofcardsapi.com/static/img/7H.png",
        "createdAt": "2020-11-23T19:16:23.612Z",
        "updatedAt": "2020-11-23T19:16:23.612Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af5",
        "suit": "DIAMOND",
        "value": "8",
        "code": "D8",
        "imageURL": "https://deckofcardsapi.com/static/img/8D.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af6",
        "suit": "CLUB",
        "value": "2",
        "code": "C2",
        "imageURL": "https://deckofcardsapi.com/static/img/2C.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af7",
        "suit": "DIAMOND",
        "value": "KING",
        "code": "DK",
        "imageURL": "https://deckofcardsapi.com/static/img/KD.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af8",
        "suit": "SPADE",
        "value": "6",
        "code": "S6",
        "imageURL": "https://deckofcardsapi.com/static/img/6S.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73af9",
        "suit": "CLUB",
        "value": "KING",
        "code": "CK",
        "imageURL": "https://deckofcardsapi.com/static/img/KC.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73afa",
        "suit": "HEART",
        "value": "6",
        "code": "H6",
        "imageURL": "https://deckofcardsapi.com/static/img/6H.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73afb",
        "suit": "HEART",
        "value": "JACK",
        "code": "HJ",
        "imageURL": "https://deckofcardsapi.com/static/img/JH.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73afc",
        "suit": "SPADE",
        "value": "5",
        "code": "S5",
        "imageURL": "https://deckofcardsapi.com/static/img/5S.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73afd",
        "suit": "CLUB",
        "value": "8",
        "code": "C8",
        "imageURL": "https://deckofcardsapi.com/static/img/8C.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73afe",
        "suit": "SPADE",
        "value": "KING",
        "code": "SK",
        "imageURL": "https://deckofcardsapi.com/static/img/KS.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73aff",
        "suit": "DIAMOND",
        "value": "4",
        "code": "D4",
        "imageURL": "https://deckofcardsapi.com/static/img/4D.png",
        "createdAt": "2020-11-23T19:16:23.613Z",
        "updatedAt": "2020-11-23T19:16:23.613Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b00",
        "suit": "CLUB",
        "value": "10",
        "code": "C1",
        "imageURL": "https://deckofcardsapi.com/static/img/0C.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b01",
        "suit": "SPADE",
        "value": "8",
        "code": "S8",
        "imageURL": "https://deckofcardsapi.com/static/img/8S.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b02",
        "suit": "DIAMOND",
        "value": "6",
        "code": "D6",
        "imageURL": "https://deckofcardsapi.com/static/img/6D.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b03",
        "suit": "HEART",
        "value": "2",
        "code": "H2",
        "imageURL": "https://deckofcardsapi.com/static/img/2H.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b04",
        "suit": "CLUB",
        "value": "1",
        "code": "C1",
        "imageURL": "https://deckofcardsapi.com/static/img/0C.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b05",
        "suit": "CLUB",
        "value": "7",
        "code": "C7",
        "imageURL": "https://deckofcardsapi.com/static/img/7C.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b06",
        "suit": "HEART",
        "value": "QUEEN",
        "code": "HQ",
        "imageURL": "https://deckofcardsapi.com/static/img/QH.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b07",
        "suit": "DIAMOND",
        "value": "1",
        "code": "D1",
        "imageURL": "https://deckofcardsapi.com/static/img/0D.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b08",
        "suit": "DIAMOND",
        "value": "ACE",
        "code": "DA",
        "imageURL": "https://deckofcardsapi.com/static/img/AD.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b09",
        "suit": "DIAMOND",
        "value": "10",
        "code": "D1",
        "imageURL": "https://deckofcardsapi.com/static/img/0D.png",
        "createdAt": "2020-11-23T19:16:23.614Z",
        "updatedAt": "2020-11-23T19:16:23.614Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b0a",
        "suit": "CLUB",
        "value": "JACK",
        "code": "CJ",
        "imageURL": "https://deckofcardsapi.com/static/img/JC.png",
        "createdAt": "2020-11-23T19:16:23.615Z",
        "updatedAt": "2020-11-23T19:16:23.615Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b0b",
        "suit": "DIAMOND",
        "value": "7",
        "code": "D7",
        "imageURL": "https://deckofcardsapi.com/static/img/7D.png",
        "createdAt": "2020-11-23T19:16:23.615Z",
        "updatedAt": "2020-11-23T19:16:23.615Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b0c",
        "suit": "CLUB",
        "value": "4",
        "code": "C4",
        "imageURL": "https://deckofcardsapi.com/static/img/4C.png",
        "createdAt": "2020-11-23T19:16:23.615Z",
        "updatedAt": "2020-11-23T19:16:23.615Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73b0d",
        "suit": "CLUB",
        "value": "9",
        "code": "C9",
        "imageURL": "https://deckofcardsapi.com/static/img/9C.png",
        "createdAt": "2020-11-23T19:16:23.616Z",
        "updatedAt": "2020-11-23T19:16:23.616Z"
      }
    ],
    "sessionId": "5fbc0a87b3f2d00004c73ad6"
  }
}
```

## Get Player By Session Id and Player Name

### GET
### URL: https://my-deck-api.herokuapp.com/api/v1/player

### Query Params
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Session ID | String | references session id from creation | x
| Player Name | String | unique player name that you created | x

### Example Query Param Request Values
```
{
    "sessionId": "5fbc0a87b3f2d00004c73ad6"
    "name": "player 1"
}
```

### Example Response

```

  "success": true,
  "message": "Player Found",
  "statusCode": 200,
  "data": {
    "id": "5fbc0a87b3f2d00004c73ad7",
    "name": "player 1",
    "cards": [
      {
        "_id": "5fbc0a87b3f2d00004c73ad8",
        "suit": "HEART",
        "value": "ACE",
        "code": "HA",
        "imageURL": "https://deckofcardsapi.com/static/img/AH.png",
        "createdAt": "2020-11-23T19:16:23.609Z",
        "updatedAt": "2020-11-23T19:16:23.609Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ad9",
        "suit": "SPADE",
        "value": "JACK",
        "code": "SJ",
        "imageURL": "https://deckofcardsapi.com/static/img/JS.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ada",
        "suit": "HEART",
        "value": "10",
        "code": "H1",
        "imageURL": "https://deckofcardsapi.com/static/img/0H.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73adb",
        "suit": "SPADE",
        "value": "QUEEN",
        "code": "SQ",
        "imageURL": "https://deckofcardsapi.com/static/img/QS.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73adc",
        "suit": "CLUB",
        "value": "6",
        "code": "C6",
        "imageURL": "https://deckofcardsapi.com/static/img/6C.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      }
    ],
    "sessionId": "5fbc0a87b3f2d00004c73ad6"
  }
}
```
## Draw

### POST
### URL: https://my-deck-api.herokuapp.com/api/v1/player/draw

### Body Request Values
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Session ID | String | references session id from creation | x
| Player Name | String | unique player name that you created | x
| Pile Name | String | unique pile name that you created | x
| Amount | Number | number of cards you want to draw | 

_Default Amount = 1_

### Example DEFAULT Body Request

```
{
    "sessionId": "5fbc14b413d4e80004e8eb27",
    "name": "player 1",
    "pileName": "draw"
}
```

### Example Body Request with Amount

```
{
    "sessionId": "5fbc14b413d4e80004e8eb27",
    "name": "player 1",
    "pileName": "draw",
    "amount": 3
}
```

### Example Response

```
{
  "success": true,
  "message": "Player Card Drawn",
  "statusCode": 200,
  "data": {
    "id": "5fbc0a87b3f2d00004c73ad7",
    "name": "player 1",
    "cards": [
      {
        "_id": "5fbc0a87b3f2d00004c73ad8",
        "suit": "HEART",
        "value": "ACE",
        "code": "HA",
        "imageURL": "https://deckofcardsapi.com/static/img/AH.png",
        "createdAt": "2020-11-23T19:16:23.609Z",
        "updatedAt": "2020-11-23T19:16:23.609Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ad9",
        "suit": "SPADE",
        "value": "JACK",
        "code": "SJ",
        "imageURL": "https://deckofcardsapi.com/static/img/JS.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ada",
        "suit": "HEART",
        "value": "10",
        "code": "H1",
        "imageURL": "https://deckofcardsapi.com/static/img/0H.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73adb",
        "suit": "SPADE",
        "value": "QUEEN",
        "code": "SQ",
        "imageURL": "https://deckofcardsapi.com/static/img/QS.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73adc",
        "suit": "CLUB",
        "value": "6",
        "code": "C6",
        "imageURL": "https://deckofcardsapi.com/static/img/6C.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae4",
        "suit": "SPADE",
        "value": "7",
        "code": "S7",
        "imageURL": "https://deckofcardsapi.com/static/img/7S.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:21:21.470Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae5",
        "suit": "SPADE",
        "value": "ACE",
        "code": "SA",
        "imageURL": "https://deckofcardsapi.com/static/img/AS.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:16:23.611Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae6",
        "suit": "CLUB",
        "value": "ACE",
        "code": "CA",
        "imageURL": "https://deckofcardsapi.com/static/img/AC.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:16:23.611Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae7",
        "suit": "SPADE",
        "value": "10",
        "code": "S1",
        "imageURL": "https://deckofcardsapi.com/static/img/0S.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:16:23.611Z"
      }
    ],
    "sessionId": "5fbc0a87b3f2d00004c73ad6"
  }
}
```

## Discard

### POST
### URL: https://my-deck-api.herokuapp.com/api/v1/player/discard

### Body Request Values
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Session ID | String | references session id from creation | x
| Player Name | String | unique player name that you created | x
| Pile Name | String | unique pile name that you created | x
| Cards | Card[] | card does not need to have url image value | x - at least one 

### Example Body Request

```
{
    "sessionId": "5fbc14b413d4e80004e8eb27",
    "name": "player 1",
    "pileName": "discard",
    "cards": [
        {
            "suit": "CLUB",
            "value": "ACE",
            "code": "CA"
        },
        {
            "suit": "SPADE",
            "value": "10",
            "code": "S1"
        }
    ]
}
```

### Example Response

```
{
  "success": true,
  "message": "Player Card(s) Discarded",
  "statusCode": 200,
  "data": {
    "id": "5fbc0a87b3f2d00004c73ad7",
    "name": "player 1",
    "cards": [
      {
        "_id": "5fbc0a87b3f2d00004c73ad8",
        "suit": "HEART",
        "value": "ACE",
        "code": "HA",
        "imageURL": "https://deckofcardsapi.com/static/img/AH.png",
        "createdAt": "2020-11-23T19:16:23.609Z",
        "updatedAt": "2020-11-23T19:16:23.609Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ad9",
        "suit": "SPADE",
        "value": "JACK",
        "code": "SJ",
        "imageURL": "https://deckofcardsapi.com/static/img/JS.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ada",
        "suit": "HEART",
        "value": "10",
        "code": "H1",
        "imageURL": "https://deckofcardsapi.com/static/img/0H.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73adb",
        "suit": "SPADE",
        "value": "QUEEN",
        "code": "SQ",
        "imageURL": "https://deckofcardsapi.com/static/img/QS.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73adc",
        "suit": "CLUB",
        "value": "6",
        "code": "C6",
        "imageURL": "https://deckofcardsapi.com/static/img/6C.png",
        "createdAt": "2020-11-23T19:16:23.610Z",
        "updatedAt": "2020-11-23T19:16:23.610Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae4",
        "suit": "SPADE",
        "value": "7",
        "code": "S7",
        "imageURL": "https://deckofcardsapi.com/static/img/7S.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:21:21.470Z"
      },
      {
        "_id": "5fbc0a87b3f2d00004c73ae5",
        "suit": "SPADE",
        "value": "ACE",
        "code": "SA",
        "imageURL": "https://deckofcardsapi.com/static/img/AS.png",
        "createdAt": "2020-11-23T19:16:23.611Z",
        "updatedAt": "2020-11-23T19:21:59.966Z"
      }
    ],
    "sessionId": "5fbc0a87b3f2d00004c73ad6"
  }
}
```

## Shuffle from one pile to another pile

### POST
### URL: https://my-deck-api.herokuapp.com/api/v1/pile/shuffle

### Body Request Values
| Attribute | Type | Description | Required |
| ----------- | ----------- | ----------- | ----------- |
| Session ID | String | references session id from creation | x
| To Pile Name | String | unique pile name that you created | x
| From Pile Name | String | unique pile name that you created | x
| From Remaining Amount | Number | number of cards to remain in from pile | 

_Default From Remaining Amount = 0_

### Example Body Request

```
{
    "to": "draw",
    "from": "discard",
    "sessionId": "5fbc14b413d4e80004e8eb27",
    "remaining_from": 1
}
```

### Example Response

```
{
  "success": true,
  "message": "Piles Shuffled and Transferred",
  "statusCode": 200
}
```

# External Documentation

## RAPID API
https://rapidapi.com/jhayes99823/api/mydeckapi2/endpoints

## Postman Collection Documentation
[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/d359675b7b8b75e313c9)



