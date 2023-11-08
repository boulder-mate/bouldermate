# BoulderMate Product Documentation

This document outlines the intended functionality of all features offered by the BoulderMate app as a product itself. It should be adapted each time an update is pushed appropriately. Each section pertains to a different feature, and this document is intended to cover all features - such that it could also be used as a guideline for testing each of these features respectively.

**Features in italics are yet to be added**

## <ins>Routes</ins>

#### Uploading Routes
  - Routes page has an Upload Route button to access the upload flow
  - Can select multiple colours, where multiple selections display in a 'rainbow'
  - Can optionally set grade scale, grade and routes
  - Required fields are routesetters,
  - Preview button directs to RoutePage where the header button is an upload
  - All data in the preview page feeds through correctly
  - Upload button on a preview RoutePage prompts an alert to confirm upload
  - Route options are correct + all supported
  - *Only routesetter or gym admin accounts can upload a route*
  - *Gym options are only those gyms the routesetter is associated with*

  - Routesetters come just from the gym selected, can select multiple and multiple are displayed
  - 

#### Modifying routes

  - Routesetters who worked on the original route can modify, via an edit button in the top right corner
  - This button navigates to the same screen as the upload page, where the route data is fed in
    - This has an additional checkbox to make the route inactive
  - Preview button takes to a RoutePage style display as in the upload process
    - This now has a button that says "Publish" instead of "Upload"

#### Querying + Finding routes

  - Gym page queries all active routes on the gym, displayed as cards
  - Clicking these cards brings up a RoutePage which has all available information on the Route
  - RoutePage has accurate information which dynamically adapts to exclude N/A fields
  - RoutePage has a button which displays the project status a user has with this route. Clicking this brings a dropdown where users can select status
  - RoutePage has functional discussion section, and the option to rate the route if a user has it in their projects

## <ins>Auth</ins>

The details of the auth for gyms largely outlines the business model

#### Account Creation

- User with no history lands on Register page
- Quick login discovers user_id previously stored in local storage or creates new user
  - New user has no email and is called anonymous-{uuid}
  - In 'Me' section there is a big button to register an account - persists as long as user has no email
  - These accounts are purely databased and insecure!
- Google Sign In is available
- Facebook Sign In is available
- Apple Sign In is available for iOS users
- BoulderMate Sign In simply asks for the registered email, and offers the same Register an account button as the Me section
- BoulderMate Account Registration enables email and password account creation
  - Also takes first name, last name, username, optional phone number

#### Account Login

- All user ids and tokens are stored in local storage once logged in for the first time
  - Ensure this is stored with the app itself so it is not session-based
  - Use the presence of a token to determine if a user is anonymous

#### Account Logout

- Logout button belongs at bottom of profile tab

#### Account Deletion

- 'Me' section has a Delete Account button for all types of accounts

#### Tiers & Permissions

- Gym accounts **
  - Gym account creation does not exist in the app and is done manually by staff when contacted by Gym
    - Login page has text which says 'I want to register a gym'
    - Gym account and location creation follows from this - requests card details
  - Gym data is stored seperately to the gym admin accounts
    - Admins can modify this data in the 'My Gym' option of the 'Me' section
  - Gym account has access in 'Me' section to Card details which run through Stripe
    - If Gym account somehow has no card details, this should be the first screen which pops up
  - Gym accounts can add Routesetters, who are added directly by BoulderMate username
  
- Routesetters
  - Routesetters have a "Routesetter" badge
  - Routesetters and Gym Account have access to the 'Add Route' button in the 'Gym' section

## Achievements & Experience

The idea is that this drives the motivation of the end user

#### Badges

- System Admin
- Gym
- Routesetter
- Veteran (x amount of experience)
- Legend (y > x amount of experience)
- Other ideas regarding in-gym achievements




** Gym accounts are one the most crucial element to BoulderMate as a business, and will perhaps need revision