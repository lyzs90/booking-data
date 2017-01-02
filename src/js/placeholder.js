// Get bookings
utils.ajax({
    url: 'http://localhost:8080/',
    type: 'get',
    contentType: 'application/json; charset=utf-8',
    data: 'index=1'
}).then(
  function fulfillHandler (data) {
      console.log(data);
      mapmarkers.addMarker(map, mapmarkers.createGeoJSON(data));
  },
  function rejectHandler (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
  }
).catch(function errorHandler (error) {
    throw error;
});
