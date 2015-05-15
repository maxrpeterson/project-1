var subtotalField = document.querySelector("#subtotal-field");
var taxField = document.querySelector("#tax-field");
var totalField = document.querySelector("#total-field");
var tabField = document.querySelector("#tab ul")


function Menu(items) {
	this.items = [];
	for (var i = 0; i < items.length; i++) {
		this.items.push(new MenuItem(items[i]));
	}
	this.currentTab;
	this.orders = [];
};
Menu.prototype.createTab = function() {
	this.orders.push(new Tab());
	this.currentTab = this.orders[(this.orders.length - 1)];
};
Menu.prototype.addToTab = function(item) {
	this.currentTab.addItem(this.items[(this.items.indexOf(item))]);
};

function MenuItem(item) {
	this.html = item;
	var htmlPrice = item.querySelector(".price").textContent;
	if (htmlPrice.charAt(0) === "$") {
			this.price = parseFloat(htmlPrice.slice(1));
	} else if (typeof parseFloat(htmlPrice) === "number") {
			this.price = parseFloat(htmlPrice);
	}
};
var menu = new Menu(document.querySelectorAll("#menu .item"));
for (var i = 0; i < menu.items.length; i++) {
	menu.items[i].html.addEventListener("click", function(event) {
		event.currentTarget.addToTab();
	});
};




function Tab() {
	this.items = [];
	this.subtotal = 0;
	this.tax = 0;
	this.total = 0;
};
Tab.prototype.calcTotal = function() {
	this.subtotal = 0;
	for (var i = 0; i < this.items.length; i++) {
		this.subtotal += this.items[i].price;
	}
	this.tax = this.subtotal * 0.08875;
	this.total = this.subtotal + this.tax;
	subtotalField.textContent = this.subtotal.toFixed(2);
	taxField.textContent = this.tax.toFixed(2);
	totalField.textContent = this.total.toFixed(2);
};
Tab.prototype.addItem = function(item) {
	this.items.push(new TabItem(item));
	this.render();
};
Tab.prototype.render = function() {
	for (var i = 0; i < this.items.length; i++) {
		if (this.items[i].html.parentNode !== tabField) {
			tabField.appendChild(this.items[i].html)
		}
	}
	this.calcTotal();
}

function TabItem(item) {
	this.price = item.price;
	this.html = item.html.cloneNode(true);
};
