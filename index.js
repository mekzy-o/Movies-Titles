var https = require("https");

function fetchMovieData(substr) {
  pageNum = 1;
  let url =
    "https://jsonmock.hackerrank.com/api/movies/search/?Title=" +
    substr +
    "&page=" +
    pageNum;
  https.get(url, response => {
    response.setEncoding("utf8");
    response.on("data", function(body) {
      let dataRecord = JSON.parse(body);
      let movies = dataRecord.data;
      let totPages = dataRecord.total_pages;
      let titleArray = [];
      movies.map(a => {
        titleArray.push(a.Title);
      });
      for (let i = 2; i <= totPages; i++) {
        let newPage = i;
        let url1 =
          "https://jsonmock.hackerrank.com/api/movies/search/?Title=" +
          substr +
          "&page=" +
          newPage;
        https.get(url1, response => {
          response.setEncoding("utf8");
          response.on("data", function(body) {
            let newData = JSON.parse(body);
            let newMovies = newData.data;
            for (let i = 0; i < newMovies.length; i++) {
              titleArray.push(newMovies[i].Title);
            }
            console.log(titleArray.sort());
          });
        });
      }
    });
  });
}

//primary function
function getMovieTitles(substr) {
  fetchMovieData(substr);
}

getMovieTitles("spiderman");
