# Smart TODO List
### User Stories
> As a user
>
>I want to record things I'm interested in
>
> because I will forget

> As a user
>
> when I add an item 
>
> I want it to be categorized automatically

> As a user 
>
> I should be able to recategorize items if I need to
>
> because my list my choice

## What it does
- User enters text into the form and the app automatically categorizes it into one of:
1. *To Read*
2. *To Watch*
3. *To Eat*
4. *To Buy*

## Why we chose it
We wanted to learn more about APIs and the app actually sounded powerful.

## How it works
When a user clicks `add`, the app searches through 4 different APIs until it finds a match.

## APIs
We used four different APIs, one for each caetgory.

1. To Read (**Google Books API**)
2. To Watch (**OMDB API**)
3. To Eat (**Yelp Fusion API**)
4. To Buy (**Wolfram Alpha API**)

## Main Problems We Had to Solve
1. How to get our app to wait until it finishes searching each API before returning (async)
2. How to decide which category an item should be put into
3. How to allow the user to recategorize items

## How We Solved Them
1. We wrapped each of our API calls in a `Promise.all()`
    - the `promise` waits for each API call to complete before returning the results
    - the output from our `apiSorter` function is an array which looks like this:
    ``` js
    [true, false, false, true]
    ```
    - each index is assigned to one of the categories
    - calling four APIs means our app is a little slow
    - we traded speed for power
    
2. We had each API call return a `boolean`
    - achieving this was different for each API because the objects being returned were all completely different
    - the first API to return `true` sends the item into the category linked to that API (by using the index from our returned array above)

      - e.g. if the Yelp Fusion API returns `true`, the item goes into the category 
      **To Eat**
      - if it returns `false`, move onto the next API
    - At first we had a conditional which checked if any data at all was returned from the search 
      - If yes, return `true` and categorize
      - This ended up being too unspecific and resulted in a lot of miscategorization
      
        - e.g. typing a string like 'American Born Chinese' (which is a book) gave results which included any of those keyword, so it would return `true` and put it into **To Eat**, presumably finding results related to chinese food
      - We refactored to compare for an exact string match within the results
        - this greatly improved categorization
        
3. We stored the item ID in a temporary `html` element
    - We used a **Bootstrap** modal to allow the user to edit lists
    - Because the modal is a temporary element, it is not connected to the actual data from the database
    - To connect the data, we created a temporary hidden `html` element that only exists while the modal is open
    - On the `click` event, the data belonging to the clicked item is stored in the temporary element
    - Now the modal can access it, and update the category ID
    - The item is recategorized, and the modal and the temporary element disappear

## What we would do differently
- Maybe go with one API so we could more easily manipulate the data for greater sorting precision
- With four APIs, we had do deal with a lot of data at a pretty shallow level. Pretty unwieldy
- One API would probably be much faster
- Know more
- Some APIs (the most convenient) are only available through purchase or applying for a license


