// Globals required for chart
var currItem = "";
var totalItem = [];
var debugItem = totalItem[0];
var totalPrice = [];
// End Globals required for chart
// Sw on poppovers
$(function() {
  $('[data-toggle="popover"]').popover()
});
//Sw on tooltips
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});
// $('#fullHeightModalRight').data('bs.modal').handleUpdate()
// Hide chat window \ activate
$(function() {
  $("#anitachat").hide();
  $("#alive").show();
  $("#anitaclose").click(function() {
    $("#anitachat").hide();
    $("#alive").show();
  });
  $("#alive").click(function() {
    $("#anitachat").show();
    $("#alive").hide();
  });
  // Load resources from productdb.json
  var x = 0;
  $.getJSON("json/productdb.json", function(data) {
    sectionsItems(data.burgersarray, 0, "rounded-border-image");
    sectionsItems(data.drinksarray, 1, "rounded-border-image-blue");
    sectionsItems(data.addonsarray, 2, "rounded-border-image-orange");

    function sectionsItems(el, i, colorClass) {
      var items = [];
      $.each(el, function(key, val) {
        console.log(key);
        // element.key = key;
        // element.items = items;
        items.push('<div class="col item">');
        items.push('<h3>' + val.name + '</h3>');
        items.push('<div class="col">');
        items.push('<img class="' + colorClass + '" src="' + val.img + '" alt="' + val.name + '" />');
        items.push('</div><div class="col">');

        if (val.promo == "true") {
          items.push('<span class="spinner-grow spinner-grow-sm text-success float-right"></span>');
        } else {
          items.push('<span class="spinner-grow spinner-grow-sm text-white float-right"></span>');
        }
        items.push('<p>' + val.price + 'грн</p>');
        items.push('<p class="font-weight-light">' + val.recipe + '</p>');
        items.push('<div class="input-group">');
        items.push('<input type="number" class="form-control" placeholder="0">');
        items.push('<div class="input-group-append">');
        items.push('<button class="btn btn-success btn-rounded add-chart' + i + '" type="submit"> <i class="fas fa-cart-arrow-down"></i> </button>');
        items.push('</div></div></div></div>');
        //items{element: element}
        items.join("");
        console.log(val.name);
        // Init add to chart function
        //Click on green BUTTON on Chart!

        // End of init to chart function
      });

      // Dinamic create row with col objects
      $("<div/>", {
        "class": "row",
        html: items.join("")
      }).appendTo("#" + Object.keys(data)[i]);

      $(".add-chart" + i).click(function() {
        //Title
        x++;
        console.log(x + "-----------------------");
        var product = this.parentNode.parentNode.parentNode.parentNode;
        var pname = product.firstElementChild.innerText;
        //Image
        var imgurl = this.parentNode.parentNode.parentNode.parentNode;
        var pimg = imgurl.children[1].children[0].getAttributeNode("src").value;
        //Price and Specs
        var price = this.parentNode.parentNode.parentNode;
        var pprice = parseInt(price.children[1].innerText);
        // Input
        var quantity = this.parentNode.parentNode;
        var pq = quantity.firstElementChild.value;
        var total = pq * pprice;
        currItem = "<br>" + pq.toString() + "x" + pprice + " = " + total + "грн -  " + pname;
        totalItem.push(currItem);
        totalPrice.push(total);
        // console.log(key+" key-val "+val);
        addToChart(totalItem);
      });


      //inside function
      //console.log(Object.keys(element)[0]);
    }
  });
});

function addToChart(itemObject) {
  var reducer = (accumulator, currentValue) => accumulator + currentValue;
  // itemObject.appendTo("#chartitems");
  $("#listchart").html("<p>" + itemObject + "</p>");
  $("#chartitems").text(itemObject.length);
  $("#totalvalue").text(totalPrice.reduce(reducer) + "грн");
}
/*********************************************************
Geolocation
*********************************************************/
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    console.log(startPos.coords.latitude);
    console.log(startPos.coords.longitude);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};


// (function() {
// if ("geolocation" in navigator) {
//   // if browser can find GPS position
//   //calling firstarg=success_function secondarg=unsucsess_function
//   //options: maximumAge Is a positive long value indicating the maximum age in milliseconds of a possible cached position 0-infinity
//   navigator.geolocation.getCurrentPosition(gcpOK, gcpError);
// } else {
//   console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
//   //    https://ipstack.com/quickstart
//   // altPosition(); //Alternative service find by IP
// }
// //Alternative
// })();
//
// function gcpError() {
//   //position.coords.latitude +","+ position.coords.longitude;
//   /*position.coords.latitude+","+position.coords.longitude*/
//   $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + "," + position.coords.longitude, function(data, status, xhr) {
//     var globalCityCountry = data.results[1].address_components[2].long_name;
//     var cCode = data.results[1].address_components[3].short_name;
//     console.log('%c ' + globalCityCountry, 'background: #222; color: #bada55');
//   });
// }
// // $.getJSON("http://api.ipstack.com/check?access_key=5a9d245a0d7a8992f1dd9e953c4cd7d5", function(data, status, xhr) {
// //   var g = data.ip + data.city + "," + data.country_name+data.latitude+data.longitude"--------------------------";
//   console.log(g);
// });

$("#end").click(function() {
  setTimeout(()=>{
    $("#end").show();
    $("#end").show();
  },2000);
  post('/contact/index.php', {name: 'Johnny Bravo'});
  $("#end").hide();
});


/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

function post(path, params, method='post') {

  // The rest of this code assumes you are not using a library.
  // It can be made less wordy if you use one.
  const form = document.createElement('form');
  form.method = method;
  form.action = path;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = key;
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }
  }

  document.body.appendChild(form);
  form.submit();
}
