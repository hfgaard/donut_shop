function DonutShop(name, minHourlyCustomers, maxHourlyCustomers, aveDonutsPerCustomer) {
  this.operationsHours = 11;
  this.name = name;
  this.minHourlyCustomers  = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.aveDonutsPerCustomer = aveDonutsPerCustomer;
  this.donutsPerHour = [];
  this.totalDonuts = this.bakePerDay();
}
  

DonutShop.prototype.purchasingCustomers = function() {
  return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers) + this.minHourlyCustomers);
}

DonutShop.prototype.bakePerHour = function() {
  return Math.floor(this.purchasingCustomers() * this.aveDonutsPerCustomer);
}

DonutShop.prototype.bakePerDay = function() {
  var total = 0;
  for (var i = 0; i <= this.operationsHours; i++) {
    var donutsPerHour = this.bakePerHour();
    this.donutsPerHour[i] = donutsPerHour;
    total += donutsPerHour;
  }
  return total;
}

DonutShop.prototype.render = function() {
  var node, row, tableLocation;
  
  node = document.createElement("td");
  node.textContent = this.name;
  
  row = document.createElement("tr");
  row.appendChild(node);

  tableLocation = document.getElementById("donut-table");
  tableLocation.appendChild(row);

  for (var i = 0; i <= this.operationsHours; i++) {
    node = document.createElement("td");
    node.textContent = this.donutsPerHour[i];
    row.appendChild(node);
  }
  
  node = document.createElement("td");
  node.textContent = this.totalDonuts;
  row.appendChild(node);
}

var locations = [];
locations.push(new DonutShop("Downtown", 8, 43, 4.50));
locations.push(new DonutShop("Capitol Hill", 4, 37, 2.00));
locations.push(new DonutShop("South Lake Union", 9, 23, 6.33));
locations.push(new DonutShop("Wedgewood", 2, 28, 1.25));
locations.push(new DonutShop("Ballard", 8, 58, 3.75));

for (var i = 0; i < locations.length; i++) {
  locations[i].render();
}

var submitButton = document.getElementById("submit");
var newLocation = document.getElementById("location");
var newMinCust = document.getElementById("minCust");
var newMaxCust = document.getElementById("maxCust");
var newAvePerCust = document.getElementById("avePerCust");

var updateLocation = function(arrayLocation) {
  var updateShop = new DonutShop(newLocation.value, newMinCust.value, newMaxCust.value, newAvePerCust.value);
  locations.splice(arrayLocation, 1, updateShop);
  var list = document.getElementsByTagName("tr");
  var updateList = list[arrayLocation + 1].childNodes;
  
  for (var i = 0; i <= updateShop.operationsHours; i++) {
    updateList[i + 1].textContent = updateShop.donutsPerHour[i];
  }
  updateList[updateList.length - 1].textContent = updateShop.totalDonuts;
}

var submitLocation = function() {
  var existingLocation = false;
  var arrayLocation = 0;
  
  for (var i = 0; i < locations.length; i++) {
    if (newLocation.value == locations[i].name) {
      existingLocation = true;
      arrayLocation = i;
    }
  }

  if (existingLocation) {
    updateLocation(arrayLocation);
  } else { 
    locations.push(new DonutShop(newLocation.value, newMinCust.value, newMaxCust.value, newAvePerCust.value)); 
    locations[locations.length - 1].render();
  }
}

submitButton.addEventListener('click', submitLocation, false);
