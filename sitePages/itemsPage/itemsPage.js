function itemSpritesCaller(numOfItems) {
  let currentIndex = 1;
  const batchSize = 50;

  const loadBatch = () => {
    const spritePromises = [];
    for (let i = currentIndex; i < currentIndex + batchSize && i <= numOfItems; i++) {
      spritePromises.push(itemSprites(i));
    }

    Promise.all(spritePromises)
      .then(spriteResponses => {
        spriteResponses.forEach(response => {
          addSpritesToBackground(response.imageURL, response.name, response.category, response.effect, response.attributes, response.flavor);
        });
      })
      .catch(error => {
        console.error(error);
      });

    currentIndex += batchSize;
    if (currentIndex > numOfItems) {
      clearInterval(intervalId);
    }
  };

  const intervalId = setInterval(loadBatch, 100);
}

function itemSprites(itemId) {
  return fetch(`https://pokeapi.co/api/v2/item/${itemId}/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Item not found for ID ${itemId}`);
      }
      return response.json();
    })
    .then(data => {
      const spriteName = data.name;
      const spriteImageURL = data.sprites.default;
      const spriteEffect = data.effect_entries[0]?.short_effect || 'No effect available';
      const spriteAttributes = data.attributes.map(attribute => attribute.name);
      const itemCategory = data.category.name;
      const flavorText = data.flavor_text_entries.find(entry => entry.language.name === 'en')?.text;

      return {
        name: spriteName,
        imageURL: spriteImageURL,
        effect: spriteEffect,
        attributes: spriteAttributes,
        category: itemCategory,
        flavor: flavorText,
      };
    })
    .catch(error => {
      console.error(error);
    });
}

function addSpritesToBackground(imageURL, name, category, effect, attributes, flavor) {
  let backgroundElement = document.querySelector('.pp__itemPageContainer');
  let spriteElement = document.createElement('div');

  let nameTextObj = document.createElement('p');
  const cleanName = name.replace(/-/g, ' ').toUpperCase()
  let nameText = document.createTextNode(`Name: ${cleanName}`);
  nameTextObj.appendChild(nameText);

  const categoryTextObj = document.createElement('p');
  const cleanCategory = category.replace(/-/g, ' ').toUpperCase()
  const categoryText = document.createTextNode(`Category: ${cleanCategory}`);
  categoryTextObj.appendChild(categoryText);

  let spriteImg = document.createElement('img');

  spriteElement.classList.add('sprite', `${name}`, `${category}`);

  spriteImg.src = imageURL;
  backgroundElement.appendChild(spriteElement);
  spriteElement.appendChild(spriteImg);
  spriteElement.appendChild(nameTextObj);
  spriteElement.appendChild(categoryTextObj);


  spriteElement.addEventListener('click', () => {
    createDynamicPage(cleanName, category, imageURL, effect, attributes, flavor);
  });
}

function createDynamicPage(name, category, imageUrl, effect, attributes, flavor) {
  let seachBar = document.querySelector('.pp__itemPageHeader-searchBar');
  seachBar.style.display = 'none';
  let popOuts = document.getElementById('searchInput');
  popOuts.style.display = 'none';

  const spritesDivs = document.querySelectorAll('.sprite');
  const containerElement = document.querySelector('body');

  const detailContainer = document.createElement('div');
  detailContainer.classList.add('details');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('details');
  headerContainer.classList.add('details-header');

  const nameObj = document.createElement('h1');
  const nameText = document.createTextNode(name.toUpperCase());
  nameObj.appendChild(nameText);

  const spriteImg = document.createElement('img');
  spriteImg.src = imageUrl;

  const categoryTextObj = document.createElement('p');
  const categoryText = document.createTextNode(`Category: ${category}`);
  categoryTextObj.appendChild(categoryText);

  const flavorTextObj = document.createElement('p');
  const flavorText = document.createTextNode(`${flavor}`);
  flavorTextObj.appendChild(flavorText);

  const effectTextObj = document.createElement('p');
  const effectText = document.createTextNode(`Effect: ${effect}`);
  effectTextObj.appendChild(effectText);


  const attributesContainer = document.createElement('div');
  attributesContainer.classList.add('attributes');
  const attributesHeader = document.createElement('h3');
  const attributesHeaderText = document.createTextNode('Attributes:');
  attributesHeader.appendChild(attributesHeaderText);
  attributesContainer.appendChild(attributesHeader);
  attributes.forEach(attribute => {
    const attributeTextObj = document.createElement('p');
    const attributeText = document.createTextNode(attribute);
    attributeTextObj.appendChild(attributeText);
    attributesContainer.appendChild(attributeTextObj);
  });


  const backButton = document.createElement('input');
  backButton.type = 'button';
  backButton.classList.add('backButton');
  backButton.value = 'Back';
  backButton.onclick = backToSearch;


  spritesDivs.forEach(sprite => {
    sprite.remove();
  });

  const oldContainer = document.querySelector('.pp__itemPageContainer');
  if (oldContainer) {
    oldContainer.remove();
  }

  scroll(0,0)

  headerContainer.appendChild(nameObj);
  detailContainer.appendChild(spriteImg);
  detailContainer.appendChild(categoryTextObj);
  detailContainer.appendChild(flavorTextObj);
  detailContainer.appendChild(effectTextObj);
  detailContainer.appendChild(attributesContainer);
  detailContainer.appendChild(backButton);

  containerElement.appendChild(headerContainer);
  containerElement.appendChild(detailContainer);
}

itemSpritesCaller(1006);

function backToSearch() {

  location.reload();
}

function popOut() {
  let popOuts = document.getElementById('searchInput');

  if (popOuts.style.display === 'block') {
    popOuts.style.display = 'none';
    popOuts.classList.remove('open');
  } else {
    popOuts.style.display = 'block';
    popOuts.classList.add('open');
  }
}

function searchBarFilter() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toUpperCase();
  const spriteElements = document.querySelectorAll('.sprite');

  spriteElements.forEach(sprite => {
    const id = sprite.classList[1];
    const name = sprite.classList[2];
    const type = sprite.classList[3];

    const searchData = [id, name, type].join(' ').toUpperCase();
    if (searchData.indexOf(filter) > -1) {
      sprite.style.display = '';
    } else {
      sprite.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fromMainPageSearch();
});

function fromMainPageSearch() {
  const urlQuery = new URLSearchParams(window.location.search);
  const fromSearch = urlQuery.get('search');
  if (fromSearch) {

    // Call the pokemonCaller function with the number of pokemon to fetch and add
    const pokemonId = Number(fromSearch);
    pokemon(pokemonId).then(response => {
      addSpritesToBackground(response.imageURL, response.id, response.name, response.type, response.flavor, response.baseStats, response.evolutionNames, response.firstEvolution, response.capture, response.gender, response.growth, response.legendary, response.mythical, response.exp, response.games);
      createDynamicPage(response.imageURL, response.id, response.name, response.type, response.flavor, response.baseStats, response.evolutionNames, response.firstEvolution, response.capture, response.gender, response.growth, response.legendary, response.mythical, response.exp, response.games);
    });

  } else {

    // Call the pokemonCaller function with the number of pokemon to fetch and add
    pokemonCaller(1009);

  }
}