

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



});

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

}
 catch (error) {
       
        console.error('Failed to fetch games:', error);
    }

};
fetchdataGM();



// adding the all games 
  
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






  
const fetchDataAll = async () => {
  try {
    
   
    const response = await fetch(`https://debuggers-games-api.duckdns.org/api/games?page=${next}`);
    if (!response.ok) throw new Error('Network response was not ok');
      games = "";
     data = await response.json();
     games = data.results;

  //   console.log(games)
    // games.sort((a,b) => a.name.localeCompare(b.name))
   
  // games.forEach(g => {

  // console.log(g.name)

  // })




    

   
// let arr =[];

//    games.forEach((g,index)  => {

//   const recomanded = g.ratings.find(g => g.title === "recommended");

//   console.log(recomanded.count)

//    console.log(g.name)
  
//    arr.push({name : g.name , count : recomanded.count} );

//    })

//    console.log(arr)
  

    


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


if (next === 1){
   fetchDataAll();
}









