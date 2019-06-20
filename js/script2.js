const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');
function apiSearch(event) {
	event.preventDefault();
	const searchText = document.querySelector('.form-control').value,
	server = 'https://api.themoviedb.org/3/search/multi?api_key=c7b8897ef2bca4c1978fbe81b04d8ff9&language=ru&query=---' + searchText;
	requestApi(server);
}
searchForm.addEventListener('submit', apiSearch);


function requestApi(url) {

	const request = new XMLHttpRequest();
	console.log(request);
	request.open('GET', url);
	request.send();
	request.addEventListener('readystatechange', function() {
		if(request.readyState !== 4) return;
		if(request.status !== 200) {
			console.log('eror: ' + request.status);
			return;
		}
		const output = JSON.parse(request.responseText)
		let inner = '';
		output.results.forEach(function (item) {
			let nameItem = item.name || item.title;
			let dateItem = item.first_air_date || item.release_date;
			inner += '<div class = "col-12">' + nameItem + dateItem +'</div>';
		});
		movie.innerHTML = inner;
	});
}