# doctor-visits
A health app for logging doctor visits.

## Technologies used: Express, EJS, MangoDB, Mongoose, Bootstrap CSS, HTML, and  Heroku.

- I used bootstrap to style the buttons on each page.

- I used `bootstrap cards` to make the user profile into sections to look more organized.

----

## Sources:

- For the delete button modal, I used jQuery submit method here: `https://api.jquery.com/submit/`

- For the gender selection, I used a radio button selection here:
 `https://stackoverflow.com/questions/28543752/multiple-radio-button-groups-in-one-form`

 - For the shadow on the buttons, I got it from here: `https://ianlunn.github.io/Hover/`. Since hovering does not work on mobile, I took out the hover effect, thus it only shows a shadow under the buttons.

 - For text shadow: `https://www.w3schools.com/cssref/css3_pr_text-shadow.php`

 - For the calendar date picker in the `new visit` page, I used a defaulte date picker here: `https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today#comment83721109_6982754`

- Sort function for the names in the `index` page taken from here: `https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript`
    - Note: the sort is done by sorting capitalize first so apply .toLowerCase() to sort alphabetically for case insensitivity

 - Classmates and Alexis

----
## Difficulties:

- I miscalculated when planning my pages out - so instead of using `localhost:3000/"name here"` as the main page, I ended up using localhost:3000 as my `main/landing page` before the user can navigate to the other pages.

- I had to keep adding more ejs pages as the actual scope of work was more than I had initially planned out in the wireframe.

- Couldn't get the shadow effect working for my input buttons so I had to change it to a button class instead.

- Not able to get the date picker to show correctly on mobile device: 
<img src="iphone-date-input-empty.png" width="250">

----

## Biggest Struggle:

- I struggled with each of the CRUD actions in the visits array. The visits array is an array of objects in the patients collection. Alex recommended creating a second schema to associate the Patient to their Visits. I ended up not doing that because I managed to get it working using indexes to get the array items.

- Had trouble grabbing the information for an object that's inside of an array for the `visit summary`.

    - Instead of creating a second schema for a patient's visits and associating them, I ended up using the index for each visit's document when updating. 

    - Struggle: I couldn't figure out how to delete a visit based on the index

- Must use dot notation to target the specific index in the visits array

Document here: `https://www.mongodb.com/docs/manual/reference/operator/update/positional/#update-values-in-an-array`

----

## Wireframe (initial): 

- `Main/index.ejs page`, include a Log Today's Visit button at the top.

`Create page`:
- Log Today's Visit button gives you the option of creating a new patient or go to an existing patient.
    - Existing patient will already have patient information and previous visits.
    - Create a new patient will load a new patient form into the `new.ejs`.

- Information will then be displayed on the `show.ejs` page with the option to `update` or `delete` information.

## Wireframe (new):

What I did not expect was the additional functionality I needed to include such as:

 - After submitting the info for a new patient, it will go to a page for adding new visits in `visitnew.ejs`. 
 - Then the information will display in the `show.ejs` page.
 - I also included an option for the user to be able to update a specific visit entry which will route to `visitedit.ejs`.
 - And the option to `add a new visit entry`.
    