const pages = [
    {
    id:"p01",
    name:"Home",
    url:"./pages/home.html",
    }
];

function openPage(url){
    const iframe = document.getElementById("pages");

    if(!iframe) return alert("ERRO!");

    iframe.src = url || '';
}

document.getElementById("home").addEventListener("click", () => {
    
})