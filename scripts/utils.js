//Cards
function cloneTemplate(template) {
  return template.content.cloneNode(true);
}

function addCardToList(list, card) {
  const item = document.createElement("li");
  item.appendChild(card);
  list.appendChild(item);
}

//Search
function setupSearch(inputs, data, searchFields, onSearch) {
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const searchTerm = input.value.toLowerCase().trim();

      const filteredData = data.filter((item) =>
        searchFields.some((field) =>
          item[field]?.toLowerCase().includes(searchTerm),
        ),
      );

      onSearch(filteredData);
    });
  });
}

//loadData - JSON
async function loadData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No s'han pogut carregar les dades");
  }

  const data = await response.json();
  return data;
}

function updateActiveButtons(buttons, isActiveFn) {
  buttons.forEach((button) => {
    button.classList.toggle("active", isActiveFn(button));
  });
}

//Loading, error, empty
function setLoadingState(lists, message) {
  lists.forEach((list) => {
    list.innerHTML = `<li class="list-state list-state--loading">${message}</li>`;
  });
}

function setErrorState(lists, message) {
  lists.forEach((list) => {
    list.innerHTML = `<li class="list-state list-state--error">${message}</li>`;
  });
}

function setEmptyState(lists, message) {
  lists.forEach((list) => {
    list.innerHTML = `<li class="list-state list-state--empty">${message}</li>`;
  });
}
