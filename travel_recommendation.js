function displayRecommendation(recommendation) {
    document.getElementById("recoName").textContent = recommendation.name;
    document.getElementById("recoDescription").textContent = recommendation.description;
    document.getElementById("recoImg").setAttribute("src", recommendation.imageUrl);
}

function loadRecommendation() {
    var recommendations = fetch('travel_recommendation_api.json')
        .then((response) => response.json())
        .then((json) => {
            var cities = json.countries.flatMap(country => country.cities);
            var selectedCity = cities[Math.floor(Math.random() * cities.length)];
            displayRecommendation(selectedCity);
        });
}

function clearSearchResults() {
    document.getElementById("searchResults").replaceChildren();
}

function clearSearch() {
    document.getElementById("search").textContent = "";
    clearSearchResults();
}

function appendSearchResults(recommendations) {
    var resultList = document.getElementById("search");
    for (reco of recommendations) {
        resultList.appendChild(document.createElement("p")).append(document.createElement("b")).append(recommendation.name);
        resultList.appendChild(document.createElement("p")).append(recommendation.description);
        var img = resultList.appendChild(document.createElement("img"));
        img.setAttribute("style", "width: 20%");
        img.setAttribute("src", recommendation.imageUrl);
    }
}

function search() {
    clearSearchResults();
    var recommendations = fetch('travel_recommendation_api.json')
        .then((response) => response.json());
    var query = document.getElementById("search").textContent.toLowerCase();
    switch(query) {
        case "beach":
        case "beaches":
            appendSearchResults(recommendations.beaches);
            break;
        case "temple":
        case "temples":
            appendSearchResults(recommendations.temples);
            break;
        case "country":
        case "countries":
            appendSearchResults(recommendations.countries).flatMap(country => country.cities);
            break;
    }
}