let origin = document.querySelector('preview-popup')
let popup = document.querySelector('#testPopup')
let textArea = document.querySelector('.preview-popup')


let testPopUp = new PopUp(
    {
        'origin': origin,
        'template': popup,
        'display': 'grid'
    },
)

testPopUp.load()

testPopUp.show()
