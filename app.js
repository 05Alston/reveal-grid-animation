let wrapper = document.getElementById('tiles');
let r = document.querySelector(':root');
let boxSize = 100;
let _width = document.body.clientWidth,
	_height = document.body.clientHeight,
	columns = Math.floor(_width / boxSize),
	rows = Math.floor(_height / boxSize);
let toggled = false;
let message = "Ownership is a set of rules that govern how a Rust program manages memory.";
let pxWidth = _width + "px";
let pxHeight = _height + "px";
let _left = 0,
	_top = 0;
// let box = document.querySelector('.box');
// let width = box.offsetWidth;
// let height = box.offsetHeight;
const handleOnclick = index => {
	toggled = !toggled;
	document.body.classList.toggle("toggled");
	anime({
	    targets: ".tile",
	    opacity: toggled ? 0 : 1,
	    delay: anime.stagger(50, {
	      grid: [columns, rows],
	      from: index
	    })
	});
}
const createTile = index => {
	const tile = document.createElement("div");
	tile.classList.add("tile");
	tile.onclick = e => handleOnclick(index);
	const tile_inner = document.createElement("div");
	tile_inner.classList.add("tile_inner");
	tile.appendChild(tile_inner);
	return tile;
}
const addText = () => {
	boxes = Array.from(document.getElementsByClassName("tile_inner"));
	boxes.map((tile, index)=> {
		_left = (index % columns) * tile.offsetWidth;
		if (_left == 0 && index != 0) _top += tile.offsetHeight;
		console.log(_left, _top, Math.round(_width / 2), Math.round(_height / 2));
		const tile_msg = document.createElement("p");
		tile_msg.innerHTML = message;
		tile_msg.style.position = 'absolute';
		tile_msg.style.left = `${_width / 2 - _left - 640}px`;
		tile_msg.style.top = `${_height / 2 - _top}px`;
		tile.appendChild(tile_msg);
	})
}
const createTiles = quantity => {
	Array.from(Array(quantity)).map((tile, index) => {
		wrapper.appendChild(createTile(index));
	})
}
const createGrid = () => {
	wrapper.innerHTML = "";
	_width = document.body.clientWidth;
	_height = document.body.clientHeight;
	columns = Math.floor(_width / boxSize);
	rows = Math.floor(_height / boxSize);
	_left = 0;
	_top = 140;

	wrapper.style.setProperty("--columns", columns);
	wrapper.style.setProperty("--rows", rows);
	createTiles(columns * rows);
	addText();
}

createGrid();
window.onresize = () => createGrid();