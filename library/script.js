let body = document.querySelector('body')
let popup = document.querySelector('#testPopup')
let error = document.querySelector('#errorPopup')

let testPopUp = new PopUp(
    {
        'origin': body,
        'template': popup,
        'display': 'flex',
        'animations': {
            'show': 'show-75rZ',
            'hide': 'hide-75rZ',
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
            testPopUp.self.style.background = `green`
            errorPopup.load()
            errorPopup.show()
        }
    },
)

let errorPopup = new ErrorPopUp(
    {
        'origin': body,
        'template': error,
        'display': 'flex',
        'errorStyle': 'error-style',
        'animations': {
            'show': 'show-75rZ',
            'hide': 'hide-75rZ',
        }
    },
    {
        'origin': '#closeErrorPopupButton',
        'event': 'click',
        'func': (event) => {
            errorPopup.hide()
        }
    },
)


testPopUp.load()

document.querySelector('#show-popup').addEventListener('click', (e) => {
    testPopUp.show()
})