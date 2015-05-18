function DonutShop(name, minHourlyCustomers, maxHourlyCustomers, aveDonutsPerCustomer) {
  this.operationsHours = 12;
  this.name = name;
  this.minHourlyCustomers  = minHourlyCustomers;
  this.maxHourlyCustomers = maxHourlyCustomers;
  this.aveDonutsPerCustomer = aveDonutsPerCustomer;
  
  this.render = function(perHour) {
    var node = document.createElement("td");
    node.innerHTML = perHour;
    return node;
  }
  
  this.purchasingCustomers = function() {
    return Math.floor(Math.random() * (this.maxHourlyCustomers - this.minHourlyCustomers) + this.minHourlyCustomers);
  }
  
  this.bakePerHour = function() {
    return Math.floor(this.purchasingCustomers() * this.aveDonutsPerCustomer);
  }

  this.bakePerDay = function(id) {
    var total = 0;
    var baked = 0;
    var parent = document.getElementById(id);
    parent.appendChild(this.render(this.name));

    for (var i = 0; i < this.operationsHours; i++) {
      baked = this.bakePerHour();
      total += baked;
      parent.appendChild(this.render(baked));
    }
    parent.appendChild(this.render(total));
  }
}

var downtown = new DonutShop("Downtown", 8, 43, 4.50);
var caphill = new DonutShop("Capitol Hill", 4, 37, 2.00);
var slu = new DonutShop("South Lake Union", 9, 23, 6.33);
var wedgewood = new DonutShop("Wedgewood", 2, 28, 1.25);
var ballard = new DonutShop("Ballard", 8, 58, 3.75);

downtown.bakePerDay("downtown");
caphill.bakePerDay("caphill");
slu.bakePerDay("slu");
wedgewood.bakePerDay("wedgewood");
ballard.bakePerDay("ballard");
