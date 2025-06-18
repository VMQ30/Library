
let modal = document.querySelector(".modal-screen");
let outisdeModal = document.querySelector(".modal-screen");
let modalBox = document.querySelector(".modal");
let openModal = document.getElementById("add-book");
let addBookButton = document.querySelector(".submit");
let closeModal = document.getElementById("close");

let bookText = document.getElementById("book-title");
let authorText = document.getElementById("author");
let numPagesText = document.getElementById("num-pages");
let statusText = document.getElementById("status");

let cardGrid = document.querySelector(".card-grid");

let bookList = JSON.parse(localStorage.getItem("bookList")) || [];

openAndCloseModal();
getBookInfo();
addBookCard();
removeBook();

console.log(bookList);

function removeBook(){
    let removeBookButton = document.querySelectorAll(".remove-book");
    removeBookButton.forEach ((remove) =>{
        remove.addEventListener("click", (event)=>{
            let book = event.target.closest(".card");
            let index = parseInt(book.getAttribute("data-index"));

            bookList.splice(index, 1);
            localStorage.setItem("bookList", JSON.stringify(bookList));
            addBookCard();
            removeBook()
        })
    })
}
function openAndCloseModal(){
    openModal.addEventListener("click", () =>{
    modal.classList.add("hidden");
    })
    closeModal.addEventListener("click", () =>{
        modal.classList.remove("hidden");
    });

    outisdeModal.addEventListener("click", ()=>{
        modal.classList.remove("hidden");
    });
    modalBox.addEventListener("click", (event)=>{
        event.stopPropagation();
    })
}

function getBookInfo(){
    addBookButton.addEventListener("click", () =>{
        let bookTitle = bookText.value;
        let bookAuthor = authorText.value;
        let numOfPages = numPagesText.value;
        let readingStatus = statusText.value;

        let book = new Book(bookTitle, bookAuthor, numOfPages, readingStatus);
        bookList.push(book);

        localStorage.setItem("bookList", JSON.stringify(bookList));
        console.log(bookList);
    })
}

function Book(title, author, numberOfPages, status){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.status = status;
}

function addBookCard(){
    cardGrid.innerHTML = "";
    let bookListLength = bookList.length;
    cardGrid.innerHTML = "";
    for(let i = 0; i<bookListLength; i++){
        let title = bookList[i].title;
        let author = bookList[i].author;
        let numberOfPages = bookList[i].numberOfPages;
        let status = bookList[i].status;
        let dateAdded = new Date().toLocaleString('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric'});

        let book = document.createElement("div");
        book.classList.add("card");
        book.innerHTML = `
                <div class = "card-header">
                    <div>
                        <h3>${title}</h3>
                        <p>${author}</p>
                    </div>
                    <div class = read-status>${status}</div>
                </div>

                <div class = 'card-info'>
                    <p>${numberOfPages}</p>
                    <p>${dateAdded}</p>
                </div>

                <div class = 'card-button'>
                    <button class = "change-status">Mark Unread</button>
                    <button class = "remove-book">Remove</button>
                </div>
        `;
        book.setAttribute("data-index", [i]);
        cardGrid.appendChild(book);
    }
}
        


