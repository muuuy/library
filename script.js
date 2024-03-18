let myLibrary = [];

const btn = document.querySelector(".add-button");
const bookForm = document.querySelector("form");

function Books(title, author, pages, checkRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = checkRead;


    this.checkRead = () => {
        if(this.read) {
            return "Read"
        }
        return "Not Read Yet"
    }
    this.info = () => {
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.checkRead()}`);
    }
}

//SHOW FORM
btn.addEventListener("click", () => {
    bookForm.classList.add("active");
})

//ADD A BOOK TO THE LIBRARY
function addBookToLibrary(toAdd) {
    myLibrary.push(toAdd);
}

//SUBMIT FORM
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let author = document.querySelector("#author")
    let title = document.querySelector("#title")
    let numPages = document.querySelector("#num-pages")
    let read = document.querySelector("#read")

    temp = new Books(author.value, title.value, numPages.value, read.checked)
    addBookToLibrary(temp)
    createCard(temp)

    console.table(myLibrary)

    bookForm.classList.remove("active");

    author.value = ''
    title.value = ''
    numPages.value = ''
    read.checked = false
})

//CREATE A NEW CARD
const createCard = (book) => {
    display = document.querySelector(".display-books")
    newCard = document.createElement("div");
    newParagraph = document.createElement("p");
    newParagraph.innerHTML = `<span class='bold'>TITLE:</span> ${book.title}<br>
                                <span class='bold'>AUTHOR:</span> ${book.author}<br>
                                <span class='bold'>PAGES:</span> ${book.pages}<br>
                                <span class='bold'>READ:</span> ${book.checkRead()}<br>`;
    
    newCard.setAttribute("data-id", myLibrary.length - 1) //Associate card w/ index of book in library
    newCard.classList.add("book-card")
    newCard.appendChild(newParagraph); 
    display.appendChild(newCard);

    deleteText = document.createElement("p")
    deleteText.classList.add("delete-text")
    deleteText.textContent = "Delete"
    newCard.appendChild(deleteText);
}

document.querySelector(".display-books").addEventListener("click", (e) => {
    target = e.target
    if(target.classList.contains("delete-text")) {
        let j = target.parentElement.getAttribute("data-id");
        myLibrary.splice(j, 1);
        console.table(myLibrary)
        target.parentElement.remove()
    }
})