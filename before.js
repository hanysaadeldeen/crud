let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let tbody = document.getElementById("tbody")

function getTotal() {
    if (price.value != "" || price.value === 1) {
        let sumition = (+price.value + +taxes.value + +ads.value - +discount.value)
        total.innerHTML = sumition
        total.style.background = "green"
    } else if (price.value === "") {
        total.innerHTML = ""
        total.style.background = "red"
    }
}
let mood = "createe"
let temp

let basket = JSON.parse(localStorage.getItem("products")) || []
create()
submit.onclick = () => {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    if (title.value !== "" && price.value !== "") {
        if (mood === "createe") {
            if (count.value > 1) {
                for (let i = 0; i < count.value; i++) {
                    basket.push(newpro)
                }
            } else {
                basket.push(newpro)
            }
        } else {
            basket[temp] = newpro
            mood = "create"
            submit.innerHTML = "create"
            count.style.display = "block"
        }
        localStorage.setItem("products", JSON.stringify(basket))
    }
    create()
}

function create() {

    tbody.innerHTML = ""
    for (let i = 0; i < basket.length; i++) {
        tbody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${basket[i].title}</td>
            <td>${basket[i].price}</td>
            <td>${basket[i].taxes} </td>
            <td>${basket[i].ads}</td>
            <td>${basket[i].discount}</td>
            <td>${basket[i].total}</td>
            <td>${basket[i].category}</td>
            <td><button id="update" onclick="update(${i})">update</button></td>
            <td><button id="dalete" onclick="clearone(${i})">dalete</button></td>
        </tr>
    `
    } if (basket.length > 0) {
        deleteall.innerHTML = `
            <button > Delete All (${basket.length})</button>
        `
    } else {
        deleteall.innerHTML = ""
    }
    cleardata()
    getTotal()

}

function cleardata() {
    title.value = "",
        price.value = "",
        taxes.value = "",
        ads.value = "",
        discount.value = "",
        count.value = "",
        category.value = "",
        total.innerHTML = ""
}

function clearAll() {
    // basket.splice(0)
    basket = []
    localStorage.clear()
    create()
}

function clearone(i) {
    basket.splice(i, 1)
    localStorage.products = JSON.stringify(basket)
    create()
}

function update(i) {
    title.value = basket[i].title,
        price.value = basket[i].price,
        taxes.value = basket[i].taxes,
        ads.value = basket[i].ads,
        discount.value = basket[i].discount,
        count.value = basket[i].count,
        category.value = basket[i].category,
        total.innerHTML = basket[i].total
    count.style.display = "none"
    submit.innerHTML = "update"
    mood = "update"
    temp = i
}


let searchMood = "title"
function getsearch(id) {
    let Search = document.getElementById("search")
    if (id === "SearchBytitle") {
        searchMood = "title"
    } else if (id === "SearchByCategory") {
        searchMood = "Category"
        console.log("try convetr");
    }
    Search.placeholder = `search By ${searchMood}`
    Search.focus()
    Search.value = ""
    create()
}

function getworld(world) {

    tbody.innerHTML = ""
    for (let i = 0; i < basket.length; i++) {
        if (searchMood == "title") {
            if (basket[i].title.includes(world.toLowerCase())) {
                tbody.innerHTML += `
                        <tr>
                            <td>${i}</td>
                            <td>${basket[i].title}</td>
                            <td>${basket[i].price}</td>
                            <td>${basket[i].taxes} </td>
                            <td>${basket[i].ads}</td>
                            <td>${basket[i].discount}</td>
                            <td>${basket[i].total}</td>
                            <td>${basket[i].category}</td>
                            <td><button id="update" onclick="update(${i})">update</button></td>
                            <td><button id="dalete" onclick="clearone(${i})">dalete</button></td>
                        </tr>
                    `
                console.log(basket[i].length);
            }
        }
        else if (searchMood == "Category") {
            tbody.innerHTML = ""
            for (let i = 0; i < basket.length; i++) {
                if (basket[i].category.includes(world.toLowerCase())) {
                    tbody.innerHTML += `
                    <tr>
                        <td>${i}</td>
                        <td>${basket[i].title}</td>
                        <td>${basket[i].price}</td>
                        <td>${basket[i].taxes} </td>
                        <td>${basket[i].ads}</td>
                        <td>${basket[i].discount}</td>
                        <td>${basket[i].total}</td>
                        <td>${basket[i].category}</td>
                        <td><button id="update" onclick="update(${i})">update</button></td>
                        <td><button id="dalete" onclick="clearone(${i})">dalete</button></td>
                    </tr>
                `
                }
            }
        }
    }

}
