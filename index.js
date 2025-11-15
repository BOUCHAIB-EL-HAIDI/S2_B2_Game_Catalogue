
//decleration 

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const searchInput = document.querySelector('input[type="text"]');
const searchIcon = document.querySelector('.fa-magnifying-glass');

let image = document.querySelector('#card-first-part img');

const gameofthemonthName = document.querySelector("#card-second-part h1");

const gameofthemonthRating = document.querySelector("#card-second-part h2");

const releasedate = document.querySelector("#release_container span:nth-of-type(1)");

const genre = document.querySelector("#release_container span:nth-of-type(2)");

const firstIcon = document.querySelector('#platforms i:nth-of-type(1)');
const secondIcon = document.querySelector('#platforms i:nth-of-type(2)');
const thirdIcon =document.querySelector('#platforms i:nth-of-type(3)');

const gameFilter = document.getElementById("game-filter");
const genreFilter = document.getElementById("genre-filter");


const searchResultsSection = document.getElementById("search-results-section");
const searchResultsContainer = document.getElementById("search-results");
const noResultsMessage = document.getElementById("no-results-message");

// creating the navbar//



menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("hidden");

    // Focus the input if it's now visible
  if (!searchInput.classList.contains("hidden")) {
    searchInput.focus();
  }
});




// fetching data for game of the month //


let games = [];
const fetchdataGM = async()=> {

try {
  
const response  =  await fetch('https://debuggers-games-api.duckdns.org/api/games');

const data = await response.json();
 games = data.results;

  console.log(games[0].genres)


// finding the game of the month based on rating 

   const gameOfTheMonth = games.reduce((best, game) => {
      return game.rating > best.rating ? game : best;
    }, games[0]);

//appending game of the month image to html
let background_image = gameOfTheMonth.background_image ;

image.src = background_image ;
image.alt = gameOfTheMonth.name ;

const platforms = gameOfTheMonth.platforms.map(p => p.platform.name);

//adding the platforms icons 

const platform  = document.getElementById("platforms")
platforms.forEach(p => {


if (p === "PC"){
firstIcon.classList.add("fa-brands" ,"fa-windows");

}else if(p==="PlayStation 3" || p==="PlayStation 4"  || p==="PlayStation 5" ){

secondIcon.classList.add("fa-brands" ,"fa-playstation");

}else if (p==="Xbox 360" || p==="Xbox One" || p==="Xbox Series S/X"){

  thirdIcon.classList.add("fa-brands", "fa-xbox");
}



});

// adding the name   

gameofthemonthName.innerText = gameOfTheMonth.name ;

gameofthemonthRating.innerText = "⭐\u00A0" + gameOfTheMonth.rating ;


//adding release date and genres 

releasedate.innerText = gameOfTheMonth.released ;

const gameOfTheMonthGenre =  gameOfTheMonth.genres.map(g => g.name);


const genreText = gameOfTheMonthGenre.join(", ");

genre.innerText = genreText ;

}
 catch (error) {
       
        console.error('Failed to fetch games:', error);
    }

};
fetchdataGM();



// adding the all games 
let sortOption = ""; 
const cards = document.querySelector('.cards');
let next =1;
const nextbtn = document.querySelector('#next')

nextbtn.addEventListener('click', ()=> {
next++;
cards.innerHTML = "";
 fetchDataAll();
console.log(next);
})

const previousbtn = document.querySelector('#previous');

previousbtn.addEventListener('click', ()=> {

  
 if(next>1) {
 next--;
 cards.innerHTML = "";
 fetchDataAll();
 } 
 console.log(next);
})




let sort ;

const fetchDataAll = async () => {
  try {
    
   
    const response = await fetch(`https://debuggers-games-api.duckdns.org/api/games?page=${next}`);
    if (!response.ok) throw new Error('Network response was not ok');
     games = "";
     data = await response.json();
     games = data.results;

    // Apply sorting if needed
    if(sortOption === "name-asc") games.sort((a,b) => a.name.localeCompare(b.name));
    if(sortOption === "name-desc") games.sort((a,b) => b.name.localeCompare(a.name));

       // Filter by genre if sortOption is a genre
   if(sortOption === "action" || sortOption === "rpg" || sortOption === "adventure") {
  games = games.filter(game =>
    game.genres.some(g => g.name.toLowerCase() === sortOption)
  );
}

    // Clear and display cards
    cards.innerHTML = "";
    games.forEach(game => {

      let allplatform = game.platforms.map(p => p.platform.name);

      let genre = game.genres.map(p => p.name);

      let genrejoin = genre.join(", ");

  
      
      let xbox ="";
      let playstation = "";
      let pc = "";


      allplatform.forEach(p=> {

    if (p === "PC"){
       pc = "fa-brands fa-windows";

     }else if(p==="PlayStation 3" || p==="PlayStation 4"  || p==="PlayStation 5" ){

     playstation = "fa-brands fa-playstation"

     }else if (p==="Xbox 360" || p==="Xbox One" || p==="Xbox Series S/X"){

    xbox = "fa-brands fa-xbox";
      }


      })

      
    cards.insertAdjacentHTML('beforeend', 
      
      `
    
    <div   class="card h-[550px] w-[425px] bg-secondary flex flex-col rounded-md ">
     <div  id="card-first-part" class="h-1/2 w-full rounded-md">


    <img src=" ${game.background_image} " alt=" ${game.name}  " class="w-full h-full object-cover rounded-md">


       
     </div>

     <div id="card-second-part" class="h-1/2 w-full p-2 pt-4 flex flex-col gap-6">

      <div class="flex justify-between" id="platforms">
        
       <div>
        <i class="${pc} mr-2 text-2xl"></i>
        <i class="${playstation} mr-2 text-2xl"></i>
        <i class="${xbox} mr-2 text-2xl"></i>
        </div>
         <button class="bg-third w-fit text-center left-40 top-32 rounded-lg font-semibold">Quick look</button>
      </div>
       <h1 class="text-4xl">${game.name}</h1>
       <h2 class="text-2xl">${"⭐\u00A0" + game.rating} </h2>
     
      <div id="release_container">
       Release Date : <span class="mr-6 text-gray-400">${game.released}</span>

       Genre : <span class=" text-gray-400">${genrejoin}</span>

      </div>

     </div>

    

     </div>
      
    
      
      ` );
    
    




    });
  } catch (error) {
    console.error('Failed to fetch games:', error);
  }
};

// the first fetching 
if (next === 1){
   fetchDataAll();
}


//adding the filters and reset filters button just the displaying 

gameFilter.addEventListener("change", () => {
  if(gameFilter.value === "name-asc" || gameFilter.value === "name-desc") {
    sortOption = gameFilter.value; // set the flag
  } else if(gameFilter.value === "reset") {
    sortOption = "";
    gameFilter.value = "";
    genreFilter.value = "";
    genreFilter.classList.add("hidden");
  } else if(gameFilter.value === "genre") {
    genreFilter.classList.remove("hidden");
  } else {
    genreFilter.classList.add("hidden");
  }

  


  fetchDataAll();
});




//sorting by genre event listener 

genreFilter.addEventListener("change", () => {
  sortOption = genreFilter.value; // "action", "rpg", or "adventure"
  fetchDataAll();
});






const fetchSearchResults = async (query) => {
    try {
        const response = await fetch(`https://debuggers-games-api.duckdns.org/api/games?search=${query}`);
        const data = await response.json();
        const results = data.results;

        // Clear main cards
        cards.innerHTML = "";

        // Display search results
        results.forEach(game => {
            const genre = game.genres.map(g => g.name).join(", ");
            const platforms = game.platforms.map(p => p.platform.name);
            const pc = platforms.includes("PC") ? "fa-brands fa-windows" : "";
            const playstation = platforms.some(p => p.includes("PlayStation")) ? "fa-brands fa-playstation" : "";
            const xbox = platforms.some(p => p.includes("Xbox")) ? "fa-brands fa-xbox" : "";

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
                        </div>
                        <h1 class="text-4xl">${game.name}</h1>
                        <h2 class="text-2xl">⭐ ${game.rating}</h2>
                        <div id="release_container">
                            Release Date: <span class="mr-6 text-gray-400">${game.released}</span>
                            Genre: <span class="text-gray-400">${genre}</span>
                        </div>
                    </div>
                </div>
            `);
        });

    } catch (error) {
        console.error('Search failed:', error);
    }
};

// adding event listener on search button
searchIcon.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) fetchSearchResults(query);
});











