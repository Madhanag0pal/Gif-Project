req = new XMLHttpRequest();

//Sample Api call
//req.open('GET','https://api.giphy.com/v1/gifs/search?api_key=ACZCYLfVTM5nFKRBsNQ1xPqVFHskmvGv&q=Dogs&limit=5');

baseurl = 'https://api.giphy.com/v1/gifs/search?'

apiKey = 'api_key=ACZCYLfVTM5nFKRBsNQ1xPqVFHskmvGv'

limit = 0

search = "trending"

function loadGif(){
	api = baseurl+ apiKey +'&q='+search+'&rating=pg&limit=8&offset='+String(limit);

	req.open('GET',api);

	req.onload = function(){
		res = JSON.parse(req.responseText)
		data = res["data"];
		// console.log(res)
		if(data.length > 0){
			// console.log(data);
			for(i = 0; i < data.length; i++){
				url = data[i].images.downsized_medium.url;
				height = data[i].images.downsized_medium.height;
				width = data[i].images.downsized_medium.width;
				// console.log(height,width);
				var el = document.createElement("IMG");
				el.setAttribute("src",url)
				el.setAttribute('height',300)
				el.setAttribute('width',310)

				document.body.appendChild(el)

			}
		}

		else{
			alert("Oops nothing is found!")
		}

	}
	req.send();
	limit += 8;
}

function serchGif(){
	qry = document.getElementById("inp").value;
	console.log(qry);
	console.log(limit.to_int);
	api = baseurl + apiKey +'&q='+qry+'&rating=pg&limit='+String(limit)//+"&offset="+String(limit)

	// console.log(api)
	req.open('GET',api);
	req.onload = function(){
		res = JSON.parse(req.responseText)
		data = res["data"];
		console.log(res)
		if(data.length > 0){
			console.log(data);
			for(i = 0; i < data.length; i++){
				url = data[i].images.downsized_medium.url;
				height = data[i].images.downsized_medium.height;
				width = data[i].images.downsized_medium.width;
				console.log(i);
				var el = document.getElementsByTagName("IMG")[i];

				el.setAttribute("src",url)

			}
			search = qry
		}
		else{
			alert("Oops nothing is found!")
		}
	}
	req.send();
}

window.onscroll = function(ev) {
	tHeight = document.body.offsetHeight;
	rHeight = Math.floor(window.innerHeight + window.scrollY)
    if (rHeight > tHeight) {
        // you reached bottom of the page
        loadGif();
    }
};