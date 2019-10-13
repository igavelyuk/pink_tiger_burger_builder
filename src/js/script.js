// Globals required for chart
var currItem = "";
var totalItem = [];
var debugItem = totalItem[0];
var totalPrice = [];
var globalPosition = [];
var selfvinos = true;
var ispricemod = false;
var reducer = 0;
// End Globals required for chart
// Sw on poppovers
$(function() {
  $('[data-toggle="popover"]').popover()
});
//Sw on tooltips
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('.carousel').carousel();
});
//Sw on MagPopup
$(document).ready(function() {
  $('.popup-link').magnificPopup({
    type: 'image'
  });
});
$('.custom-control-label').prop('indeterminate', true);
// $('#fullHeightModalRight').data('bs.modal').handleUpdate()
// Hide chat window \ activate
$(function() {

  $("#customRadioInline1").click(function() {
    console.log(totalPrice.length);
    $(".collapse").collapse('hide');
    selfvinos = true;
    if (ispricemod) {
      if (totalPrice[0] > 0) {
        reducer = (accumulator, currentValue) => accumulator + currentValue;
        totalPrice[0] = totalPrice[0] - 50;
        $("#totalvalue").text(totalPrice.reduce(reducer));
        ispricemod = false;
      }
    }
  });
  $("#customRadioInline2").click(function() {
    $(".collapse").collapse('show');
    selfvinos = false;
    if (totalPrice[0] > 0) {
      reducer = (accumulator, currentValue) => accumulator + currentValue;
      totalPrice[0] = totalPrice[0] + 50;
      $("#totalvalue").text(totalPrice.reduce(reducer));
      ispricemod = true;
    }
  });
  //anitachat section ---------------------------
  // $("#anitachat").hide();
  // // $("#alive").show();
  // $("#anitaclose").click(function() {
  // if($('#anita-exist')){
  //   $('#anita-exist').remove();
  // }
  // $("#anitachat").hide();
  // $("#alive").show();
  // });
  // $("#alive").click(function() {
  //     $('#anitachat').append(`<iframe id="anita-exist" src="https://getchat.me/pandabc.com.ua" class="anita-chat"></iframe>`);
  //     $("#anitachat").show();
  // });
  //anitachat section ---------------------------
  // Load resources from productdb.json
  var x = 0;
  $.getJSON("json/productdb.json", function(data) {
    sectionsItems(data.sushisetsarray, 0, "rounded-border-image");
    sectionsItems(data.sushisarray, 1, "rounded-border-image-red");
    sectionsItems(data.drinksarray, 2, "rounded-border-image-blue");
    // sectionsItems(data.addonsarray, 3, "rounded-border-image-orange");

    function sectionsItems(el, i, colorClass) {
      var items = [];
      $.each(el, function(key, val) {
        // console.log(key);
        // element.key = key;
        // element.items = items;
        items.push('<div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 item ">'); // 	col-sm-1 col-md-1 	col-lg-4 col-xl-4
        items.push('<h5>' + val.name + '</h5>');
        items.push('<div class="col">');
        items.push('<a class="popup-link" href="' + val.img + '.BIG.jpg">');
        items.push('<img class="' + colorClass + '" src="' + val.img + ' " alt="' + val.name + '" /></a>');
        items.push('</div><div class="">');

        if (val.promo == "true") {
          items.push('<span class="spinner-grow spinner-grow-sm text-danger float-right"></span>');
        } else {
          items.push('<span class="spinner-grow spinner-grow-sm text-white float-right"></span>');
        }
        items.push('<p>' + val.price + 'грн</p>');
        items.push('<p class="font-weight-light">' + val.weight + " - " + val.recipe + '</p>');
        items.push('<div class="input-group">');
        items.push('<input type="number" class="form-control" placeholder="0" required>');
        items.push('<div class="input-group-append">');
        items.push('<div class="invalid-feedback">Незозможно принять</div>');
        items.push('<button class="btn alert-danger btn-rounded add-chart' + i + '" type="submit"> <i class="fas fa-cart-arrow-down"></i> </button>');
        items.push('</div></div></div></div>');
        //items{element: element}
        items.join("");
        // console.log(val.name);
        // Init add to chart function
        //Click on green BUTTON on Chart!

        // End of init to chart function
      });

      // Dinamic create row with col objects
      $("<div/>", {
        "class": "row",
        html: items.join("")
      }).appendTo("#" + Object.keys(data)[i]);

      $('.popup-link').magnificPopup({
        type: 'image'
        // other options
      });

      $(".add-chart" + i).click(function() {
        //Title
        x++;
        // console.log(x + "-----------------------");
        var product = this.parentNode.parentNode.parentNode.parentNode;
        var pname = product.firstElementChild.innerText;
        //Image
        // var imgurl = this.parentNode.parentNode.parentNode.parentNode;
        // var pimg = imgurl.children[1].children[0].getAttributeNode("src").value;
        //Price and Specs
        var price = this.parentNode.parentNode.parentNode;
        var pprice = parseInt(price.children[1].innerText);
        // Input
        var quantity = this.parentNode.parentNode;
        var pq = quantity.firstElementChild.value;
        var total = pq * pprice;
        if (pq > 0 && pq != "undefined") {
          currItem = "<br>" + pq.toString() + "x" + pprice + " = " + total + "грн -  " + pname;
          totalItem.push(currItem);
          totalPrice.push(total);
          // console.log(key+" key-val "+val);
          addToChart(totalItem);
          this.style.background = 'green';
        } else {
          this.style.background = 'red';
        }
      });


      //inside function
      //console.log(Object.keys(element)[0]);
    }
  });
});

function addToChart(itemObject) {
  var reducer = (accumulator, currentValue) => accumulator + currentValue;
  // itemObject.appendTo("#chartitems");
  let bonus = totalPrice.reduce(reducer);
  if(bonus>300){
    totalItem.push("<br>" + 1 + "x" + 0 + " = " + 0 + "грн - рол ВПОДАРУНОК");
  }
  $("#listchart").html("<p>" + itemObject + "</p>");
  $("#chartitems").text(itemObject.length);
  $("#totalvalue").text(totalPrice.reduce(reducer));
}

$("#end").hide();
$("#calltel").keyup(function() {
  if (($("#calltel").val()).length > 5) {
  reducer = (accumulator, currentValue) => accumulator + currentValue;
  let x = totalPrice.reduce(reducer)
    if(x>50){
      $("#end").show();
    }
  } else {
    $("#end").hide();
  }
});
$("#end").click(function() {
  setTimeout(() => {
    $("#end").show();
  }, 2000);
  let telephone = $("#calltel").val();
  let security = $("#security").val();
  var notcall = "empty";
  notcall = "Будь ласка не дзвонить мені";
  if ($("#notcall").attr("checked") != 'checked') {
    notcall = "Передзвоніть мені будьласка";
  }
  let inputAddress = $("#inputAddress").val();
  let inputCity = $("#inputCity").val();
  let inputState = $("#inputState option:selected").text();
  if ([] === typeof(globalPosition)) {
    globalPosition.push("false");
    globalPosition = globalPosition.toString();
  }

  // console.log(telephone+" "+security+" "+notcall+" "+inputAddress+" "+inputCity+" "+inputState);


  if (telephone.length > 6 || security == 8) {
    post('/contact/index.php', {
      products: totalItem,
      total_price: totalPrice,
      telephone: telephone,
      security: security,
      ugeo: globalPosition,
      notcall: notcall,
      input_address: inputAddress,
      input_city: inputCity,
      input_state: inputState,
      self_vinos: selfvinos
    });
  }
});

//geolocation from user
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      globalPosition.push(position.coords.latitude);
      globalPosition.push(position.coords.longitude);
      globalPosition.push(position.coords.accuracy);
      globalPosition.push(position.timestamp);
      globalPosition = globalPosition.toString();
      // var iter = globalPosition.values();
      // for (const value of iter) {
      //   console.log(value); // expected output: "a" "b" "c"
      // }
      // $("#infopanel").append(`<div class="alert alert-success alert-dismissible first-plane stick-bottom">
      //   <button type="button" class="close" data-dismiss="alert">&times;</button>
      //   <strong>Геолокація</strong> визначена ` + globalPosition + `. Закрийте це повідомлення.</div>`);
    });
  } else {
    $("#infopanel").append(`<div class="alert alert-danger alert-dismissible first-plane stick-bottom">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Геолокація</strong> не підтримується. Це не вплине на доставку.</div>`);
  }
  if (globalPosition.length < 3) {
    $("#infopanel").append(`<div class="alert alert-warning alert-dismissible first-plane stick-bottom">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Використовуйте Chrome браузер </strong>Геолокація дуже важлива, якщо ви відмовилися помилково - клікніть на властивостях URL і включіть опцію</div>`);
  }
}
getLocation();
/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */

function post(path, params, method = 'post') {
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
