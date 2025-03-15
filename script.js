let body = document.querySelector('body')
let popup = document.querySelector('#testPopup')

let testPopUp = new PopUp(
    {
        'origin': body,
        'template': popup,
        // 'display': 'grid',
    },
    {
        'origin': '#closePopupButton',
        'event': 'click',
        'func': (event) => {
            testPopUp.self.style.background = 'red'
            testPopUp.hide()
            // testPopUp.deleteFromHTML()
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

testPopUp.load()

console.log(testPopUp)

document.querySelector('#show-popup').addEventListener('click', (e) => {
    console.log(e)
    testPopUp.show()
})