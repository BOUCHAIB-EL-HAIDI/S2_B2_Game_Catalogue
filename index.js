

// creating the navbar//

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const searchInput = document.querySelector('input[type="text"]');
const searchIcon = document.querySelector('.fa-magnifying-glass');

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

// finding the game of the month based on rating 

   const gameOfTheMonth = games.reduce((best, game) => {
      return game.rating > best.rating ? game : best;
    }, games[0]);

//appending game of the month image to html
let image = document.querySelector('#card-first-part img');
let background_image = gameOfTheMonth.background_image ;

image.src = background_image ;
image.alt = gameOfTheMonth.name ;




const platforms = gameOfTheMonth.platforms.map(p => p.platform.name);

//adding the platforms icons 
const firstIcon = document.querySelector('#platforms i:nth-of-type(1)');
const secondIcon = document.querySelector('#platforms i:nth-of-type(2)');
const thirdIcon =document.querySelector('#platforms i:nth-of-type(3)');

const platform  = document.getElementById("platforms")
platforms.forEach(p => {


if (p === "PC"){
firstIcon.classList.add("fa-brands" ,"fa-windows");

}else if(p==="PlayStation 3" || p==="PlayStation 4"  || p==="PlayStation 5" ){

secondIcon.classList.add("fa-brands" ,"fa-playstation");

}else if (p==="Xbox 360" || p==="Xbox One" || p==="Xbox Series S/X"){

  thirdIcon.classList.add("fa-brands", "fa-xbox");
}



// adding the name   

const gameofthemonthName = document.querySelector("#card-second-part h1");

gameofthemonthName.innerText = gameOfTheMonth.name ;


const gameofthemonthRating = document.querySelector("#card-second-part h2");

gameofthemonthRating.innerText = "⭐\u00A0" + gameOfTheMonth.rating ;



//adding release date and genres 

const releasedate = document.querySelector("#release_container span:nth-of-type(1)");

releasedate.innerText = gameOfTheMonth.released ;


const genre = document.querySelector("#release_container span:nth-of-type(2)");

const gameOfTheMonthGenre =  gameOfTheMonth.genres.map(g => g.name);


const genreText = gameOfTheMonthGenre.join(", ");

genre.innerText = genreText ;




  
});









}
 catch (error) {
       
        console.error('Failed to fetch games:', error);
    }

};
fetchdataGM();