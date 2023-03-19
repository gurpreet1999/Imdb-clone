//getiing movie id from params
let id = window.location.search.substr(1);

//geting conatiner where detail page will render
let selectedmoviedetail = document.querySelector(".selectedmoviedetail");

//function to fetch detail of that particular movie from imdb api
const getmoviedetail = (id) => {
  console.log(id);
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderMovieDetail(data);
    });
};

getmoviedetail(id);

//function to render whole movie detail inside the container

function renderMovieDetail(movie) {
  let list = `<div class="movie">
    <div class="movie__intro">
        <img class="movie__backdrop" src="https://image.tmdb.org/t/p/original${
          movie ? movie.backdrop_path : ""
        } "/>
    </div>
    <div class="movie__detail">
        <div class="movie__detailLeft">
            <div class="movie__posterBox">
                <img class="movie__poster" src="https://image.tmdb.org/t/p/original${
                  movie ? movie.poster_path : ""
                }" />
            </div>
        </div>
        <div class="movie__detailRight">
            <div class="movie__detailRightTop">
                <div class="movie__name">${
                  movie ? movie.original_title : ""
                }</div>
                <div class="movie__tagline">${movie ? movie.tagline : ""}</div>
                <div class="movie__rating">
                    ${
                      movie ? movie.vote_average : ""
                    } <i class="fas fa-star"></i>
                    <span class="movie__voteCount">${
                      movie ? "(" + movie.vote_count + ") votes" : ""
                    }</span>
                </div>  
                <div class="movie__runtime">${
                  movie ? movie.runtime + " mins" : ""
                }</div>
                <div class="movie__releaseDate">${
                  movie ? "Release date: " + movie.release_date : ""
                }</div>
                <div class="movie__genres">
                    ${
                      movie && movie.genres
                        ? movie.genres.map(
                            (genre) =>
                              ` <><span class="movie__genre" id=${genre.id}>${genre.name}</span></>`
                          )
                        : ""
                    }
                </div>
            </div>
            <div class="movie__detailRightBottom">
                <div class="synopsisText">Synopsis</div>
                <div class=movie_overview >${movie ? movie.overview : ""}</div>
            </div>
            
        </div>
    </div>    
    
    
    
    <div class="movie__links">
        <div class="movie__heading">Useful Links</div>
        ${
          movie &&
          movie.homepage &&
          `<a href=${movie.homepage} target="_blank" style={{textDecoration: "none"}}><p><span class="movie__homeButton movie__Button">Homepage <i class="newTab fas fa-external-link-alt"></i></span></p></a>`
        }
        ${
          movie &&
          movie.imdb_id &&
          `<a href=${
            "https://www.imdb.com/title/" + movie.imdb_id
          } target="_blank" style={{textDecoration: "none"}}><p><span class="movie__imdbButton movie__Button">IMDb<i class="newTab fas fa-external-link-alt"></i></span></p></a>`
        }
    </div>
    <div class="movie__heading">Production companies</div>
    <div class="movie__production">
        ${
          movie &&
          movie.production_companies &&
          movie.production_companies.map(
            (company) =>
              `<span class="productionCompanyImage">
                            <img class="movie__productionComapany" src="https://image.tmdb.org/t/p/original/${company.logo_path}" />
                            <span>${company.name}</span>
                        </span>`
          )
        }
    </div>
    </div>`;

  selectedmoviedetail.insertAdjacentHTML("beforeend", list);
}
