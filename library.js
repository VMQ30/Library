let closeModal = document.getElementById("close");
let modal = document.querySelector(".modal-screen");
let openModal = document.getElementById("add-book");

openModal.addEventListener("click", () =>{
    modal.classList.remove("hidden");
})
closeModal.addEventListener("click", () =>{
    modal.classList.add("hidden");
});