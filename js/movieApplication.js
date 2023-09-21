
async function getMovies() {
    let url = '  http://localhost:3000/movies';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}



async function renderUsers() {
    let movies = await getMovies();
    let html = '';
    movies.forEach(movie => {
        let htmlSegment = `<div class="col-lg-3 mb-3 d-flex align-items-stretch">
                                    <div class="card movies">
                                        <img src="${movie.Poster}" class="card-img-top" alt="Card Image" height="auto" width="">
                                        <div class="card-body d-flex flex-column">
                                            <h5 class="card-title">${movie.Title}</h5>
                                            <p class="card-text mb-4">${movie.Plot}</p>
                                        </div>
                                    </div>
                                </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();



