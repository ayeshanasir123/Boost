# Developer Naming Conventions
By following these naming conventions, we ensure that our codebase is consistent, readable, and maintainable.

## Methods
- **Methods in code should be written in camelCase.**
  - Example: `run()`, `runFast()`, `getBackground()`.

## Variables

- **Variables in code should be written in camelCase.**
  - Example: `userName`, `totalAmount`, `isActive`.

## Constants

- **Constants in code should be written in SCREAMING_SNAKE_CASE.**
  - Example: `MAX_USERS`, `SOMETHING_ELSE`.
  - This does not apply to constants that use ref in Vue. They should be considered as standard variable.

## Directories

- **Directories should follow kebab-case.**
  - Example: `/app/config`, `/src/my-folder`.

## Filenames

- **Filenames should in general follow camelCase.**
  - Example: `userProfile.ts`, `dataProcessor.ts`.

## Single-file components and views

- **Single-file components should always follow kebab-case.**
  - Example: `my-component.vue`, `login-screen.vue`.

## Views

- **Views should not end with "View" by default.**
  - Only if the page is specifically for viewing details of an entity should it end with "View."
  - Example: `PersonView` for a page showing detailed information of a person.
  - Other views can have descriptive names that convey their purpose without the "View" suffix.
    - Example: `Dashboard`, `UserForm`, `LoginScreen`.

## Models

- **Models should be named in singular form.**
  - Example: `User`, `Product`, `Order`.

- **Model filenames should always follow PascalCase.**
  - This provides a clear distinction between general files, views and models, which is beneficial for organization and readability.
  - Example: `UserModel.ts`, `OrderView.vue`, `InvoiceModel.ts`.
