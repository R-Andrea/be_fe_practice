function loadEvent() {  

    console.log("frontend loaded")
    
    const rootElement = document.getElementById("root");
    
    rootElement.insertAdjacentHTML("beforeend", `
        <button id="send">GO POST</button>
    `)

    function postToClick(e) {
        fetch('/', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: "hello"
        })
        .then(response => response.text())
        .then(data => console.log(data));
    };

    document.getElementById("send").addEventListener("click", postToClick);


}

window.addEventListener("load", loadEvent);