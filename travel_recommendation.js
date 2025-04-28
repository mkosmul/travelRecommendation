function loadRecommendation() {
    var recommendations = fetch('travel_recommendation_api.json')
        .then((response) => response.json())
        .then((json) => {
            var cities = json.countries.flatMap(country => country.cities);
            var selectedCity = cities[Math.floor(Math.random() * cities.length)];
            document.getElementById("recoName").textContent = selectedCity.name;
            document.getElementById("recoDescription").textContent = selectedCity.description;
            document.getElementById("recoImg").setAttribute("src", selectedCity.imageUrl);
        });
}