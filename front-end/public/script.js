function loadEvent() {  

    console.log("frontend loaded")
    
    const rootElement = document.getElementById("root");
    
    rootElement.insertAdjacentHTML("beforeend", `
    <form>
        <input type="text" placeholder="First name" class="input" name="firstname"/>
        <input type="text" placeholder="Last name" class="input" name="lastname"/>
        <input type="email" placeholder="Email address" class="input" name="email"/>
        <textarea placeholder="message" class="input" name="message"></textarea>
        <button id="send" type="submit">Send</button>
    </form>    
    `)

    function postToClick(e) {
        e.preventDefault();
        
        const inputs = e.target.querySelectorAll(".input"), values = {};

        for (const input of inputs) {

            values[`${input.name}`] = input.value;
        }
        
//        console.log(values);
        const fd = new FormData();
        fd.append("json", JSON.stringify(values)); //need this because our goal is to append a file to this as well ultimately

        fetch('/', {
                method: 'Post',
                headers: {
                    //'Content-Type': 'application/json'
                    'Content-Type': 'application/x-www-form-urlencoded'
                    //'Content-Type': 'multipart/form-data'
                },
                //body: fd
                body: JSON.stringify(values)
        })
        .then(response => response.text())
        .then(data => console.log(data));
    };

    window.addEventListener("submit", postToClick);


}

window.addEventListener("load", loadEvent);