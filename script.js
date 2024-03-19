const popup = document.getElementById("overlay");
const btn = document.getElementById("openForm");
const closeBtn = document.getElementById("closeForm");
const submitBtn = document.querySelector(".submit");
const mainContainer = document.querySelector(".book-container");
const library = [];

btn.onclick = function () {
  popup.style.display = "flex";
};

closeBtn.onclick = function () {
  popup.style.display = "none";
};

submitBtn.onclick = function (event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatus = document.getElementById("read-status").value;
  const book = new Book(title, author, pages, readStatus);
  library.push(book);
  popup.style.display = "none";
  resetForm();
  updateDisplay();
};

mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('read-status-btn')) {
    const currentStatus = event.target.textContent.trim();
    const newStatus = currentStatus === 'Read' ? 'Not Read' : 'Read';
    event.target.textContent = newStatus;
    event.target.style.backgroundColor = newStatus === 'Read' ? '#66FCF1' : 'transparent';
    event.target.style.color = newStatus === 'Read' ? '#0B0C10' : '#C5C6C7';
  }
  if (event.target.classList.contains('remove-btn')) {
    const bookDiv = event.target.closest('.book');
    const bookTitle = bookDiv.querySelector('div:nth-child(3)').textContent.trim();
    const index = library.findIndex(book => book.title === bookTitle);
    if (index !== -1) {
      library.splice(index, 1);
    }
    bookDiv.remove();
  }
});


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
}



function updateDisplay() {
  mainContainer.innerHTML = "";
  library.forEach(book => {
    const newBookDiv = document.createElement('div');
    newBookDiv.classList.add('book');
    const readStatusStyle = book.read === 'Read' ? 'style="background-color: #66FCF1; color: #0B0C10;"' : 'style="background-color: transparent; color: #C5C6C7"';
    newBookDiv.innerHTML = `
      <div>${book.pages} <em style="color: #66FCF1;">Pages</em></div>
      <br>
      <div style="color: #66FCF1;">${book.title}</div>
      <br>
      <div><em style="color: #66FCF1;">By: </em>${book.author}</div>
      <hr>
      <button class="read-status-btn generic-btn" ${readStatusStyle}>${book.read}</button>
      <button class="remove-btn generic-btn">Remove</button>
    `;
    mainContainer.appendChild(newBookDiv);
  });
}
