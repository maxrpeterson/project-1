var subtotalField = document.querySelector("#subtotal-field");
var taxField = document.querySelector("#tax-field");
var totalField = document.querySelector("#total-field");
var tabField = document.querySelector("#tab ul");
var orderHistory = document.querySelector("#history div ul");


function Menu(items) {
	this.items = [];
	for (var i = 0; i < items.length; i++) {
		var htmlPrice = items[i].querySelector(".price").textContent;
		if (htmlPrice.charAt(0) === "$") {
				items[i].price = parseFloat(htmlPrice.slice(1));
		} else if (typeof parseFloat(htmlPrice) === "number") {
				items[i].price = parseFloat(htmlPrice);
		}
		this.items.push(items[i]);
	}
	this.currentTab = null;
	this.orders = [];
}
Menu.prototype.createTab = function() {
	this.orders.push(new Tab());
	this.currentTab = this.orders[(this.orders.length - 1)];
	this.currentTab.render();
};
Menu.prototype.addToTab = function(item) {
	this.currentTab.addItem(item);
};
var toggleHidden = function(event) {
	event.currentTarget.children[0].classList.toggle("hidden");
};
Menu.prototype.checkout = function() {
	if (tabField.hasChildNodes()) {
		var order = document.createElement("li");
		order.textContent = "Order #" + this.orders.length + ": " + this.currentTab.items.length + " items";
		var orderDetails = document.createElement("div");
		orderDetails.classList.add("hidden", "details");
		for (var i = this.currentTab.items.length - 1; i >= 0; i--) {
			var thisHTML = tabField.children[0];
			thisHTML.removeEventListener("click", removeTabItem);
			thisHTML.querySelector(".price input").removeEventListener("keyup", updateItemPrice);
			thisHTML.querySelector(".price").textContent += thisHTML.querySelector(".price input").value;
			orderDetails.appendChild(thisHTML);
		}
		order.appendChild(orderDetails);
		orderHistory.appendChild(order);
		order.addEventListener("click", toggleHidden)
		this.createTab();
	}
};



function Tab() {
	this.items = [];
	this.subtotal = 0;
	this.tax = 0;
	this.total = 0;
}
Tab.prototype.calcTotal = function() {
	this.subtotal = 0;
	for (var i = 0; i < this.items.length; i++) {
		this.subtotal += parseFloat(this.items[i].price);
	}
	this.tax = this.subtotal * 0.08875;
	this.total = this.subtotal + this.tax;
	subtotalField.textContent = this.subtotal.toFixed(2);
	taxField.textContent = this.tax.toFixed(2);
	totalField.textContent = this.total.toFixed(2);
};
Tab.prototype.addItem = function(item) {
	var tabItemIndex = this.items.length;
	this.items.push(new TabItem(item,tabItemIndex));
	this.render();
};
Tab.prototype.render = function() {
	for (var i = 0; i < this.items.length; i++) {
		if (this.items[i].html.parentNode !== tabField) {
			tabField.appendChild(this.items[i].html);
		}
	}
	this.calcTotal();
	document.querySelector("#tab div:first-child").scrollTop = 99999999;
};
Tab.prototype.removeItem = function(item) {
	var itemHtml = item;
	this.items.splice(itemHtml.tabItemIndex,1);
	itemHtml.parentNode.removeChild(itemHtml);
	for (var i = 0; i < this.items.length; i++) {
		this.items[i].html.tabItemIndex = i;
	}
	this.render();
};
var removeTabItem = function(event) {
	if (event.target.nodeName !== "INPUT") {
			menu.currentTab.removeItem(this);
	}
};
var updateItemPrice = function(event) {
	if (event.which === 13) {
		var newPrice = parseFloat(event.target.value);
		if (Number.isNaN(newPrice)) {
			event.target.value = parseFloat(menu.currentTab.items[this.parentNode.parentNode.tabItemIndex].price).toFixed(2);
			menu.currentTab.render();
			event.target.blur();
		} else if (typeof parseFloat(event.target.value) === "number") {
			menu.currentTab.items[this.parentNode.parentNode.tabItemIndex].price = parseFloat(event.target.value);
			menu.currentTab.render();
			event.target.value = parseFloat(event.target.value).toFixed(2);
			event.target.blur();
		}
	}
};

function TabItem(item, tabItemIndex) {
	this.price = item.price;
	this.html = item.cloneNode(true);
	this.html.tabItemIndex = tabItemIndex;
	this.html.querySelector(".price").textContent = "";
	this.html.querySelector(".price").insertAdjacentHTML("afterbegin","$<input type='text' value=" + this.price.toFixed(2) + ">");
	this.html.addEventListener("click", removeTabItem);
	this.html.querySelector(".price input").addEventListener("keyup", updateItemPrice);
}

var menu = new Menu(document.querySelectorAll("#menu .item"));

var addToTabListener = function(event) {
	menu.addToTab(event.currentTarget);
};

for (var i = 0; i < menu.items.length; i++) {
	menu.items[i].addEventListener("click", addToTabListener);
}

menu.createTab();
document.querySelector("button#checkout").addEventListener("click", function() {
	menu.checkout();
});
