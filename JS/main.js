$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get(`http://www.omdbapi.com/?apikey=b3d753d0&s=`+searchText)
    .then((response) => {

        let movies = response.data.Search;
        let output = '';

        $.each(movies, (index, movie) => {
            output += `
                <div class="col-md-3>
                    <div class="well text-center>
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a> 
                    </div>
                </div>
            `;
        })

        $('#movies').html(output);
    })
    .catch((err) => {
        throw err;
    });
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get(`http://www.omdbapi.com/?apikey=b3d753d0&i=`+movieId)
    .then((response) => {
        console.log(response);

        let movie_info = response.data;

        let output = `
            <div class="row>
                <div class="col-md-4">
                    <img src="${movie_info.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h3>${movie_info.Title}</h3>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie_info.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie_info.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie_info.Rated}</li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie_info.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie_info.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie_info.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie_info.Acotrs}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie_info.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie_info.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default">Go Back to Search</a>
                </div>
            </div>
        `;

        $("#movie").html(output);
    })
    .catch((err) => {
        throw err;
    });
}