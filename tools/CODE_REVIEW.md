# BOOKS CODE REVIEW

- 4 unit tests failed from 2 test suites. Code with failing tests should never be committed to master.
- Unit test coverage is very poor. A lot of functionality is not tested at all. Needs a lot more.
- Organization is poor in the state folder. Once the app grows this will be hard to manage. I prefer the groups to be put into separate directories or separate directories for actions, effects, and reducers. I prefer a separate directory for each entity grouped into the feature module. I also would like to remove the +state directory altogether. I believe it's really not needed if we group the entities into separate directories.
- The Effects classes has the constructor at the bottom. I would prefer it near the top for readability since there is dependency injection.
- In the feature components we select and dispatch actions directly from the store. It may help to separate concerns (keep components presentational) if we use facade services that interacted with the store and are then used in the component classes through dependency injection.

## Accessibility Review

  ### Two issues were found giving the accessibility test an 82:
  - Buttons do not have an accessible name.
  - Background and foreground colors do not have a sufficient contrast ratio. 'p' elements failed
