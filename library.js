
let modal = document.querySelector(".modal-screen");
let outisdeModal = document.querySelector(".modal-screen");
let modalBox = document.querySelector(".modal");
let openModal = document.getElementById("add-book");
let closeModal = document.getElementById("close");

let bookText = document.getElementById("book-title");
let authorText = document.getElementById("author");
let numPagesText = document.getElementById("num-pages");
let statusText = document.getElementById("status");

let addBookButton = document.querySelector(".submit");
let cardGrid = document.querySelector(".card-grid");

let bookList = JSON.parse(localStorage.getItem("bookList")) || [];

openAndCloseModal();
getBookInfo();
addBookCard();
removeBook();
filterClick();
filterBooksBySearchbar();

console.log(bookList);

//functions

function removeBook(){
    let removeBookButton = document.querySelectorAll(".remove-book");
    removeBookButton.forEach ((remove) =>{
        remove.addEventListener("click", (event)=>{
            let confirmMessage = "Are you Sure you Want to Delete this Book?"
            if(confirm(confirmMessage) == true){
                let book = event.target.closest(".card");
                let index = parseInt(book.getAttribute("data-index"));

                bookList.splice(index, 1);
                localStorage.setItem("bookList", JSON.stringify(bookList));
                addBookCard();
                removeBook()
            }
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

        if(!bookText || !bookAuthor || !numOfPages || !readingStatus){
            alert("Please Fill Out the Necessary Fields First");
            return;
        }
        let book = new Book(bookTitle, bookAuthor, numOfPages, readingStatus);
        bookList.push(book);

        localStorage.setItem("bookList", JSON.stringify(bookList));
        console.log(bookList);
        addBookCard();
    });
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
                    <button class = "change-status"></button>
                    <button class = "remove-book">Remove</button>
                </div>
        `;

        book.setAttribute("data-index", [i]);
        cardGrid.appendChild(book);
        styleStatus();
        changeStatusButton();
    }
}

function filterBooksBySearchbar(){
    let search = document.getElementById("search-bar");

    search.addEventListener("input", () =>{
        let searchText = search.value.toLowerCase().trim();
        let card = document.querySelectorAll(".card");

        card.forEach((card) =>{
            let title = card.querySelector("h3").textContent.toLowerCase().trim();
            let author = card.querySelector(".card-header p").textContent.toLowerCase().trim();

            if(title.includes(searchText) || author.includes(searchText)){
                card.style.display = "block";
            }

            else{
                card.style.display = "none";
            }
        })
    })
}

function filterClick(){
    let filterStatus = document.getElementById("select-status");
    filterStatus.addEventListener("change", ()=>{
        filterBooksByStatus();
    })
}

function filterBooksByStatus(){
    let card = document.querySelectorAll(".card");
    let filterStatus = document.getElementById("select-status");
    card.forEach((card) =>{
        let status = card.querySelector(".read-status");

        let statusText = status.textContent;
        let filterText = filterStatus.value;
        if (statusText == filterText || filterText == "All Books"){
            console.log(filterText);
            card.style.display = "block";
        }
        else if(statusText != filterText){
            card.style.display = "none";
        }

    })
}
function changeStatusButton(){
    let card = document.querySelectorAll(".card");
    card.forEach((card) =>{
        let status = card.querySelector(".read-status");
        let changeButton = card.querySelector(".change-status");

        if(status.textContent == "Read"){
            changeButton.textContent = "Mark Unread";
        }
        if(status.textContent == "Not Read"){
            changeButton.textContent = "Mark Read";
        }
    })
}
function styleStatus(){
    let statusDiv = document.querySelectorAll(".read-status");
    statusDiv.forEach( (stat) =>{
        let statusText = stat.textContent;

        if(statusText == "Read"){
            stat.style.backgroundColor = "#deffe6";
            stat.style.borderColor = "#93dba4";
            stat.style.color = "#52a866";
        }

        if(statusText == "Not Read"){
            stat.style.backgroundColor = "#faaaaa";
            stat.style.borderColor ="#db6969";
            stat.style.color = "#b53333";
        }

    });
}


