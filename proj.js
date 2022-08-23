let myleads=[]
const inputEl = document.getElementById("input-el")
const btn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabbtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))
if (leadsFromLocalStorage){
    myleads=leadsFromLocalStorage
    render(myleads)
}


tabbtn.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    myleads.push(tabs[0].url)
    localStorage.setItem("myleads",JSON.stringify(myleads))
    render(myleads)
    console.log(localStorage.getItem("myleads"))
    })
})
function render(leads){
    let listItems = ""
    for(let i=0; i<leads.length; i++){
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}' >
                    ${leads[i]} 
                </a>
            </li>
        `   
    }
    ulEl.innerHTML = listItems
}


deleteBtn.addEventListener("dblclick",function(){
    myleads=[]
    console.log(myleads)
    localStorage.clear()
    render(myleads)
})


btn.addEventListener("click",function(){
    myleads.push(inputEl.value)
    inputEl.value=" "
    localStorage.setItem("myleads",JSON.stringify(myleads))
    render(myleads)
    console.log(localStorage.getItem("myleads"))
})

