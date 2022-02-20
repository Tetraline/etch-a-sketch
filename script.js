let penColor = "red";

function buildHeader(size) {
  grid = document.getElementById("header");

  for (let i = 0; i < size; i++) {
    div = document.createElement("div");
    div.classList.add("headerCell");
    div.style.backgroundColor = randomColor();
    grid.appendChild(div);
  }
}

function buildGrid(size) {
  grid = document.getElementById("grid");
  // First make sure there are no pre-existing cells
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }
  // Now build the new grid
  let gridSize = 700;
  let cellSize = gridSize / size;
  document.documentElement.style.setProperty("--cell-size", `${cellSize}px`);
  document.documentElement.style.setProperty(
    "--grid-size",
    `${gridSize + 4.1}px`
  );

  for (let i = 0; i < size ** 2; i++) {
    div = document.createElement("div");
    div.classList.add("cell");

    div.addEventListener("mouseover", function (e) {
      e.target.style.background = penColor;
    });
    grid.appendChild(div);
  }
}

function randomColor() {
  let a = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  let c = Math.floor(Math.random() * 255);
  return `rgb(${a},${b},${c})`;
}

function clearPenSelection() {
  tools = document.getElementById("pen-tools");
  for (tool of tools.childNodes) {
    tool.classList.remove("selected");
  }
}

function clearSizeSelection() {
  tools = document.getElementById("size-tools");
  for (tool of tools.childNodes) {
    tool.classList.remove("selected");
  }
}

function buildPenTools(colors) {
  tools = document.getElementById("pen-tools");
  div = document.createElement("div");
  div.innerHTML = "<p>Pen</p> <p>Color</p>";
  div.classList.add("circle");
  div.classList.add("key");
  tools.appendChild(div);
  for (color of colors) {
    div = document.createElement("div");
    div.classList.add("circle");
    div.setAttribute("id", color);
    div.style.backgroundColor = color;
    div.addEventListener("click", function (e) {
      clearPenSelection();
      e.explicitOriginalTarget.classList.add("selected");
      penColor = e.explicitOriginalTarget.id;
    });
    tools.appendChild(div);
  }
}

function buildSizeTools(sizes) {
  tools = document.getElementById("size-tools");
  div = document.createElement("div");
  div.innerHTML = "<p>Cells/</p> <p>Side</p>";
  div.classList.add("circle");
  div.classList.add("key");
  tools.appendChild(div);
  for (size of sizes) {
    div = document.createElement("div");
    div.textContent = size;
    div.classList.add("circle");
    div.setAttribute("id", size);
    div.style.backgroundColor = "grey";
    div.addEventListener("click", function (e) {
      clearSizeSelection();
      e.explicitOriginalTarget.classList.add("selected");
      buildGrid(e.explicitOriginalTarget.id);
    });
    tools.appendChild(div);
  }
}

buildHeader(35);
buildPenTools(["red", "green", "blue", "fuchsia", "orange"]);
buildSizeTools([7, 8, 9, 10, 100]);
document.getElementById("red").click();
document.getElementById("7").click();
