var usageData = [{
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
}];

var _html;

var width = $(".chart-bg").width();
var height = $(".chart-bg").height();

height = height + "px";

usageData.forEach(function(d) {
  var sectionName = "#" + d.type;
  var bar = d3.select(sectionName);
  var x = d3.scale.linear()
    .domain([0, d.limit])
    .range([0, width]);
  var value = Math.floor(x(d.total)) + "px";

  bar.style("width", value)
    .style("height", height);

  var detailsectionName = "#" + d.type + "-detail";
  _html = d.type + '<span class="unit"> ' + d.unit +
    ' </span><span class="value">' + d.total + '/' + d.limit +
    '</span>';
  $(detailsectionName).html(_html);

});