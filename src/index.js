const BASE_URL = "http://localhost:3000/quotes?_embed=likes/"
const quotesUrl = "http://localhost:3000/quotes/"
const likeUrl = "http://localhost:3000/likes/"
let newLike = 0

document.addEventListener("DOMContentLoaded", (e) =>{
    console.log('Live, learn, laugh!')

    fetchQuotes()
    addQuote()
});

function fetchQuotes() {
    fetch(BASE_URL)
    .then( resp => resp.json() )
    .then( quotesList => {renderQuotes(quotesList)})
}

function renderQuotes(quotes) {
    quotes.forEach(quote => { displayAQuote(quote)});
}

{/* <li class='quote-card'>
  <blockquote class="blockquote">
    <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
    <footer class="blockquote-footer">Someone famous</footer>
    <br>
    <button class='btn-success'>Likes: <span>0</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>
</li> */}

function displayAQuote(quote) {
    let ul = document.getElementById('quote-list')

    let li = document.createElement('li')
    li.className = 'quote-card'
    

    let blockquote = document.createElement('blockquote')
    blockquote.className = "blockquote"

    let p = document.createElement('p')
    p.className = "mb-0"
    p.innerText = quote.quote

    let footer = document.createElement('footer')
    footer.className = "blockquote-footer"
    footer.innerText = quote.author

    let br = document.createElement('br')

    let likeBtn = document.createElement('button')
    likeBtn.className = 'btn-success'
    likeBtn.innerText = "Likes: "
    likeBtn.dataset.quoteId = quote.id
    let spanLike = document.createElement('span')
    spanLike.innerText = newLike
    likeBtn.appendChild(spanLike)

    likeBtn.addEventListener("click", (e) => {
        likeQuote()  
})

    let deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-danger'
    deleteBtn.innerText = "Delete"

    deleteBtn.addEventListener('click', (e) => {
        fetch(quotesUrl + quote.id, {
            method: "DELETE"
        })
        .then(resp => resp.json() )
        .then(li.remove() )
    })




    ul.appendChild(li)
    li.append(blockquote)
    blockquote.append(p, footer, br, likeBtn, deleteBtn)
}
function likeQuote(quote) {
        debugger
    let postRequest = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            quoteId: quote.id
        })
}
fetch(likeUrl, postRequest)
.then(resp => resp.json() )
.then(spanLike.innerText = ++newLike)

}
function addQuote() {
    let form = document.getElementById('new-quote-form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let quote = e.target[0].value
        let author = e.target[1].value

        let postRequest = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({quote, author})
        }

        fetch(quotesUrl, postRequest)
        .then( resp => resp.json() )
        .then(newquote => {displayAQuote(newquote)})
        
        form.reset()
    })
}