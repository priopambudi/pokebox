# Pokebox

#### Place to find your vafourite Poke!

This site is live here [https://pokebox.vercel.app](https://pokebox.vercel.app)

## Tools

- React
- Vite
- Typescript
- Tailwind
- Axios
- Context
- Custom Hooks
- Atomic Design

## Whats interested

### 1. Component Structure:

- Components Folder: Used to handle the reusable component, such as a Button, Card, Loading, etc.
- API Folder Components: Used to store axios request instance.
- Assets: Used to store all the image and gif data.
- Hooks: Utilize custom hooks, such as useAxios, to handle API calls and state, keeping logic separate from components.
- Context: Implement context for global state, such as a PokeContext to store Pokemon data accessible throughout the application.
- Interfaces: store all interfaces in one file to separate from main component and easy to maintain.
- Pages: Used for file pages that use in Application such as Home and Detail Page.
- Router: Maintain routing to every page and implementing Layout element.

### 2. Error and Edge Case Handling:

- Async await Handling: Add async await when hit api to manage errors like 404 or 500 and display user-friendly notifications or error messages.
- Fallback UI: Implement a error component or a fallback message when the API is unavailable.

### 3. State Management:

- React Context for Global State: Use context for globally available data, such as the Pokemon data fetched from the API.
- Custom Hooks for Asynchronous Requests: Create custom hooks like useAxios that handle API fetching and maintain loading, error, and data states.

### 4. Writing Tests for Components:

- Unit Tests (haven't implemented, will update asap): Use Jest and React Testing Library to test components at the unit level, including rendering and state changes based on props or specific events.

### 5. Ensuring Application Security:

- Set Up a Proxy: Configure a proxy server that acts as an intermediary between application and the third-party API.

### 6. Data Validation and Sanitization:

- Define Interfaces. Start by defining interfaces that represent the structure of the data expect from the API.
- Fetch Data and Validate Using the Interface. Used these interfaces to type the response.

### 7. Implementing Pagination and Search Functionality:

- Pagination: Use simple button component that calls the API when clicked with offset and limit parameters. Store pagination data in Context.
- Search Functionality: Implement a search bar that updates the state based on user input and calls the API according to the search query parameters.
- Optimization: Used form submit and clear icon to optimize that user is right when typed the query value.

## Run on your local

```
git clone

npm i

npm run dev
```

happy coding 👋🏻
