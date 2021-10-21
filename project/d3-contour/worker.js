importScripts("js/turf.min.js");
importScripts("js/chroma.min.js");

self.addEventListener('message', async ({ data }) => {
  if (data.event == "init") {
    let geojson = data.geojson
    let step = 0.1;
    let grid = turf.interpolate(geojson, step, {
      gridType: "points",
      property: "value",
      units: "degrees",
      weight: 4
    });
    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;
    let realWidth = 0;
    let realHeight = 0;
    let firstLng = grid.features[0].geometry.coordinates[0];
    grid.features.forEach(feature => {
      if (feature.geometry.coordinates[0] == firstLng) {
        realHeight++;
      }
      let [lng, lat] = feature.geometry.coordinates;
      if (lng > maxLng) {
        maxLng = lng;
      }
      if (lng < minLng) {
        minLng = lng;
      }
      if (lat > maxLat) {
        maxLat = lat;
      }
      if (lat < minLat) {
        minLat = lat;
      }
    });
    realWidth = grid.features.length / realHeight;
    let imageData = new ImageData(new Uint8ClampedArray(realWidth * realHeight * 4), realWidth, realHeight);
    for (let w = 0, k = 0; w < realWidth; w++) {
      for (let h = realHeight - 1; h >= 0; h--, k++) {
        let feature = grid.features[k];
        let value = feature.properties.value;
        let pixelIndex = (h * realWidth) + w;
        let scale = chroma.scale(["green", 'yellow', 'orange', 'red', 'purple', 'black']).domain([0, 1]).classes(10);
        let color = scale(value).rgb();
        imageData.data[pixelIndex * 4 + 0] = color[0];
        imageData.data[pixelIndex * 4 + 1] = color[1];
        imageData.data[pixelIndex * 4 + 2] = color[2];
        imageData.data[pixelIndex * 4 + 3] = 200;
      }
    }
    self.postMessage({
      minLng, maxLng,
      minLat, maxLat,
      imageData
    });
  }
}, false);

function fetchJson(url) {
  return new Promise(resolve => {
    fetch(url)
      .then(res => res.json())
      .then(resolve);
  })
}