//container where movie list card will render
const secondSection = document.querySelector(".second");

//carausel conatiner getting
const slideshowContainer = document.querySelector(
  ".first .slideshow-container"
);

//search box
const searchBox = document.querySelector(".user input");

let favouriteMovieList = [];

let index = 1;

let popularArray;
let carauselMovielist;
let searchResult;
let selectedMovie;

//making api call to get all popular movie list
const getPopular = () => {
  const data = fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => {
      popularArray = data.results;
      renderCard();
    });
};

getPopular();


//function to get movie for carausel
const movieForCarausel = () => {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      carauselMovielist = data.results;
      carauselRender();
    });
};

movieForCarausel()


//making api call to get all search movie
const searchMovie = async (value) => {
  const data = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${value}&page=1&include_adult=false`
  );
  const response = await data.json();

  let searchList = response.results;
  secondSection.innerHTML = "";

  //rendering all search movie list
  searchList.forEach((movie) => {
    let card = `<a href="movielist.html"><div class="cards">
    <img class="cards__img" src=https://image.tmdb.org/t/p/original${
      movie ? movie.poster_path : ""
    }
    />
    <div class="cards__overlay">
        <div class="card__title">${movie ? movie.original_title : ""}</div>
        <div class="card__runtime">
           ${movie ? movie.release_date : ""}
            <span class="card__rating">${
              movie ? movie.vote_average : ""
            }<i class="fas fa-star"></i></span>
        </div>
        <div class="card__description">${
          movie ? movie.overview.slice(0, 118) + "..." : ""
        }</div>
    </div>
    </div></a>`;

    secondSection.insertAdjacentHTML("beforeend", card);
  });
};


//function to render card inside the section
function renderCard() {
  let favouriteSavedInlocalstorage = JSON.parse(
    localStorage.getItem("favMovie")
  );
  console.log(favouriteSavedInlocalstorage);

  popularArray.forEach((movie) => {
    let selected = "";

    favouriteSavedInlocalstorage &&
      favouriteSavedInlocalstorage.forEach((favmovie) => {
        if (favmovie.id === movie.id) {
          return (selected = "added");
        }
        console.log("first iteration");
      });

    let card = `<div  class="cards">
     <img  onclick="redirect(${
       movie.id
     })"   class="cards__img" src=https://image.tmdb.org/t/p/original${
      movie ? movie.poster_path : ""
    }
        />

       
        <div class="cards__overlay">
        
        <div class="heart" onclick="addtofavourite('${encodeURIComponent(
          JSON.stringify(movie)
        )}')"  ><i  id=${movie.id} class='fa fa-heart ${selected}'></i></div>
        <div class="tooltip">add to favourite</div>
            <div class="card__title">${movie ? movie.original_title : ""}</div>
            <div class="card__runtime">
               ${movie ? movie.release_date : ""}
                <span class="card__rating">${
                  movie ? movie.vote_average : ""
                }<i class="fas fa-star"></i></span>
            </div>
            <div class="card__description">${
              movie ? movie.overview.slice(0, 118) + "..." : ""
            }</div>
        </div>
        </div></a>`;

    secondSection.insertAdjacentHTML("beforeend", card);
  });
}


//function to render carausel images
function carauselRender() {
  carauselMovielist.forEach((movie) => {
    let slider = `
    <div class="mySlides">
   <img src="https://image.tmdb.org/t/p/original${
     movie && movie.backdrop_path
   }"/>
      <div class="posterImage__overlay">
          <div class="posterImage__title">${
            movie ? movie.original_title : ""
          }</div>
          <div class="posterImage__runtime">
          ${movie ? movie.release_date : ""}
              <span class="posterImage__rating">
              ${movie ? movie.vote_average : ""}
                  <i class="fas fa-star"></i> 
              </span>
          </div>
      <div class="posterImage__description">${
        movie ? movie.overview : ""
      } </div>
      </div>
    </div>`;

    slideshowContainer.insertAdjacentHTML("beforeend", slider);
  });
  beginingslide();
}

//function to handle carausel sliding
function beginingslide() {
  const carauselDiv = document.querySelectorAll(".mySlides");
  const alldots = document.querySelectorAll(".alldots .dot");
  console.log(alldots);

  console.log(carauselDiv);

  carauselMaking();

  function carauselMaking() {
    carauselDiv.forEach((div, i) => {
      div.style.left = `${i * 100}%`;
    });

    carauselDiv[0].classList.add("fade");
    alldots[0].classList.add("active");
  }

  function slideShow() {
    if (index === carauselDiv.length) {
      carauselDiv[index - 1].classList.remove("fade");
      alldots[index - 1].classList.remove("active");
      index = 1;
      carauselMaking();
      return;
    }

    alldots[index - 1].classList.remove("active");
    carauselDiv[index - 1].classList.remove("fade");

    alldots[index].classList.add("active");
    carauselDiv[index].classList.add("fade");
    carauselDiv[index].style.left = `${0}%`;

    index++;
  }

  setInterval(() => {
    slideShow();
  }, 4000);
}


//adding event listener on search box
searchBox.addEventListener("keyup", (e) => {
  let value = e.target.value;

  if (!value) {
    secondSection.innerHTML = "";
    renderCard();
    return;
  }

  searchMovie(value);
});


//function to add movie to favourite list 
function addtofavourite(obj) {
  let data = JSON.parse(decodeURIComponent(obj));

  let heartSymbol = document.getElementById(data.id);


  let favouriteMovieArray = JSON.parse(localStorage.getItem("favMovie"));
  console.log(favouriteMovieArray);

  if (favouriteMovieArray === null) {
    heartSymbol.classList.add("added");
    favouriteMovieList.push(data);
    localStorage.setItem("favMovie", JSON.stringify(favouriteMovieList));
  } else {
    const alreadypresent = favouriteMovieArray.findIndex((movie) => {
      return movie.id === data.id;
    });

    console.log("kya ye element present he" + alreadypresent);

    if (alreadypresent > -1) {
      heartSymbol.classList.remove("added");
      favouriteMovieArray.splice(alreadypresent, 1);
      console.log(favouriteMovieArray);

      localStorage.setItem("favMovie", JSON.stringify(favouriteMovieArray));
    } else {
      heartSymbol.classList.add("added");
      favouriteMovieArray.push(data);
      localStorage.setItem("favMovie", JSON.stringify(favouriteMovieArray));
    }
  }
}


//function to take u to the moviedetail page
function redirect(id) {
  window.location = `movieDetail.html?${id}`;
}
