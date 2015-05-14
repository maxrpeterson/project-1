function Item(item) {
	this.name = item.querySelector(".item-name").textContent;
	if (item.querySelector(".price").textContent.charAt(0) === "$") {
		this.price = parseFloat(item.querySelector(".price").textContent.slice(1));
	} else if (typeof parseFloat(item.querySelector(".price").textContent) === "number") {
		this.price = parseFloat(item.querySelector(".price").textContent);
	}
};
function Menu(items) {
	this.items = items;
};



var menu = new Menu($("#menu .item"));


function Tab() {
	this.items = [];
};
