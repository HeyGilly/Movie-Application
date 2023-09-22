
// Function to show the loader
function showLoader() {
    document.querySelector('.loader').style.display = 'block';
    document.querySelector('#allMovieHeader').style.display = 'none';
}

// Function to hide the loader
function hideLoader() {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('#allMovieHeader').style.display = 'block';

}




async function getMovies() {
    showLoader(); // Show the loader before making the API call
    let url = 'http://localhost:3000/movies';
    try {
        let res = await fetch(url);
        let movies = await res.json();
        hideLoader(); // Hide the loader once data is loaded
        return movies;
    } catch (error) {
        hideLoader(); // Hide the loader in case of an error
        console.log(error);
    }
}



async function renderUsers() {
    let movies = await getMovies();
    movies.reverse("id")
    let html = '';
    movies.forEach(movie => {
    let htmlSegment = `
           <div class="card movies col-6 col-md-4 col-lg-2 position-relative" >
                <button class="btn btn-link position-absolute top-0 end-0 delete-btn">
                    <img src="../img/delete.png"  class="" height="40" />
                </button>
                <img src="${movie.Poster}" class="card-img-top" alt="Card Image" height="240" width="">
                <div class="card-body">
                    <h5 class="card-title">${movie.Title}</h5>
                    <p class="card-text">${movie.Plot}</p>
                </div>
            </div>`



        html += htmlSegment;
    });

    let container = document.querySelector('.allMovieList');
    container.innerHTML = html;
}




const createMovie = async (movie) => {
    try {
        const url = 'http://localhost:3000/movies';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        };
        const response = await fetch(url, options);
        const newMovie = await response.json();
        return newMovie;
    } catch (error) {
        console.error(error);
    }
}


renderUsers();

const saveMovieButton = document.getElementById("saveMovieDetails");

saveMovieButton.addEventListener("click", async (e) => {
    console.log("submitted");

    let movieTitle = document.getElementById("movieTitleInput").value;
    let movieDirector = document.getElementById("movieDirectorInput").value;
    let movieActors = document.getElementById("movieActorInput").value;
    let movieYearReleased = document.getElementById("movieYearInput").value;
    let movieRating = document.getElementById("movieRatingInput").value;
    let movieGenre = document.getElementById("movieGenreInput").value;
    let movieRuntime = document.getElementById("movieRuntimeInput").value;
    let moviePlot = document.getElementById("moviePlotInput").value;
    let moviePoster = document.getElementById("moviePostInput").value;

    try {
        // Use await here to make sure createMovie completes before continuing
        const newMovie = await createMovie({
            Title: movieTitle,
            Year: movieYearReleased,
            Rated: movieRating,
            Runtime: movieRuntime,
            Genre: movieGenre,
            Director: movieDirector,
            Actors: movieActors,
            Plot: moviePlot,
            Poster: moviePoster,
        });

        console.log(newMovie);

        // After successfully creating a new movie, refresh the movie list
        await renderUsers();
    } catch (error) {
        console.error(error);
    }
});

let deleteBTN = document.querySelector(".delete-btn")
deleteBTN.addEventListener("click", ()=>{
    console.log("delete");
})