importScripts("js/turf.min.js");
importScripts("js/chroma.min.js");

self.addEventListener('message', async ({ data }) => {
  if (data.event == "init") {
    let geojson = data.geojson
    let step = 0.1;
    let ugrid = turf.interpolate(geojson, step, {
      gridType: "points",
      property: "u",
      units: "degrees",
      weight: 4
    });
    let vgrid = turf.interpolate(geojson, step, {
      gridType: "points",
      property: "v",
      units: "degrees",
      weight: 4
    });
    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;
    let realWidth = 0;
    let realHeight = 0;
    let firstLng = ugrid.features[0].geometry.coordinates[0];
    ugrid.features.forEach(feature => {
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
    realWidth = ugrid.features.length / realHeight;
    let imageData = new ImageData(new Uint8ClampedArray(realWidth * realHeight * 4), realWidth, realHeight);
    for (let w = 0, k = 0; w < realWidth; w++) {
      for (let h = realHeight - 1; h >= 0; h--, k++) {
        let ufeature = ugrid.features[k];
        let vfeature = vgrid.features[k];
        let u = ufeature.properties.u;
        let v = vfeature.properties.v;
        let pixelIndex = (h * realWidth) + w;
        imageData.data[pixelIndex * 4 + 0] = u < 0 ? 0 : 255;
        imageData.data[pixelIndex * 4 + 1] = Math.abs(u) / 15 * 255;
        imageData.data[pixelIndex * 4 + 2] = v < 0 ? 0 : 255;
        imageData.data[pixelIndex * 4 + 3] = Math.abs(v) / 15 * 255;
      }
    }
    self.postMessage({
      minLng,
      maxLng,
      minLat,
      maxLat,
      imageData
    });
  }
}, false);
