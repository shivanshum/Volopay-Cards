# Volopay-Cards
 Volopay Front-end Assignment
###Getting Started
To use the CardListing component in your project, follow these steps:

Install the required dependencies:

React: "^16.0.0" or higher
Tailwind CSS: Install the required Tailwind CSS dependencies and import the appropriate styles.

###Project Structure
The project structure consists of the following components and functions:

* CardListing component: The main component responsible for rendering the card listing.
It manages the state, handles user interactions, and displays the filtered cards.

initialState: Represents the initial state of the component, including the cards array, activeTab, page, searchTerm, and selectedType.

reducer function: Handles state updates based on dispatched actions. It determines how the state should change in response to different actions.

fetchCards function: Simulates an API call to fetch card data. It returns a Promise that resolves to an array of cards.

fetchData function: Calls the fetchCards function and updates the state with the fetched data.

handleTabClick function: Handles the click event on the tab navigation buttons. It dispatches an action to update the activeTab in the state.

handleScroll function: Listens to the scroll event and checks if the user has reached the bottom of the page. If so, it dispatches an action to update the page in the state.
handleSearch function: Updates the searchTerm in the state based on the user's input in the search input field.
handleFilter function: Updates the selectedType in the state based on the user's selection in the filter dropdown.
filteredCards memoized variable: Filters the cards based on the activeTab, searchTerm, and selectedType in the state. It returns an array of filtered cards.
useEffect hooks: Used to fetch initial card data on component mount and attach/detach event listeners.
Rendering: The component renders the tab navigation, search and filter components, and the list of filtered cards.
