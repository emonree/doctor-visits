# doctor-visits
A health app for logging doctor visits

## Technologies used: Bootstrap CSS, HTML, Express, EJS, MangoDB, Mongoose, Heroku

- I used bootstrap to style the buttons on each page.

## Sources

- For the delete button modal, I used jQuery submit method here: `https://api.jquery.com/submit/`

- For the gender selection, I used a radio button selection here:
 `https://stackoverflow.com/questions/28543752/multiple-radio-button-groups-in-one-form`

## Difficulties:

- Instead of using localhost:3000/"name here", I messed up with planning my pages out, so I used localhost:3000 as my main/landing page before the user can navigate to the other pages.

- I had to keep adding more ejs pages as the actual scope of work was more than I had initially planned out in the wireframe.

- Had trouble grabbing the information for an object that's inside of an array for the visit summary.
    - Instead of creating a second schema for a patient's visits and associating them, I ended up using the index for each visit's document when updating. 
    - Struggle: I couldn't figure out how to delete a visit based on the index

## Wireframe (after many changes): 

- `Main/index.ejs page`, include a Log Today's Visit button at the top.

`Create page`:
- Log Today's Visit button is suppose to give you the option of creating a new patient or go to an existing patient.
    - Existing patient will already have patient information and previous visits.
    - Create a new patient will load a new patient form into the `new.ejs`.
 - After submitting the info for a new patient, it will go to a new page for adding new visits in `visitnew.ejs`. 
 - Then the information will display in the `show.ejs` page.
    