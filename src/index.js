//Fectch the quotes from the RESTful data source
document.addEventListener('DOMContentLoaded', ()=> {
  renderQuotes()
  newQuote()
})
function renderQuotes() {
  /* Manipulates the DOM to meet the DOM requirementes and renders the Quotes JSON
  file. Also, it includes event listeners for Like and Delete buttons */
  document.getElementById('new-quote').value = ''
  document.getElementById('author').value = ''
  document.querySelector('ul').innerHTML = ''
  fetch('http://localhost:3000/quotes?_embed=likes')
    .then(resp => resp.json())
    .then(quotes => {
      for (i=0; i<= quotes.length-1; i++) {
        document.querySelector('#quote-list').appendChild(document.createElement('li')).className = 'quote-card'
        document.querySelectorAll('li')[i].appendChild(document.createElement('blockquote')).className = 'blockquote'
        document.querySelectorAll('blockquote')[i].textContent = quotes[i].author
        document.querySelectorAll('blockquote')[i].appendChild(document.createElement('p')).className = 'mb-0'
        document.querySelectorAll('.mb-0')[i].textContent = quotes[i].quote
        document.querySelectorAll('blockquote')[i].appendChild(document.createElement('br'))
        document.querySelectorAll('blockquote')[i].appendChild(document.createElement('button')).className = 'btn-success'
        document.querySelectorAll('.btn-success')[i].textContent = 'Likes: '
        document.querySelectorAll('.btn-success')[i].appendChild(document.createElement('span')).textContent = quotes[i].likes.length
        document.querySelectorAll('blockquote')[i].appendChild(document.createElement('button')).className = 'btn-danger'
        document.querySelectorAll('.btn-danger')[i].textContent = 'Delete'
      }
      deleteQuote(quotes)
      likeQuote(quotes)
    })
}
function newQuote() {
  /*Adds event listener to the form with prevent default and sends a POST request 
  to add the new quote to the Quotes JSON file, finally it renders the Quotes JSON file 
  back to the DOM*/
  const form = document.getElementById('new-quote-form')
  
  form.addEventListener('submit', (event)=> {
    event.preventDefault()
    const formData = {
      quote: document.getElementById('new-quote').value,
      author: document.getElementById('author').value 
    }
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch('http://localhost:3000/quotes', configObj)
    renderQuotes()
  })
}
function deleteQuote(quotes) {
  /*Adds event listener to the delete buttons and sends a DELETE request 
  to remove the selected quote from the Quotes JSON file, finally it renders the Quotes JSON 
  file back to the DOM*/
  const deleteBtns = document.querySelectorAll('.btn-danger')
  for (let i =0; i<deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', ()=>{
      fetch(`http://localhost:3000/quotes/${quotes[i].id}?_embed=likes`,{
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      })
      renderQuotes()
    })
  }
}
function likeQuote(quotes) {
  /*Adds event listener to the like buttons and sends a POST request 
  to add the new like record to the Quotes JSON file, finally it renders the Quotes JSON 
  file back to the DOM*/
  const likeBtns = document.querySelectorAll('.btn-success')
  for (let i =0; i<likeBtns.length; i++) {
    likeBtns[i].addEventListener('click', ()=>{

      const formData = {
        quoteId: quotes[i].id,
        createdAt: Math.round(Date.now()/1000) 
      }
      const configObj = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      }
      fetch(`http://localhost:3000/likes/`,configObj)
      renderQuotes()
    })
  }
}

//HOW DO I KNOW THAT THE WEBPAGE IS NOT REFRESHING????????????
//HOW CAN I STAY AT THE SAME POSITION AFTER FETCHING. IT'S GOING TO THE TOP PAGE