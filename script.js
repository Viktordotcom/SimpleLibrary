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
btnCloseForm.addEventListener('click', bringUpForm);

// push User Input entry to myLibrary, display the book and hide the form
btnAddBook.addEventListener('click', ()=> {
    if(checkForm()==false) {return false}
       library1.addBooktoLibrary()
        library1.displayNewBook()
       
        bringUpForm()
   
   });

class Book{

    constructor(author, title, pageNumber, read){
        this._author = author;
        this._title = title;
        this._pageNumber = pageNumber;
        this._read = read;
    }
    
}

class Library{
    myLibrary = [];

    constructor(){

    }

    addBooktoLibrary(){
        let filterChecked =''
        if(newBookRead.checked == "true" || newBookRead.checked == true){
            filterChecked = true
        }
        else if(newBookRead.checked == "false"){
             filterChecked = false
        }
        
        let book = new Book(`${newBookAuthor.value}`, `${newBookTitle.value}`, `${newBookPages.value}`, `${filterChecked}`)
        myLibrary.push(book)
        localStorage.setItem('library', JSON.stringify(myLibrary))
    }
        // empty the display, for each element inside the myLibrary create Div and couple of elements
        // use the data attribute witht the current index to connect the array element with the DOM element
        displayNewBook(){
        container.innerHTML = '';
        myLibrary.forEach(book =>{
        if(book == null){
            return
        }
        let newBookCard = document.createElement('div')
        let newBookAuthorDisplay = document.createElement('p')
        let newBookTitleDisplay = document.createElement('p')
        let newBookPagesDisplay = document.createElement('p')
        let btnRemoveBook = document.createElement('button')
        let btnToggleRead = document.createElement('button')
    
        newBookCard.setAttribute('data-key', `${container.dataset.index = myLibrary.indexOf(book)}`)
        newBookAuthorDisplay.textContent = `Author:` +' '+book._author
        newBookTitleDisplay.textContent = 'Title:'+' ' +book._title
        newBookPagesDisplay.textContent = 'Page Number:'+ ' ' +book._pageNumber
       
        function toggleRead(){
        if(book._read =="true" || book._read == true){
        btnToggleRead.textContent = 'Read'
        btnToggleRead.classList.add('read')
        localStorage.setItem('library', JSON.stringify(myLibrary))
       }
       else if(book._read == "false" || book._read == false){
        btnToggleRead.textContent = 'Not Read'
        btnToggleRead.classList.remove('read')
        localStorage.setItem('library', JSON.stringify(myLibrary))
       }
        };
        toggleRead()
        btnRemoveBook.setAttribute('class', 'btn-remove');
       btnRemoveBook.textContent = 'Remove'
        
    
        btnRemoveBook.addEventListener('click', (e)=>{
            delete myLibrary[e.target.parentElement.dataset.key]
                  container.removeChild(e.target.parentElement)
                  localStorage.setItem('library', JSON.stringify(myLibrary))
        });
    
        btnToggleRead.addEventListener('click', (e)=>{
            
            myLibrary[e.target.parentElement.dataset.key]._read = !myLibrary[e.target.parentElement.dataset.key]._read 
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

}
let library1 = new Library()

function bringUpForm(){
    formInput.classList.toggle('visible')
    newBookAuthor.value = '';
    newBookPages.value = '';
    newBookTitle.value = '';
    };




 function checkForm(){
    if(newBookAuthor.value == ''){
        return false
    }
    else if(newBookTitle.value == '') {
        return false
    }
    else if(newBookPages.validity.valid == false){
        return false
    }
}

    if(localStorage.getItem('library') === null){
        myLibrary = [
            { 
            _author: 'Viktor Frankl',
            _title:'Man\'s Search for Meaning',
            _pageNumber: '200',
            _read: true,
    
        }, 
        {
            _author: 'Ryan Holiday',
            _title:'The Obstacle Is the Way',
            _pageNumber: '224',
            _read:false,
    
        },
        {
            _author: 'V.Anton Spraul',
            _title: 'Think Like a Programmer',
            _pageNumber: '256',
            _read: false,
    
        }
        ];
        library1.displayNewBook()
    }
    else {
        
       let library = JSON.parse(localStorage.getItem('library'))
        myLibrary = library;
        library1.displayNewBook()
    }