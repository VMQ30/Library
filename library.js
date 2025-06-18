
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

let removeBookButton = document.querySelectorAll(".remove-book");

let bookList = JSON.parse(localStorage.getItem("bookList")) || [];
let bookListLength = bookList.length;

openAndCloseModal();
getBookInfo();
addBookCard();


console.log(bookList);

function removeBook(){
    removeBookButton.addEventListener("click", () =>{
        
    })
}
function openAndCloseModal(){
    openModal.addEventListener("click", () =>{
    modal.classList.remove("hidden");
    })
    closeModal.addEventListener("click", () =>{
        modal.classList.add("hidden");
    });

    outisdeModal.addEventListener("click", ()=>{
        modal.classList.add("hidden");
    });
    modalBox.addEventListener("click", ()=>{
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
    for(let i = 0; i<bookListLength; i++){
        let title = bookList[i].title;
        let author = bookList[i].author;
        let numberOfPages = bookList[i].numberOfPages;
        let status = bookList.status;
        let dateAdded = new Date().toLocaleString('en-GB', {year: 'numeric', month: 'numeric', day: 'numeric'});

        let book = document.createElement("div");
        book.classList.add("card");
        book.innerHTML = `
            <div class = "card">
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
            </div>
        `;

        cardGrid.appendChild(book);
    }
}

