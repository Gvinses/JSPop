let body = document.querySelector('body')
let popup = document.querySelector('#testPopup')

let testPopUp = new PopUp(
    {
        'origin': body,
        'template': popup,
        'display': 'flex',
        'animations': {
            'show': 'show-75rZ',
            'hide': 'hide-75rZ',
            'error': 'error-75rZ',
        }
    },
    {
        'origin': '#closePopupButton',
        'event': 'click',
        'func': (event) => {
            testPopUp.self.style.background = 'green'
            testPopUp.hide()
            // testPopUp.deleteFromHTML()
        }
    },
    {
        'origin': '#secondPopupButton',
        'event': 'click',
        'func': (event) => {
            // testPopUp.self.style.background = `green`
        }
    },
)

testPopUp.load()

document.querySelector('#show-popup').addEventListener('click', (e) => {
    testPopUp.show()
})