const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const btn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];
function loadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function removeSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//SHOW New Quote

function newQuote(quote) {
    loadingSpinner();


    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    //check quote length
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    //hide loeader

    quoteText.textContent = quote.text;
    removeSpinner()

}

async function getQuotes() {
    loadingSpinner();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let random = Math.floor(Math.random() * data.length);
        newQuote(data[random]);
        throw new Error("oops");

    } catch (error) {
        console.log(error)
    }

}

//Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
twitterBtn.addEventListener('click', tweetQuote);
btn.addEventListener('click', getQuotes);
getQuotes();