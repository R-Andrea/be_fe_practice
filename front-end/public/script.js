function loadEvent() {  

    console.log("frontend loaded")
    
    const rootElement = document.getElementById("root");
    
    rootElement.insertAdjacentHTML("beforeend", `
    <form>
        <div id="input-container">
            <p>Please provide your details</p>
            <input type="text"  placeholder="First name" class="input gradient-border " name="firstname"/>
            <input type="text" placeholder="Last name" class="input" name="lastname"/>
            <input type="email" placeholder="Email address" class="input" name="email"/>
            <textarea placeholder="Your message" class="input" name="message"></textarea>
        </div>
        <div id="file-container">
            <p class="title">You can add your files here</p>
            <div id="drop-region" class="effect-8">
            <p id="ready" hidden>Files are ready to upload</p>
            </div>
            <span class="focus-border">
            <i></i>
            </span>
            
        </div>
        <button id="send" type="submit">Send</button>
    </form>    
    `)

    const dropRegion = document.getElementById("drop-region");

    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function handleDrop(e) {
    
        console.log("handle drop")
        var data = e.dataTransfer;
        var files = data.files;
     
        handleFiles(files)      
    }
    const userFiles = [];

    function handleFiles(files) {
        
        for (var i = 0;  i < files.length; i++) {         
            userFiles.push(files[i]);
            dropRegion.insertAdjacentHTML("beforeend", `<p class="filenames">${files[i].name}</p>`)
        }
        document.getElementById("ready").hidden = false;
    }


    const fakeInput = document.createElement("input");
    fakeInput.type = "file";
    //fakeInput.accept = "image/*";
    fakeInput.multiple = true;
    fakeInput.id = "fake-input";
    fakeInput.hidden = true;
    fakeInput.name = "userFile";

    dropRegion.insertAdjacentElement("beforeend", fakeInput)
    
    dropRegion.addEventListener('click', function() {
        fakeInput.click();
    });

    fakeInput.addEventListener("change", function() {
        let files = fakeInput.files;
        handleFiles(files);
    });

    dropRegion.addEventListener('dragenter', preventDefault, false);
    dropRegion.addEventListener('dragleave', preventDefault, false);
    dropRegion.addEventListener('dragover', preventDefault, false);
    dropRegion.addEventListener('drop', preventDefault, false);
    dropRegion.addEventListener('drop', handleDrop, false);

    function postToClick(e) {
        e.preventDefault();
        
        const inputs = e.target.querySelectorAll(".input"), values = {};
       
        console.log(typeof(inputs))
        for (const input of inputs) {
            values[`${input.name}`] = input.value;
        }
        
        console.log(typeof(values));
        console.log(userFiles);
        const fd = new FormData();
        fd.append("userJson", JSON.stringify(values));

        for (let file of userFiles) {
            fd.append('userFile', file, file.name);

        }
     
        fetch('/', {
                method: 'Post',
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // },
                body: fd

        })
        .then(response => response.text())
        .then(data => console.log(data))
    };

    window.addEventListener("submit", postToClick);

}

window.addEventListener("load", loadEvent);