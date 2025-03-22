JSPop - JavaScript PopUp library.
<hr>
<p>
    Use JSPop for easy creating your popups. 
</p>
<h1>Fast start:</h1>

1) Add in HTML `<head>` teg:
```
<script src="https://gvinses.github.io/JSPop/library/popUp.js"></script>
```

2) Create Popup anywhere in HTML:
```
<div class="popup" id="testPopup">
    <h1>Popup</h1>
    <button id="closePopupButton">Close</button>
    <button id="secondPopupButton">Second Button</button>
</div>
``` 
2.5) Create and connect .js file to HTML after import JSPop line:
```
<script src="script.js"></script>
```

3) Edit .js file:
```
let body = document.querySelector('body')        
let popup = document.querySelector('#testPopup')

let testPopUp = new PopUp(
    {
        'origin': body,           // Origin - place, where popup will use
        'template': popup,        // PopUp HTML template
        'display': 'flex',        // Optional: atribute with choosen display for popup on page  
        'animations': {           // Optional: Your self animations for show / hide of popup on page 
            'show': 'show',  // show - appear animation of popup
            'hide': 'hide'   // hide - disappear animation on popup
        }
    },
// All objects, after first object - events of popup:
    {                                               // button (possible to use ANY html teg which parent is template of popup)
        'origin': '#closePopupButton',              // Setting teg on HTML, which will be used in event 
        'event': 'click',                           // Event of user interaction with "origin" teg 
        'func': (event) => {                        // function, what will be after event
            testPopUp.self.style.background = 'red' // Using popup.self - can iteracte with HTML popup template
            testPopUp.hide()                        // Possible to use all class methods of created Popup
        }
    },
    {                                               
        'origin': '#secondPopupButton',              
        'event': 'click',
        'func': (event) => {
            testPopUp.self.style.background = `green`
        }
    },
)

testPopUp.load()                                    // method of class to "render" every functions methods and styles (MUST BE BEFORE show popup)

document.querySelector('#show-popup').addEventListener('click', (e) => {
    testPopUp.show()                                // showing popup after clicking on the button
})
```

4) Using other css animation pack:

    1) Add `<link rel="stylesheet", href="">` whre href is a link to css file of animation pack
    2) <b>Awaited</b>, that animation pack containes .show + 'name of pack' class
        Example:
            for name: popupAnimation-flex-75rZ.css
            classes: .show-75rZ, .hide-75rZ
        If that name is wrong: view code of this animation pack and get correct names of classes
    3) Set names:
        Example:
           ```
           'animations': {
               'show': 'show-75rZ',
               'hide': 'hide-75rZ',
            }
           ```
5) Creating <b>your</b> animation pack:
    1) Create file "popupAnimation-{{type of display after your show class}}-{{small explain what in animation}}"
        Example:
            for classes, which using animation of rotate popup on 75deg by Z:
                classes: .show-75rZ, .hide-75rZ
                name: "popupAnimation-flex-75rZ.css"
    2) You can use any type of hosting code and optionaly it must be open source.
