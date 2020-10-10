		let key = "e06cfdc0eba841558aa52433201109";
		document.querySelector("#search").onclick = function () {
			let city = document.getElementById("city").value;
			let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1`;
			showWeather(url);
		}
		$(document).on("keypress", "input", function (e) {
			if (e.which == 13) {
				let city = document.getElementById("city").value;
				let url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1`;
				showWeather(url);
			}
		});
		$(document).ready(function () {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		});

		function showPosition(position) {
			let lat = position.coords.latitude;
			let long = position.coords.longitude;
			let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${lat},${long}&days=1`;
			showWeather(url);
		}

		function showWeather(url) {
			fetch(url)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					let location, condition, temp_c, temp_f, image, humidity, wind_speed, pressure, last_updated, sunrise, sunset;
					if (data.error) {
						location = "Enter City";
						condition = "Unknown";
						temp_c = "0.0°C";
						image = "unknown.png";
						humidity = '0.0%';
						wind_speed = "0.0 kmph";
						pressure = "0.0 Hg";
						last_updated = "2020-01-01 12:00";
						console.log(3);
					} else {
						location = data.location.name;
						condition = data.current.condition.text;
						temp_c = data.current.temp_c + "°C";
						temp_f = data.current.temp_f + "°F";
						image = "https:" + data.current.condition.icon;
						humidity = data.current.humidity + '%';
						wind_speed = data.current.wind_kph + " kmph";
						pressure = data.current.pressure_in + " Hg";
						last_updated = data.current.last_updated;
						sunrise = data.forecast.forecastday[0].astro.sunrise;
						sunset = data.forecast.forecastday[0].astro.sunset;
					}
					console.log(data);

					document.querySelector("#cityName").innerHTML = location;
					document.querySelector("#temp").innerHTML = temp_c;
					document.querySelector("#condition").innerHTML = condition;
					document.querySelector("#humidity").innerHTML = humidity;
					document.querySelector("#wind").innerHTML = wind_speed;
					document.querySelector("#pressure").innerHTML = pressure;
					document.querySelector("#last_updated").innerHTML = last_updated;
					document.querySelector("#image").src = image;
					document.getElementById("city").value = "";
				})
		}
