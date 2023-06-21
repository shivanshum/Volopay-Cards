# Volopay-Cards
 Volopay Front-end Assignment

Assignment Description:
CardListing Component
The CardListing component is a React component that displays a list of cards based on different filters and search criteria. It allows users to view and filter their cards based on various parameters such as card type, status, and search terms.

Project Overview
This project showcases the implementation of a card listing feature using React. The main components and features of the project include:

CardListing component: The main component that displays the card listing.
Tab navigation: Allows users to switch between different tabs to view different sets of cards.
Search and filter: Enables users to search for cards by name and filter cards based on card type.
Infinite scroll: Automatically loads more cards as the user scrolls to the bottom of the page.
 
### Getting Started
To use the CardListing component in your project, follow these steps:

Install the required dependencies:

React: "^16.0.0" or higher
## npx create-react-app card-listing
Tailwind CSS: Install the required Tailwind CSS dependencies and import the appropriate styles.
## npm install -D tailwindcss
## npx tailwindcss init

### Project Structure
The project structure consists of the following components and functions:

* CardListing component: The main component responsible for rendering the card listing.
It manages the state, handles user interactions, and displays the filtered cards.

* initialState: Represents the initial state of the component, including the cards array, activeTab, page, searchTerm, and selectedType.

reducer function: Handles state updates based on dispatched actions. It determines how the state should change in response to different actions.

* fetchCards function: Simulates an API call to fetch card data. It returns a Promise that resolves to an array of cards.

* fetchData function: Calls the fetchCards function and updates the state with the fetched data.

* handleTabClick function: Handles the click event on the tab navigation buttons. It dispatches an action to update the activeTab in the state.

* handleScroll function: Listens to the scroll event and checks if the user has reached the bottom of the page. If so, it dispatches an action to update the page in the state.
  
* handleSearch function: Updates the searchTerm in the state based on the user's input in the search input field.
  
* handleFilter function: Updates the selectedType in the state based on the user's selection in the filter dropdown.
  
* filteredCards memoized variable: Filters the cards based on the activeTab, searchTerm, and selectedType in the state. It returns an array of filtered cards.
  
* useEffect hooks: Used to fetch initial card data on component mount and attach/detach event listeners.
  
* Rendering: The component renders the tab navigation, search and filter components, and the list of filtered cards.
  
### Explanation of each line of code in the `CardListing.js` file:


import React, { useEffect, useMemo, useReducer, useCallback } from 'react';
import '../components/CardListing.css';
```
- The `import` statements are used to import necessary dependencies and styles for the component. The `React` import is needed to define and use React components, while the `useEffect`, `useMemo`, `useReducer`, and `useCallback` imports are React hooks used within the component. The second import statement imports the CSS styles for the `CardListing` component.


const initialState = {
  cards: [],
  activeTab: 'Your',
  page: 1,
  searchTerm: '',
  selectedType: '',
};
```
- `initialState` is an object representing the initial state of the component. It contains properties such as `cards`, `activeTab`, `page`, `searchTerm`, and `selectedType`. These properties will be used to manage the state of the component.


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: [...state.cards, ...action.payload] };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_PAGE':
      return { ...state, page: state.page + 1 };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SELECTED_TYPE':
      return { ...state, selectedType: action.payload };
    default:
      return state;
  }
};
```
- `reducer` is a function that determines how the state should change based on the dispatched actions. It takes the current state and an action as parameters and returns the updated state. The reducer handles different action types such as `'SET_CARDS'`, `'SET_ACTIVE_TAB'`, `'SET_PAGE'`, `'SET_SEARCH_TERM'`, and `'SET_SELECTED_TYPE'`, updating the corresponding properties in the state.


const CardListing = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cards, activeTab, page, searchTerm, selectedType } = state;
```
- `CardListing` is a functional component defined using the arrow function syntax. It represents the main component that will be rendered.
- The `useReducer` hook is used to manage the component's state and dispatch actions to update the state. It takes the `reducer` function and `initialState` as parameters and returns the current state and a dispatch function.
- The `const { cards, activeTab, page, searchTerm, selectedType } = state;` line uses destructuring assignment to extract the state properties from the `state` object.


const fetchCards = useCallback(async (page) => {
  try {
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // ...
  } catch (error) {
    console.error(error);
    return [];
  }
}, []);
```
- `fetchCards` is a `useCallback` hook that defines a function for simulating an API call to fetch card data. It takes the `page` parameter representing the page number to fetch.
- The function uses `setTimeout` to simulate a delay in the API call.
- In a real-world scenario, you would replace this code with actual API calls to fetch the card data.


const fetchData = useCallback(async () => {
  const data = await fetchCards(page);
  dispatch({ type: 'SET_CARDS', payload: data });
}, [fetchCards

, page]);
```
- `fetchData` is another `useCallback` hook that defines a function responsible for fetching data using the `fetchCards` function and dispatching the `'SET_CARDS'` action to update the state with the fetched data.
- It depends on the `fetchCards` and `page` variables.

useEffect(() => {
  fetchData();
}, [fetchData]);
```
- The `useEffect` hook is used to trigger the `fetchData` function when the component is mounted.
- It depends on the `fetchData` variable, so it will be called whenever `fetchData` changes.


const handleTabClick = (tab) => {
  dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
};
```
- `handleTabClick` is a function that takes a tab name as an argument and dispatches the `'SET_ACTIVE_TAB'` action to update the `activeTab` property in the state.


const handleScroll = useCallback(() => {
  const isAtBottom =
    window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight;

  if (isAtBottom) {
    dispatch({ type: 'SET_PAGE' });
  }
}, []);
```
- `handleScroll` is a `useCallback` hook that defines a function to handle the scroll event.
- It checks if the user has scrolled to the bottom of the page by comparing the window height, current scroll position, and the document's total height.
- If the user has reached the bottom, it dispatches the `'SET_PAGE'` action to increment the `page` property in the state.

```jsx
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [handleScroll]);
```
- This `useEffect` hook adds and removes the scroll event listener when the component is mounted and unmounted, respectively.
- It depends on the `handleScroll` variable, so it will be called whenever `handleScroll` changes.

```jsx
const handleSearch = (event) => {
  dispatch({ type: 'SET_SEARCH_TERM', payload: event.target.value });
};
```
- `handleSearch` is a function that takes an event object as an argument, extracts the search term value from the event target (input field), and dispatches the `'SET_SEARCH_TERM'` action to update the `searchTerm` property in the state.

```jsx
const handleFilter = (event) => {
  dispatch({ type: 'SET_SELECTED_TYPE', payload: event.target.value });
};
```
- `handleFilter` is a function that takes an event object as an argument, extracts the selected filter value from the event target (select field), and dispatches the `'SET_SELECTED_TYPE'` action to update the `selectedType` property in the state.

```jsx
const filteredCards = useMemo(() => {
  return cards.filter((card) => {
    // ...
  });
}, [cards, activeTab, searchTerm, selectedType]);
```
- `filteredCards` is a memoized value created using the `useMemo` hook.
- It filters the `cards` array based on the current `activeTab`, `searchTerm`, and `selectedType` values.
- This memoized value will only be recalculated if any of the dependent variables (`cards`, `activeTab`, `searchTerm`, `selectedType`) change.

```jsx
return (
  <div className="card-listing">
    {/* Tab navigation */}
    <div className="tab-navigation">
      {/* ... */}
    </div>

    {/* Search and filter */}
    <div className="search-filter">
      {/* ... */}
    </div>



    {/* Card list */}
    <div className="cards">
      {/* ... */}
    </div>
  </div>
);
```
- The `return` statement defines the JSX markup that will be rendered by the component.
- It renders the main container with the class `card-listing` and contains three sections: tab navigation, search and filter, and the card list.
- The actual content of these sections is not shown in the provided code snippet.

This explanation covers the code in the `CardListing.js` file and describes the purpose and functionality of each line. Keep in mind that this is just a partial explanation, and the omitted parts may contain additional functionality for the component.
  
