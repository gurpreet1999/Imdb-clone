//getting conatiner where favourite movie card will render
let ListofFavouriteMovie = document.querySelector(".ListofFavouriteMovie");

//getting favourite movie list from localstorage
let wholeFavouriteList = JSON.parse(localStorage.getItem("favMovie"));

//rendering all card inside conatiner
wholeFavouriteList.forEach((movie) => {
  let card = `<div class="cards">
<img onclick="redirect(${
    movie.id
  })"    class="cards__img" src=https://image.tmdb.org/t/p/original${
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
</div>`;

  ListofFavouriteMovie.insertAdjacentHTML("beforeend", card);
});

//function to take u to the moviedetail page
function redirect(id) {
    window.location = `movieDetail.html?${id}`;
  }
  