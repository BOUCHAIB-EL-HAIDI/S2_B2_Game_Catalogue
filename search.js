// Search Results Page

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const cards = document.querySelector('.cards');
const searchQueryText = document.getElementById('search-query-text');
const searchInput = document.getElementById('search-input');
const searchIcon = document.querySelector('.fa-magnifying-glass');

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Mobile search icon
searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("hidden");
  if (!searchInput.classList.contains("hidden")) {
    searchInput.focus();
  }
});

// Close mobile menu when clicking links
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden"); 
  });
});

function toggleFavorite(game, heartIcon) {
  if (isFavorite(game.id)) {
    removeFromFavorites(game.id);
    heartIcon.classList.remove('text-red-500', 'scale-110');
  } else {
    addToFavorites(game);
    heartIcon.classList.add('text-red-500', 'scale-110');
    heartIcon.style.transition = 'all 0.3s ease';
  }
}
// Get search query from URL
function getSearchQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('query');
}

// Fetch and display search results
async function fetchSearchResults() {
  const query = getSearchQuery();
  
  if (!query) {
    cards.innerHTML = '<div class="col-span-full text-center py-20"><p class="text-gray-400 text-2xl">No search query provided</p></div>';
    return;
  }
  
  try {
    const response = await fetch(`https://debuggers-games-api.duckdns.org/api/games?search=${query}`);
    const data = await response.json();
    const results = data.results;
    
    if (results.length === 0) {
      cards.innerHTML = '<div class="col-span-full text-center py-20"><p class="text-gray-400 text-2xl">Nothing found for this search</p></div>';
      return;
    }
    
    // Display results
    cards.innerHTML = "";
    results.forEach(game => {
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
              <i class="fa-solid fa-heart text-4xl cursor-pointer heart transition-all duration-300" data-id="${game.id}"></i>
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
    
    
  } catch (error) {
    console.error('Search failed:', error);
    cards.innerHTML = '<div class="col-span-full text-center py-20"><p class="text-gray-400 text-2xl">Error loading search results</p></div>';
  }
}

// Search from navbar
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  }
});

fetchSearchResults();