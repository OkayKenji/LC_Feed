const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

function showTime() {
	var date = new Date();
	var h = date.getHours(); // 0 - 23
	var m = date.getMinutes(); // 0 - 59
	var s = date.getSeconds(); // 0 - 59
	var session = "AM";

	if (h == 0) {
		h = 12;
	}

	if (h > 12) {
		h = h - 12;
		session = "PM";
	}

	h = (h < 10) ? "0" + h : h;
	m = (m < 10) ? "0" + m : m;
	s = (s < 10) ? "0" + s : s;

	var time = h + ":" + m + ":" + s + " " + session;

	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var weekday = date.getDay();

	switch (weekday) {
		case 0:
			weekday = "Sunday";
			break;
		case 1:
			weekday = "Monday";
			break;
		case 2:
			weekday = "Tuesday";
			break;
		case 3:
			weekday = "Wednesday";
			break;
		case 4:
			weekday = "Thursday";
			break;
		case 5:
			weekday = "Friday";
			break;
		default:
			weekday = "Saturday";
	}

	document.getElementById("date").innerHTML = weekday + ", " + monthNames[month - 1] + " " + day + ", " + year;

	document.getElementById("clock").innerText = time;
	document.getElementById("clock").textContent = time;

	setTimeout(showTime, 1000);

}
showTime();



function loadvideo() {
	let video = document.querySelector("video");
	video.volume = 0;
	document.querySelector("video").play();

	let vids = ["snowfall.mp4", "fall.mp4", "fireplace.mp4", "snow1.mp4", "water.mp4", "waterfall.mp4"];
	vid = `video/${vids[Math.floor(Math.random() * vids.length)]}`;
	video.setAttribute("src", vid)
	video.load();
}

addEventListener("keydown", event => {
	if (event.keyCode == 70) {
		const div = document.querySelector("video");
		if (div.requestFullscreen)
			div.requestFullscreen();
		else if (div.webkitRequestFullscreen)
			div.webkitRequestFullscreen();
		else if (div.msRequestFullScreen)
			div.msRequestFullScreen();
	}
});

$(document).ready(function () {
	loadvideo();



	pullRSS();




	/*
	//pull rss feed
	var feed = "http://rss.nytimes.com/services/xml/rss/nyt/US.xml";
	//PBS news link: https://www.pbs.org/newshour/feeds/rss/headlines
	// NY Times link: http://rss.nytimes.com/services/xml/rss/nyt/US.xml
	var headlines_arr=[];
	$.ajax(feed, {
		accepts:{
			xml:"application/rss+xml"
		},
		dataType:"xml",
		success:function(data) {
			//Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript

			$(data).find("item").each(function () { // or "item" or whatever suits your feed
				var el = $(this);
				console.log("------------------------");
				console.log("title      : " + el.find("title").text());
				//console.log("link       : " + el.find("link").text());
				//console.log("description: " + el.find("description").text());
				headlines_arr.push(el.find("title").text());
				
				
				
			});
	var width = $('.ticker-text').width();
	var containerwidth = $('.ticker-container').width();
	var left = containerwidth;
	var count=0;
	function tick() {
		
		
		//console.log("printing: " + headlines_arr[count]);
		document.getElementById("headline").innerHTML=(headlines_arr[count]);
		if(--left < -width-500){
			console.log("at end")
			count=count+1;
		if(count>headlines_arr.length-1){
		count=0;
		}
		console.log(headlines_arr[count]);
		document.getElementById("headline").innerHTML=(headlines_arr[count]);
			left = containerwidth;
		}
		$(".ticker-text").css("margin-left", left + "px");
		
		setTimeout(tick, 7);
		
	  }
	  tick();
	 
	

		}	
	});
	
	
	
	*/



});

function pullRSS() {

	//pull rss feed
	var feed = "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";
	// NY Times link: http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml
	var headlines_arr = [];
	$.ajax(feed, {
		accepts: {
			xml: "application/rss+xml"
		},
		dataType: "xml",
		success: function (data) {
			//Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript

			$(data).find("item").each(function () { // or "item" or whatever suits your feed
				var el = $(this);
				console.log("------------------------");
				console.log("title      : " + el.find("title").text());
				//console.log("link       : " + el.find("link").text());
				//console.log("description: " + el.find("description").text());
				headlines_arr.push(el.find("title").text());



			});
			var width = $('.ticker-text').width();
			var containerwidth = $('.ticker-container').width();
			var left = containerwidth;
			var count = 0;
			function tick() {


				//console.log("printing: " + headlines_arr[count]);
				document.getElementById("headline").innerHTML = (headlines_arr[count]);
				if (--left < -width - 500) {
					console.log("at end")
					count = count + 1;
					if (count > headlines_arr.length - 1) {
						count = 0;
					}
					console.log(headlines_arr[count]);
					document.getElementById("headline").innerHTML = (headlines_arr[count]);
					left = containerwidth;
				}
				$(".ticker-text").css("margin-left", left + "px");

				setTimeout(tick, 7);

			}
			tick();



		}
	});



	setInterval(pullRSS, 1000 * 60 * 60);
}




