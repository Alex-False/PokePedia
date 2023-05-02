// Function to fetch and add background sprites
function backGroundSprites(pokeNum) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}/`)
      .then(response => response.json())
      .then(data => {
          let spriteImageURL = data.sprites.front_default;
          addSpritesToBackground(spriteImageURL);
      })
      .catch(error => console.error(error));
}

// Function to add sprites to the background
function addSpritesToBackground(imageURL) {
  let backgroundElement = document.querySelector('.pp__landingBackground');
  let spriteElement = document.createElement('div');

  spriteElement.classList.add('sprite');
  spriteElement.style.backgroundImage = `url(${imageURL})`;
  backgroundElement.appendChild(spriteElement);
}

// Async function to call backgroundSprites for multiple sprites
async function backgroundSpritesCaller(numOfSprites) {
  for (let i = 1; i < numOfSprites; i++) {
      await backGroundSprites([i]);
  }
}

let currentX = 0;
let spritePositions = new Map();

// Function to move the sprites horizontally
function moveSprites() {
  let sprites = document.querySelectorAll('.sprite');
  sprites.forEach(sprite => {
      let screenWidth = window.innerWidth * 1.15;
      let spriteWidth = sprite.getBoundingClientRect().width * 9;

      let currentX = spritePositions.get(sprite) || 0;

      if (currentX >= screenWidth) {
          // Move sprite to the left side of the screen
          sprite.style.transform = `translate(-${spriteWidth}px, 0px) scaleX(-1)`;
          spritePositions.set(sprite, -spriteWidth);
      } else {
          let newX = currentX + 2;
          sprite.style.transform = `translate(${newX}px, 0px) scaleX(-1)`;
          spritePositions.set(sprite, newX);
      }
  });
}

// Call backgroundSpritesCaller with the number of sprites to fetch and add
backgroundSpritesCaller(10);

// Move sprites every 15 milliseconds
setInterval(moveSprites, 15);