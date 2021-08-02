const formInput = document.querySelector('form');
const container = document.getElementById('container');
const btnOpenForm = document.getElementById('btn-openForm');
const btnAddBook = document.getElementById('btn-addBook');
const btnCloseForm =  document.getElementById('btn-closeForm');
let newBookAuthor = document.getElementById('book-author')
let newBookTitle = document.getElementById('book-title')
let newBookPages = document.getElementById('book-pages')
let newBookRead =  document.getElementById('check-read')



btnOpenForm.addEventListener('click', bringUpForm);
btnCloseForm.addEventListener('click', bringUpForm)

// push User Input entry to myLibrary, display the book and hide the form
 btnAddBook.addEventListener('click', ()=> {
 if(checkForm()==false) {return false}
    addBooktoLibrary()
    displayNewBook()
    
     bringUpForm()

});

let myLibrary = [
    { 
        author: 'Viktor Frankl',
        title:'Man\'s Search for Meaning',
        pageNumber: '200',
        read: false,

    }, 
    {
        author: 'Ryan Holiday',
        title:'The Obstacle Is the Way',
        pageNumber: '224',
        read:false,

    },
    {
        author: 'V.Anton Spraul',
        title: 'Think Like a Programmer',
        pageNumber: '256',
        read: false,

    }
    ];


function Book(author, title, pageNumber, read){
this.author = author
this.title = title
this.pageNumber = pageNumber
this.read = read
};



function addBooktoLibrary(){
let filterChecked =''
if(newBookRead.checked == "true" || newBookRead.checked == true){
    filterChecked = true
}
else if(newBookRead.checked == "false"){
     filterChecked = false
}

let book = new Book(`${newBookAuthor.value}`, `${newBookTitle.value}`, `${newBookPages.value}`, `${filterChecked}`)
myLibrary.push(book)
};

function bringUpForm(){
formInput.classList.toggle('visible')
newBookAuthor.value = '';
newBookPages.value = '';
newBookTitle.value = '';
};

// empty the display, for each element inside the myLibrary create Div and couple of elements
// use the data attribute witht the current index to connect the array element with the DOM element
function displayNewBook(){
    container.innerHTML = '';
myLibrary.forEach(book =>{
    // previous logic +
    // + books = container.innerHTML += `<div data-key=${container.dataset.index = myLibrary.indexOf(book)}>` + '<p><strong>Book Author: </strong>' + book.author + '<p><strong>Book Title: </strong> ' + book.title + '<p><strong> Number of pages: </strong>' + book.pageNumber + '<br>' + '<button class=btn-remove>Remove Book' + '<button class=btn-toggle>Not Read'
    let newBookCard = document.createElement('div')
    let newBookAuthorDisplay = document.createElement('p')
    let newBookTitleDisplay = document.createElement('p')
    let newBookPagesDisplay = document.createElement('p')
    let btnRemoveBook = document.createElement('button')
    let btnToggleRead = document.createElement('button')

    newBookCard.setAttribute('data-key', `${container.dataset.index = myLibrary.indexOf(book)}`)
    newBookAuthorDisplay.textContent = `Author:` +' '+book.author
    newBookTitleDisplay.textContent = 'Title:'+' ' +book.title
    newBookPagesDisplay.textContent = 'Page Number:'+ ' ' +book.pageNumber
   
    function toggleRead(){
    if(book.read =="true" || book.read == true){
    btnToggleRead.textContent = 'Read'
    btnToggleRead.classList.add('read')
   }
   else if(book.read == "false" || book.read == false){
    btnToggleRead.textContent = 'Not Read'
    btnToggleRead.classList.remove('read')
   }
    };
    toggleRead()
    btnRemoveBook.setAttribute('class', 'btn-remove');
   btnRemoveBook.textContent = 'Remove'
    

    btnRemoveBook.addEventListener('click', (e)=>{
        delete myLibrary[e.target.parentElement.dataset.key]
              container.removeChild(e.target.parentElement)
    });

    btnToggleRead.addEventListener('click', (e)=>{
        
        myLibrary[e.target.parentElement.dataset.key].read = !myLibrary[e.target.parentElement.dataset.key].read 
        toggleRead()
    });
    
    newBookCard.appendChild(newBookAuthorDisplay)
    newBookCard.appendChild(newBookTitleDisplay)
    newBookCard.appendChild(newBookPagesDisplay)
    newBookCard.appendChild(btnRemoveBook)
    newBookCard.appendChild(btnToggleRead)
    container.appendChild(newBookCard)

 });
 };
function checkForm(){
    if(newBookAuthor.value == ''){
        return false
    }
    else if(newBookTitle.value == '') {
        return false
    }
    else if(newBookPages.value == ''){
        return false
    }
}

displayNewBook();