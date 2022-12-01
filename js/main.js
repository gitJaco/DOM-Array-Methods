//Grab DOM elements

const main = document.getElementById("main")
const addUser = document.getElementById("add-user")
const double = document.getElementById("double")
const showMillionaires = document.getElementById("show-millionaires")
const sort = document.getElementById("sort")
const calculateWealth = document.getElementById("calculate-wealth")

let data = []

getRandomUser()
getRandomUser()
getRandomUser()



//fetch random user and add money

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
      
    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser)
}

// Function double

function doubleMoney() {
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    })
    updateDOM()
}

//Sort users by richest

function sortByRichest() {
    data.sort((a, b) => b.money - a.money)

    updateDOM()
}

//Filter millionaires

function filterMillionaires() {
     data = data.filter(user => user.money >= 1000000)
    updateDOM()
}

//Calculate wealth with reduce

function calcWealth() {
    const total = data.reduce((acc, user) => (acc + user.money), 0)
        
    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth <strong> ${formatMoney(total)}</strong></h3>`

    main.appendChild(wealthEl)
}

//Add new obj to data arr

function addData(obj) {
   data.push(obj)
   updateDOM()
}

//Update DOM

function updateDOM(providedData = data) {
     //Clear main div
     main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

     providedData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`
        main.appendChild(element)
     })
}

// Format number as money

function formatMoney(number) {
   return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

//Event Listener

addUser.addEventListener("click", getRandomUser)
double.addEventListener("click", doubleMoney)
sort.addEventListener("click", sortByRichest)
showMillionaires.addEventListener("click", filterMillionaires)
calculateWealth.addEventListener("click", calcWealth)

