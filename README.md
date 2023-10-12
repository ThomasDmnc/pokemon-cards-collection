
# Pokéllection
[Click here to see the deployed app](https://playful-faun-068941.netlify.app/)

## Project Description

Pokéllection is React web application which is going to help you monitor your Pokémon cards collection.
It helps you check cards information, create your collection of cards by adding the cards into it.
You can check also the overview data of your cards' collection.

## MVP (Minimum Viable Product)

The MVP of this project includes the following users features:
1. **Cards Search**: The user can search cards stored in the [Pokémon TCG API](https://pokemontcg.io/)

2. **Collection Management**: The user can create, update collection's information and delete his collection.

3. **Adding Cards to Collection**: The user can add cards from the [Pokémon TCG API](https://pokemontcg.io/) into his collection previously made.

4. **Data overview**: In the collection, the user has overview data about his collection. ex: Trending value of all his cards. 


## Backlog

User actions linked to API calls to Pokémon TCG API:
- [x] See a list of cards
- [x] Can go to a card page to see the details of the card
- [x] Search cards out of the list cards

User actions linked to API calls to our JSON server:
- [x] Can go to a collection(s) page
- [x] Can create a collection
- [x] Can update the collection
    - [x] Can delete the collection
- [x] Can have some aggregated details of cards in the collection page
- [x] Can add cards to a collection
- [x] Can delete cards from a collection

Add-ons:
- [x] Animation in Card details


## Project File Structure
In the project we used [Material UI](https://mui.com/material-ui/) for components ready material and we added some CSS files and inline styling.

`Pages`: 
- `Homepage.jsx`
- `CollectionsPage.jsx`
- `CollectionDetailsPage.jsx`
- `NewCollectionPage.jsx`
- `UpdateCollectionPage.jsx`
- `CardsDetails.jsx`

`Components`:
- `CardGrid.jsx`
- `MySnackBar.jsx`
- `Navbar.jsx`
- `DataCollection.jsx`

## Links

- [Presentation Link](https://docs.google.com/presentation/d/1cyyZBah52xKUcmztpI5PxqzSTHvcgKfNLI-Ggl3bTHs/edit?usp=sharing)
- [Github repository Link for React app](https://github.com/ThomasDmnc/pokemon-cards-collection)
- [Github repository Link for Server app](https://github.com/ThomasDmnc/pokemon-cards-server)
- [Deployment Link](https://playful-faun-068941.netlify.app/)
