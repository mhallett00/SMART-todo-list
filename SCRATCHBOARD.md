# PROJECT SCOPE

# Option 6: Smart TODO List
When you are recommended something it's not always easy to jot it down for later in an organized fashion. Adding the item to your phone or computer ends up taking time and opening up the right app is only part of the problem. You then have to locate the right list ("Movies to watch", "Books to read", etc.) to add to. And if you do get it in to the right list, you don't have much more context about it. This delay and lack of additional information acts as a huge deterrent.

The solution? A smart, auto-categorizing todo list app. The user simply has to add the name of the thing, and it gets put into the correct list.

# Requirements:
Each todo created should be categorized as one of:

- Film / Series (To watch)
- Restaurants, cafes, etc. (To eat)
- Books (To read)
- Products (To buy)
- In order to determine the category the app will probably need to use various API services such as those offered by Google, Wolfram Alpha, Rotten Tomatoes, Amazon, Yelp and others.

API services mentioned above are only suggestions. You will have to investigate how to balance the accurate categorization of items with having to deal with multiple API endpoints.

Users should be able to change a category of an item in case it was mis-categorized or could not be categorized at all.

Users should be able to register, log in, log out and update their profile.

## DATA

#### What is the data you can access or acquire?
USERS
ENTRIES
API DATABASES
stylings SASS/CSS

#### Can you correlate that data to something else?
users to their entries through a database



#### How can you pivot that data to add value?
Automatically categorizing it for the user

## USER STORIES

“As a __________,
I want to __________
Because ____________.”

AS a user
I want to record things I'm interested in
Because I will forget

As a user
When I add an item I want it to be categorized automatically

AS a user 
I should be able to recategorize items if i need to
because my list my choice

Given that I want to save am 'item' 
When I tap the icon to save the item
Then the app saves it automatically to a category
And an icon changes/notifies me to indicate that the 'item' has been categorized automatically

<!-- stretch -->
As a user
i should have a private/secure list
because I don't want to be embarrassed
i.e. multiple lists


## FEATURES
1. save & categorize entry
2. account management
3. view entries
4. modify entries

MVP: 1, 2, 3



## ROUTES

HTTP VERB           ROUTE                          ACTION                     Used For

GET                 /todos                         index action               index page to display all lists

GET                 /todos/:id                     show action                displays a users todos on ID in url
GET                 /todos/:entry/edit(?)          edit action                displays edit form based on ID in url        
GET                 /login/:id                     login bypass       
GET                 /logout                        logout user                logout user
POST                /todos                         create action              add an item to list
POST                /register                      register action            register user
GET                 /register                      show action                displays user register form
                   

front end > AJAX api calls > server
when server connects: document.ready > GET request to get API keys

## TASKS

DATABASE
- create and seed tables
- create basse queries for insertion, dleteions, updates, etc.

JAVASCRIPT/JQUERY

EXPRESS?

APIs
- movies
- books
- restaurants
- products
- wolfram alpha free tier


BASE CSS/SASS


### QUESTIONS FOR SATURDAY MENTORSHIP
- routes alright?
- Jquery and express?
- what was the template1 database for?





Possible APIs

Google Places API
