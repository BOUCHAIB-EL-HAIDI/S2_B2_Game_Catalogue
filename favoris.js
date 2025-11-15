

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const cards = document.querySelector('.cards');


menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});



const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden"); 
  });
});

// Get favorites from localStorage

function getFavorites() {
  const favorites = localStorage.getItem('gameFavorites');
  return favorites ? JSON.parse(favorites) : [];
}


function saveFavorites(favorites) {
  localStorage.setItem('gameFavorites', JSON.stringify(favorites));
}

// Remove game from favorites
function removeFromFavorites(gameId) {
  let favorites = getFavorites();
  favorites = favorites.filter(fav => fav.id !== gameId);
  saveFavorites(favorites);
  displayFavorites(); 
}

// Display all favorite games
function displayFavorites() {
  const favorites = getFavorites();
  

  cards.innerHTML = "";
  
  if (favorites.length === 0) {
    cards.innerHTML = `
      <div class="col-span-full text-center py-20">
        <p class="text-gray-400 text-2xl">No games in favorites</p>
      </div>
    `;
    return;
  }
  
  // Display each favorite game
  favorites.forEach(game => {
    const allplatform = game.platforms.map(p => p.platform.name);
    const genre = game.genres.map(p => p.name);
    const genrejoin = genre.join(", ");
    
    let xbox = "";
    let playstation = "";
    let pc = "";
    
    allplatform.forEach(p => {
      if (p === "PC") {
        pc = "fa-brands fa-windows";
      } else if (p === "PlayStation 3" || p === "PlayStation 4" || p === "PlayStation 5") {
        playstation = "fa-brands fa-playstation";
      } else if (p === "Xbox 360" || p === "Xbox One" || p === "Xbox Series S/X") {
        xbox = "fa-brands fa-xbox";
      }
    });
    
    cards.insertAdjacentHTML('beforeend', `
      <div class="card h-[550px] w-[425px] bg-secondary flex flex-col rounded-md">
        <div id="card-first-part" class="h-1/2 w-full rounded-md">
          <img src="${game.background_image}" alt="${game.name}" class="w-full h-full object-cover rounded-md">
        </div>
        
        <div id="card-second-part" class="h-1/2 w-full p-2 pt-4 flex flex-col gap-6">
          <div class="flex justify-between" id="platforms">
            <div>
              <i class="${pc} mr-2 text-2xl"></i>
              <i class="${playstation} mr-2 text-2xl"></i>
              <i class="${xbox} mr-2 text-2xl"></i>
            </div>
            <button class="remove-favorite bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300" data-id="${game.id}">
              Remove
            </button>
          </div>
          <h1 class="text-4xl">${game.name}</h1>
          <h2 class="text-2xl">⭐ ${game.rating}</h2>
          
          <div id="release_container">
            Release Date: <span class="mr-6 text-gray-400">${game.released}</span>
            Genre: <span class="text-gray-400">${genrejoin}</span>
          </div>
        </div>
      </div>
    `);
  });
  
  // Add event listeners to all remove buttons
  document.querySelectorAll('.remove-favorite').forEach(button => {
    button.addEventListener('click', (e) => {
      const gameId = parseInt(e.target.getAttribute('data-id'));
      
      setTimeout(() => {
        removeFromFavorites(gameId);
      }, 300);
    });
  });
}

displayFavorites();