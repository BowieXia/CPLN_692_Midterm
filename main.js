/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that,
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */
var slideNumber = 1;

// We set this to HTTP to prevent 'CORS' issues
$(document).ready(function() {
  // $("#text-input1").val("http://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json");
  // $("#text-input2").val("Lat");
  // $("#text-input3").val("Lng");
  if (slideNumber === 1) {
    $('.previous').hide();
  }
  $('.my-legend').hide();
  var GroupData = [];
  var DatasourceURL = "http://raw.githubusercontent.com/BowieXia/CPLN_692_Midterm/master/FoodInspection_FIELD_Updated.json";
  $("#MapData").click(function(){
    downloadCrimeData.done(function(data) {
      var parsed = parseData(data);
  //    console.log(parsed);
  //    var F_Data = filterData(parsed);
  //    console.log(F_Data);
      // var featureGroup = L.geoJson(parsed, {
      //   style: myStyle,
      //   filter: myFilter
      // }).addTo(map);
      // console.log(featureGroup);
      GroupByType(parsed);
      console.log(GroupData);
      var markers = makeMarkers(parsed);
    //  console.log("markers");
    //  console.log(markers);
      plotMarkers(markers);
    // removeMarkers(markers);
    });
    $('.my-legend').hide();
  });

  //classify spots click function
  $("#ButtonClassify").click(function(){
    downloadCrimeData.done(function(data) {
      var parsed = parseData(data);
      GroupByType(parsed);
      var markers = makeClassifiedMarkers(parsed);
      plotMarkers(markers);
    });
    $('.my-legend').show();
  });

  //reset view click function
  $('#reset').click(function(){
    ResetView();
  });

  //Previous, next and return click function

  $('#return').click(function(){
    slideNumber = 1;
    $('.previous').hide();
    console.log(slideNumber);
    $('.next').show();
    $('.return').hide();
  });

  $('#previous').click(function(){
    slideNumber -= 1;
    console.log(slideNumber);
    if (slideNumber === 1) {
      $('.previous').hide();
    }
    if (slideNumber !== 5) {
      $('.return').hide();
      $('.next').show();
    }
  });

  $('#next').click(function(){
    slideNumber += 1;
    $('.previous').show();
    console.log(slideNumber);
    if (slideNumber === 5) {
      $('.next').hide();
      $('.return').show();
    }
  });


  //reset view function
  var ResetView = function(){
    map.setView([41.921271, -87.702531],14);
  };
  //parse data function
  var downloadCrimeData = $.ajax(DatasourceURL);
  var parseData = function(data) {
      var parsedInfo =  JSON.parse(data);
      return parsedInfo;
  };

  downloadCrimeData.done(function(data){
     parseData(data);
  });
  //different circlemarker options
  var CircleMarkerOptions = {
    radius: 10,
    fillColor: "#95a5a6",
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  };

  var BakeryMarkerOptions = {
    radius: 10,
    fillColor: "#1abc9c",
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  };
  var GroceryMarkerOptions = {
    radius: 10,
    fillColor: "#3498db",
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  };
  var LiquorMarkerOptions = {
    radius: 10,
    fillColor: "#9b59b6",
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  };
  var TRUCKMarkerOptions = {
    radius: 10,
    fillColor: "#34495e",
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  };
  var RESTAURANTMarkerOptions = {
    radius: 10,
    fillColor: "#e67e22",
    color: "#ffffff",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8
  };

  // var myStyle = function(feature) {
  // switch (feature.FIELD5) {
  //     case 'Bakery': return {fillColor: "#1abc9c"};
  //     case 'COFFEE SHOP':   return {fillColor: "#3498db"};
  //     case 'Liquor': return {fillColor: "#9b59b6"};
  //     case 'MOBILE FOOD TRUCK':   return {fillColor: "#000000"};
  //     case 'RESTAURANT': return {fillColor: "#e67e22"};
  // }
  // //return {color: "#000000"};
  // };
  //
  // var myFilter = function(feature) {
  // // if (feature.properties.COLLDAY !== " ") {
  // //   return feature;
  // // }
  // //return true;
  // };

  var GroupByType = function(data) {
     GroupData = _.groupBy(data,function(data){ return data.FIELD5;});
  };
  //Original markers
  var makeMarkers = function(data) {
  //    return L.marker([data.Lat,data.Lng]);
    var NewMarkers = [];

    _.each(data,function(feature){

      if (feature.FIELD15 !== "" || feature.FIELD16 !== "") {
        NewMarkers.push(L.circleMarker([Number(feature.FIELD15),Number(feature.FIELD16)],CircleMarkerOptions));
      }
    });
    return NewMarkers;
  };
  //Classifies markers
  var makeClassifiedMarkers = function(data) {
  //    return L.marker([data.Lat,data.Lng]);
    var NewMarkers = [];

    _.each(data,function(feature){
  //    console.log(feature);
      if (feature.FIELD15 !== "" || feature.FIELD16 !== "") {

        switch (feature.FIELD5) {
            case 'Bakery': return NewMarkers.push(L.circleMarker([Number(feature.FIELD15),Number(feature.FIELD16)],BakeryMarkerOptions));
            case 'Grocery Store':   return NewMarkers.push(L.circleMarker([Number(feature.FIELD15),Number(feature.FIELD16)],GroceryMarkerOptions));
            case 'Liquor': return NewMarkers.push(L.circleMarker([Number(feature.FIELD15),Number(feature.FIELD16)],LiquorMarkerOptions));
            case 'MOBILE FOOD TRUCK':  return NewMarkers.push(L.circleMarker([Number(feature.FIELD15),Number(feature.FIELD16)],TRUCKMarkerOptions));
            case 'Restaurant': return NewMarkers.push(L.circleMarker([Number(feature.FIELD15),Number(feature.FIELD16)],RESTAURANTMarkerOptions));
            default: return NewMarkers.push(L.circleMarker([Number(feature.FIELD15),Number(feature.FIELD16)],CircleMarkerOptions));
        }
        console.log(feature);
      }
    });
    //console.log(NewMarkers);
    return NewMarkers;
  };

  //Plot markers
  var plotMarkers = function(markers) {
  //  markers.addTo(map);
    _.each(markers,function(markers){
      markers.addTo(map);
    });
  };

  var removeMarkers = function(markers) {
  //  map.removeLayer(markers);
    _.each(markers,function(markers){
      map.removeLayer(markers);
    });
  };

  var map = L.map('map', {
    center: [41.921271, -87.702531],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  var hiden = false;
  //Hiding sidebar button click function
  $('button#hide').click(
    function(){
      hiden = !hiden;
      if(hiden) {
        $('#sidebar').animate({width:0});
        $('#map').animate({left:0});
        $('button#hide').css({"background-image":"url('css/inveye.png')"});
      }else {
        $('#sidebar').animate({width:340});
        $('#map').animate({left:340});
        $('button#hide').css({"background-image":"url('css/veye.png')"});
      }
    }
  );


});
