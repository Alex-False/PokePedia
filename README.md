# PokéPedia

### Project Overview
The PokéPedia project is a web application that serves as a comprehensive reference for Pokémon-related information. It utilizes the PokéAPI to provide users with a user-friendly interface to explore and search for data about Pokémon, moves, items, and locations.

### Problem Statement
Pokémon fans struggle to gather comprehensive information about Pokémon from scattered sources. The PokéPedia project aims to solve this problem by offering a centralized platform for Pokémon-related data. It enhances users' ability to access accurate and detailed information conveniently.

# Pages

>## Landing Page
The landing page of PokéPedia serves as the entry point for users to explore the world of Pokémon. It provides a visually appealing and welcoming introduction to the website. The landing page HTML and CSS code create an engaging layout with a Pokémon-themed design.

### HTML Code
The HTML code defines the structure of the landing page. It consists of a header, a main container, and a background element. The header displays the PokéPedia logo or any other relevant branding. The main container holds the welcome message, inviting users to explore PokéPedia, and a button that allows them to enter the website. The background element provides a space for dynamic Pokémon sprites to move.

### CSS Styling
The CSS styling enhances the visual presentation of the landing page. It sets the overall layout, color scheme, and typography. The main container is styled with a semi-transparent background, rounded corners, and a subtle shadow effect, giving it a modern and attractive appearance. The welcome message is displayed in contrasting colors to make it stand out, while the button is styled to provide an interactive feel when hovered over.

The background element, with the class pp__landingBackground, is where the Pokémon sprites move. Each sprite is represented by a div element with the class sprite. The sprite class defines the size and background image of the sprites.

### JavaScript Functionality
The JavaScript code enhances the landing page with dynamic features. It fetches Pokémon sprite images from the PokéAPI and adds them to the background element using the backGroundSprites and addSpritesToBackground functions. The backgroundSpritesCaller function fetches sprite images for a given number of Pokémon, and moveSprites function animates the movement of the sprites from right to left, creating an engaging visual effect.

The combination of HTML, CSS, and JavaScript brings the landing page to life, providing an inviting and visually appealing entry point to the PokéPedia website.

>## Main Page
The main page of PokéPedia serves as a hub for users to navigate through different categories related to Pokémon. It provides a comprehensive overview of four main categories: Pokémon, Locations, Items, and Moves. Each category offers unique content and functionality for users to explore.

### HTML Code
The HTML code defines the structure of the main page. It consists of a header, which contains the PokéPedia logo and a navigation bar. The navigation bar includes links to the individual pages for each category: Pokémon, Locations, Items, and Moves. The main content of the page is divided into four sections, each representing one category. Each section contains a title, a brief description, a button, and a container to display dynamic content.

### CSS Styling
The CSS styling enhances the visual presentation of the main page. It sets the overall layout, color scheme, and typography. The header is fixed at the top of the page and has a dark background color. The navigation bar provides easy access to different categories with a consistent styling for the links. The main content sections are styled with a semi-transparent background, rounded corners, and a subtle shadow effect. The headings, paragraphs, and buttons are appropriately styled to create an engaging and user-friendly design.

### JavaScript Functionality
The JavaScript code adds interactivity and dynamic functionality to the main page. It fetches random Pokémon, items, locations, and moves from the PokéAPI when the corresponding buttons are clicked. The fetched data is then displayed in the respective containers. The Pokémon section fetches a random Pokémon sprite, the Locations section fetches a random location image, the Items section fetches a random item sprite, and the Moves section fetches a random move sprite. The content is updated in real-time, providing users with a diverse and engaging experience.

The JavaScript code also includes animations for the buttons and the dynamic content. When a button is clicked, it triggers a CSS animation effect to add visual feedback. The dynamic content containers have classes that animate the content, creating a pop-out effect.

>## Pokémon Page
The Pokémon page of PokéPedia displays a grid of Pokémon sprites and provides search functionality for users to filter Pokémon based on their Pokedex ID, name, or type. Users can click on a Pokémon sprite to view detailed information about that Pokémon, including its ID, name, type, flavor text, base stats, evolution chain, capture rate, base experience, gender rate, growth rate, and legendary/mythical status.

### HTML Code
The HTML code defines the structure of the Pokémon page. It includes a header with the PokéPedia logo, a navigation bar with links to the Home, Locations, Items, and Moves pages, and a search bar for filtering Pokémon sprites. The main content of the page is a container that holds the grid of Pokémon sprites.

### CSS Styling
The CSS styling enhances the visual presentation of the Pokémon page. It sets the overall layout, color scheme, and typography. The header is fixed at the top of the page and has a dark background color. The navigation bar provides easy navigation between different pages with consistent styling for the links. The search bar is positioned next to the navigation bar and has a magnifying glass icon. The Pokémon sprites are displayed in a grid layout with a semi-transparent background and rounded corners. Each sprite is styled based on its type, and hovering over a sprite scales it slightly and changes the cursor to indicate interactivity.

### JavaScript Functionality
The JavaScript code adds interactivity and dynamic functionality to the Pokémon page. It fetches Pokémon data from the PokéAPI, including their sprites, types, flavor text, base stats, evolution chain, capture rate, base experience, gender rate, growth rate, and legendary/mythical status. It dynamically creates sprite elements for each Pokémon, assigns appropriate CSS classes based on their types, and appends them to the main container. When a sprite is clicked, a dynamic page is created with detailed information about the Pokémon. The search bar allows users to filter Pokémon sprites based on their Pokedex ID, name, or type, providing a convenient way to find specific Pokémon.

The JavaScript code also includes functionality for toggling the search bar and handling the back button. Clicking the magnifying glass icon toggles the search bar's visibility. Clicking the back button on the dynamic page returns the user to the main Pokémon page.

>## Locations Page
The Locations page of PokéPedia displays a grid of different Pokémon locations. Each location is represented by a sprite, and users can click on a location to view detailed information about it, including the location's ID, name, region, encounter methods, and Pokémon encounters.

### HTML Code
The HTML code defines the structure of the Locations page. It includes a header with the PokéPedia logo, a navigation bar with links to the Home, Pokémon, Items, and Moves pages, and a search bar for filtering locations. The main content of the page is a container that holds the grid of location sprites.

### CSS Styling
The CSS styling enhances the visual presentation of the Locations page. It sets the overall layout, color scheme, and typography. The header is fixed at the top of the page and has a dark background color. The navigation bar provides easy navigation between different pages with consistent styling for the links. The search bar is positioned next to the navigation bar and has a magnifying glass icon. The location sprites are displayed in a grid layout with a semi-transparent background and rounded corners. Hovering over a sprite scales it slightly and changes the cursor to indicate interactivity.

### JavaScript Functionality
The JavaScript code adds interactivity and dynamic functionality to the Locations page. It fetches location data from the PokéAPI, including the location's ID, name, region, encounter methods, and Pokémon encounters. It dynamically creates sprite elements for each location and appends them to the main container. When a location sprite is clicked, a dynamic page is created with detailed information about the location. The search bar allows users to filter location sprites based on their ID, name, or region, providing a convenient way to find specific locations.

The JavaScript code also includes functionality for toggling the search bar and handling the back button. Clicking the magnifying glass icon toggles the search bar's visibility. Clicking the back button on the dynamic page returns the user to the main Locations page.

>## Items Page
The Items page of PokéPedia displays a grid of different Pokémon items. Each item is represented by a sprite and provides information about its name, category, effect, and attributes. Users can click on an item to view detailed information about it, including an enlarged sprite, category, effect, and attributes.

### HTML Code
The HTML code defines the structure of the Items page. It includes a header with the PokéPedia logo, a navigation bar with links to the Home, Pokémon, Locations, and Moves pages, and a search bar for filtering items. The main content of the page is a container that holds the grid of item sprites.

### CSS Styling
The CSS styling enhances the visual presentation of the Items page. It sets the overall layout, color scheme, and typography. The header is fixed at the top of the page and has a dark background color. The navigation bar provides easy navigation between different pages with consistent styling for the links. The search bar is positioned next to the navigation bar and has a magnifying glass icon. The item sprites are displayed in a grid layout with a semi-transparent background and rounded corners. Hovering over an item sprite scales it slightly and changes the cursor to indicate interactivity.

### JavaScript Functionality
The JavaScript code adds interactivity and dynamic functionality to the Items page. It fetches item data from the PokéAPI, including the item's name, category, effect, and attributes. It dynamically creates sprite elements for each item and appends them to the main container. When an item sprite is clicked, a dynamic page is created with detailed information about the item. The search bar allows users to filter item sprites based on their name or category, providing a convenient way to find specific items.

The JavaScript code also includes functionality for toggling the search bar and handling the back button. Clicking the magnifying glass icon toggles the search bar's visibility. Clicking the back button on the dynamic page returns the user to the main Items page.

>## Moves Page
The Moves page of PokéPedia displays a grid of different Pokémon moves. Each move is represented by a sprite and provides information about its name, type, damage class, accuracy, power, and PP. Users can click on a move to view detailed information about it, including the move's effect and attributes. The detailed page also lists the Pokémon that can learn the move.

## HTML Code
The HTML code defines the structure of the Moves page. It includes a header with the PokéPedia logo, a navigation bar with links to the Home, Pokémon, Locations, and Items pages, and a search bar for filtering moves. The main content of the page is a container that holds the grid of move sprites.

## CSS Styling
The CSS styling enhances the visual presentation of the Moves page. It sets the overall layout, color scheme, and typography. The header is fixed at the top of the page and has a dark background color. The navigation bar provides easy navigation between different pages with consistent styling for the links. The search bar is positioned next to the navigation bar and has a magnifying glass icon. The move sprites are displayed in a grid layout with a semi-transparent background and rounded corners. Hovering over a move sprite scales it slightly and changes the cursor to indicate interactivity.

## JavaScript Functionality
The JavaScript code adds interactivity and dynamic functionality to the Moves page. It fetches move data from the PokéAPI, including the move's name, type, damage class, accuracy, power, PP, effect, short effect, and the Pokémon that can learn the move. It dynamically creates sprite elements for each move and appends them to the main container. When a move sprite is clicked, a dynamic page is created with detailed information about the move. The search bar allows users to filter move sprites based on their name or type, providing a convenient way to find specific moves.

The JavaScript code also includes functionality for toggling the search bar and handling the back button. Clicking the magnifying glass icon toggles the search bar's visibility. Clicking the back button on the dynamic page returns the user to the main Moves page.