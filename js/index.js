var debug = true;

var currentMonth = 10;
var navCounter = 0;
var datasize;

var userData = {
  "number": "(646) 717-2770",
  "username": "Jess Jung",
  "year": 2014,
  "properties": [{
    "month": 10,
    "monthInitial": "Oct",
    "cycle": "09/22/14-10/21/14",
    "dueData": "11/04",
    "dueAmount": "74.20",
    "usage": [{
      "type": "voice",
      "total": 248,
      "limit": 300,
      "unit": "mins"
    }, {
      "type": "messaging",
      "total": 27,
      "limit": 100,
      "unit": "msgs"
    }, {
      "type": "data",
      "total": 950,
      "limit": 1000,
      "unit": "MB"
    }]
  }, {
    "month": 9,
    "monthInitial": "Sep",
    "cycle": "08/22/14-09/21/14",
    "dueData": "10/04",
    "dueAmount": "80.72",
    "isPaid": "true",
    "usage": [{
      "type": "voice",
      "total": 293,
      "limit": 300,
      "unit": "mins"
    }, {
      "type": "messaging",
      "total": 55,
      "limit": 100,
      "unit": "msgs"
    }, {
      "type": "data",
      "total": 103,
      "limit": 1000,
      "unit": "MB"
    }]
  }, {
    "month": 8,
    "monthInitial": "Aug",
    "cycle": "07/22/14-08/21/14",
    "dueData": "09/04",
    "dueAmount": "77.45",
    "isPaid": "true",
    "usage": [{
      "type": "voice",
      "total": 127,
      "limit": 300,
      "unit": "mins"
    }, {
      "type": "messaging",
      "total": 79,
      "limit": 100,
      "unit": "msgs"
    }, {
      "type": "data",
      "total": 654,
      "limit": 1000,
      "unit": "MB"
    }]
  }, {
    "month": 7,
    "monthInitial": "Jul",
    "cycle": "06/22/14-07/21/14",
    "dueData": "08/04",
    "dueAmount": "74.20",
    "isPaid": "true",
    "usage": [{
      "type": "voice",
      "total": 254,
      "limit": 300,
      "unit": "mins"
    }, {
      "type": "messaging",
      "total": 68,
      "limit": 100,
      "unit": "msgs"
    }, {
      "type": "data",
      "total": 810,
      "limit": 1000,
      "unit": "MB"
    }]
  }, ]
};

$(function() {

  datasize = userData.properties.length;
  // console.log(datasize);
  onchangeTimeNav(navCounter);
  onchangeDueNav(navCounter);
  initContentMain();

  $('#previous').click(function() {
    navCounter++;
    if (navCounter >= datasize - 1) {
      navCounter = datasize - 1;
    }
    onchangeTimeNav(navCounter);
    onchangeDueNav(navCounter);

  });

  $('#next').click(function() {
    navCounter--;
    if (navCounter <= 0) {
      navCounter = 0;
    }
    onchangeTimeNav(navCounter);
    onchangeDueNav(navCounter);

  });

  $('.nav.inner-level').click(function() {
    // console.log("Menu clicked");
    clear();
    console.log($(this).attr("id"));
    var selectedMenu = $(this).attr("id");

    viewContentDetail(selectedMenu);
    if (selectedMenu.indexOf("-bar") > 0) selectedMenu = selectedMenu.split(
      '-', 1)[0];

    var selectedElement = document.getElementById(selectedMenu);
    selectedElement.className += " active";

  });
  $('.user-info').click(function() {
    clear();
    // console.log("go back to home!");
    navCounter = 0;
    onchangeTimeNav(navCounter);
    onchangeDueNav(navCounter);
    initContentMain();
  })

});

function viewContentDetail(sort) {
  $(".content").append("<div>");

}

function initContentMain() {
  clear();
  $(".content").append(
    '<div class="summary-section"><h2 class="sub-header">Summary</h2><div class="col-md-4 placeholder-sec">Phone info summary</div><div class="col-md-7  col-md-offset-1 placeholder-sec">Billing info summary</div><div class="col-md-12 placeholder-sec" style="margin-top:20px;">Usage info summary</div></div></div>'
  );

}

function onchangeDueNav(index) {

  if (debug) console.log("--------Phonebill : onchangeDueNav---------");

  var currentProperty;

  currentProperty = userData.properties[index];
  // console.log(currentProperty.dueData);
  $("#due-date").text(currentProperty.dueData);
  $("#due-amount").text("$" + currentProperty.dueAmount);
  if (currentProperty.isPaid) $("#due-alert").text("Already paid")
  else $("#due-alert").text("5days remaining");

}

function onchangeTimeNav(index) {

  if (debug) console.log("--------Phonebill : onchangeTimeNav---------");

  var currentProperty, previousProperty, nextProperty, previousMonthInitial,
    nextMonthInitial, previousCycle, nextCycle;

  currentProperty = userData.properties[index];

  if (index + 1 <= datasize - 1) {
    previousProperty = userData.properties[index + 1];
    previousMonthInitial = previousProperty.monthInitial;
    previousCycle = previousProperty.cycle;
  } else {
    previousMonthInitial = "Not available";
    previousCycle = "";
  }
  if (index - 1 >= 0) {
    nextProperty = userData.properties[index - 1];
    nextMonthInitial = nextProperty.monthInitial;
    nextCycle = nextProperty.cycle;
  } else {
    nextMonthInitial = "Not available";
    nextCycle = "";
  }

  if (currentProperty.month == currentMonth) {
    $("#current-month").text("current");
  } else {
    $("#current-month").text(currentProperty.monthInitial);
  }

  $("#current-cycle").text(currentProperty.cycle);
  $("#previous-cycle").text(previousCycle);
  $("#next-cycle").text(nextCycle);
  $("#previous-month").text(previousMonthInitial);
  $("#next-month").text(nextMonthInitial);

  visualizeUsages(currentProperty.usage);
}

function visualizeUsages(usageData) {

  if (debug) console.log("--------Phonebill : visualizeUsages---------");

  var _html;
  var width = $(".chart-bg").width();
  var height = $(".chart-bg").height();

  height = height + "px";

  usageData.forEach(function(d) {
    var sectionName = "#" + d.type + "-bar";
    var bar = d3.select(sectionName);
    var x = d3.scale.linear()
      .domain([0, d.limit])
      .range([0, width]);
    var value = Math.floor(x(d.total)) + "px";

    bar.style("height", height).transition().duration(450).ease("linear").style(
      "width",
      value);

    var detailsectionName = "#" + d.type + "-detail";
    _html = d.type + '<span class="unit"> ' + d.unit +
      ' </span><span class="value">' + d.total + '/' + d.limit +
      '</span>';
    d3.select(detailsectionName).html(_html);
  });
}

function clear() {
  if (debug) console.log("--------Phonebill : clear---------");

  $(".nav").removeClass("active");
  $(".content").html("");
}