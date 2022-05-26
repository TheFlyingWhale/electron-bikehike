import { displayDetails } from "./locationDetailsHandler.js";

/** map
 *  Initializes the map and populates it with all given stations
 * @param {array} stations
 */
export async function map(stations) {
    mapboxgl.accessToken =
        "pk.eyJ1IjoibXJmbHl3aGFsZWd1eSIsImEiOiJjazNoZGFpOGswMWJsM2xsMXp6N3ZnM25pIn0.qS7D5FBXfYUqswpNrCDkYw";

    const map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [10.7522, 59.9139], // starting position [lng, lat]
        zoom: 12.5, // starting zoom
    });

    createMarkerCurrentLocation(map);

    populateMap(stations, map);
}

/** populateMap
 *  Creates a marker for each station and applies it to the given parent
 *
 * @param {array} stations
 * @param {htmlElement} parent
 */
function populateMap(stations, parent) {
    stations.forEach((station) => {
        createMarkerPointer(station, parent);
    });
}

/** createMarkerPointer
 *  Creates a marker and applies it to the given parent
 *
 * @param {object} station
 * @param {htmlElement} parent
 */
function createMarkerPointer(station, parent) {
    const el = document.createElement("div");
    const width = 32;
    const height = 50;

    el.className = "marker";
    el.style.backgroundImage = "url(./assets/svg/markerPoint.svg)";
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = "100%";

    el.addEventListener("click", () => {
        displayDetails(
            station.address,
            station.bikes_available,
            station.docks_available
        );
        parent.flyTo({
            center: [station.lon, station.lat],
            zoom: 15,
        });
    });

    new mapboxgl.Marker(el).setLngLat([station.lon, station.lat]).addTo(parent);
}
/** createMarkerCurrentLocation
 *  Creates a marker representing the user and applies it to given parent
 *
 * @param {htmlElement} parent
 */
function createMarkerCurrentLocation(parent) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const el = document.createElement("div");
            const width = 32;
            const height = 37;

            el.className = "marker";
            el.style.backgroundImage = "url(./assets/svg/markerUser.svg)";
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
            el.style.backgroundSize = "100%";

            new mapboxgl.Marker(el)
                .setLngLat([
                    position.coords.longitude,
                    position.coords.latitude,
                ])
                .addTo(parent);

            parent.flyTo({
                center: [position.coords.longitude, position.coords.latitude],
                zoom: 14,
            });
        });
    } else {
        alert("Geolocation is not activated or supported");
    }
}
