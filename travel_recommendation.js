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
        })
        .catch((e) => showError(e));
}

function clearSearchResults() {
    document.getElementById("searchResults").replaceChildren();
}

function clearSearch() {
    document.getElementById("searchPhrase").value = "";
    clearSearchResults();
}

function appendSearchResults(recommendations) {
    var resultList = document.getElementById("searchResults");
    for (recommendation of recommendations) {
        var wrapper = document.createElement("div");
        wrapper.setAttribute("class", "result");
        resultList.appendChild(wrapper);

        if (recommendation.imageUrl) {
            var img = wrapper.appendChild(document.createElement("img"));
            img.setAttribute("style", "width: 20%");
            img.setAttribute("src", recommendation.imageUrl);
        }

        var paragraph = wrapper.appendChild(document.createElement("p"));
        var b = document.createElement("b");
        paragraph.appendChild(b)
        b.appendChild(document.createTextNode(recommendation.name));

        if (recommendation.description) {
            var paragraph2 = wrapper.appendChild(document.createElement("p"));
            paragraph2.appendChild(document.createTextNode(recommendation.description));
        }
    }
}

function showEmptyResults() {
    appendSearchResults([ {name: "No results found"} ]);
}

function showError(e) {
    appendSearchResults([ {name: "Error while fetching results"} ]);
}

async function search() {
    clearSearchResults();
    var recommendations = await fetch('travel_recommendation_api.json')
        .then((response) => response.json())
        .catch((e) => showError(e));
    console.log(recommendations);
    var query = document.getElementById("searchPhrase").value.toLowerCase();
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
            appendSearchResults(recommendations.countries.map(country => {
                return {
                    name: country.name,
                    imageUrl: country.cities[0].imageUrl,
                }
            }));
            break;
        default:
            showEmptyResults();
    }
}