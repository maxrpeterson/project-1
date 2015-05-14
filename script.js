var subtotalField = document.querySelector("#subtotal-field");
var taxField = document.querySelector("#tax-field");
var totalField = document.querySelector("#total-field");
var tabField = document.querySelector("#tab ul")

function Item(item) {
	this.name = item.querySelector(".item-name").textContent;
	if (item.querySelector(".price").textContent.charAt(0) === "$") {
		this.price = parseFloat(item.querySelector(".price").textContent.slice(1));
	} else if (typeof parseFloat(item.querySelector(".price").textContent) === "number") {
		this.price = parseFloat(item.querySelector(".price").textContent);
	}
};
/*
Item.prototype.addToTab = function() {
	tab.items.push(this);
	var tabItem = document.createElement("li");
	tabItem.textContent = this.name + " ";
	var tabItemPrice = document.createElement("span");
	tabItemPrice.classList.add("price");
	tabItemPrice.textContent = "$" + this.price.toFixed(2);
	tabItem.appendChild(tabItemPrice);
	tabField.appendChild(tabItem);
	tab.calcTotal();
};
*/



function Menu(itemElems) {
	this.items = itemElems;
	/*
	for (var i = 0; i < itemElems.length; i++) {
		this.items.push(new Item(itemElems[i]));
	}
	*/
};
var menu = new Menu(document.querySelectorAll("#menu .item"));


var taxRate = 0.08875;

function Tab() {
	this.subtotal = 0;
	this.tax = 0;
	this.total = 0;
	this.items = [];
};
Tab.prototype.calcTotal = function(item) {
	this.subtotal = 0;
	for (var i = 0; i < this.items.length; i++) {
		this.subtotal += this.items[i].price;
	}
	this.tax = this.subtotal * taxRate;
	this.total = this.subtotal + this.tax
	subtotalField.textContent = this.subtotal.toFixed(2);
	totalField.textContent = this.total.toFixed(2);
	taxField.textContent = this.tax.toFixed(2);
};
// Tab.prototype.checkout = function() {

// }

var addToTab = function(event) {
	event.preventDefault();
	tab.items.push(new Item(event.currentTarget));
	var tabItem = document.createElement("li");
	tabItem.textContent = event.currentTarget.querySelector(".item-name").textContent + " ";
	var tabItemPrice = document.createElement("span");
	tabItemPrice.classList.add("price");
	tabItemPrice.textContent = event.currentTarget.querySelector(".price").textContent;
	tabItem.appendChild(tabItemPrice);
	tabField.appendChild(tabItem);
	tab.calcTotal();
	document.querySelector("#tab").scrollTop = 9999999999;
};
for (var i = 0; i < menu.items.length; i++) {
	menu.items[i].addEventListener("click", addToTab);
}

var tab = new Tab;
tab.calcTotal();