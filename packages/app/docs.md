# BoulderMate Documentation

This document outlines the intended functionality of all features offered by the BoulderMate app. It should be adapted each time an update is pushed appropriately. Each section pertains to a different feature, and this document can be used as a guideline for testing each of those features respectively.

## <ins>Routes</ins>

#### Uploading Routes

  - Only routesetter or gym admin accounts can upload a route
  - Gym options are only those gyms the routesetter is associated with
  - Route options are correct + all supported
  - Routesetters come just from the gym selected, can select multiple and multiple are displayed
  - Can select multiple colours, where multiple selections display in a 'rainbow'
  - Can optionally set grade scale, grade and routes
  - Preview button directs to RoutePage where the header button is an upload
  - All data in the preview page feeds through correctly
  - Upload button on a preview RoutePage prompts an alert to confirm upload and indicate price

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

