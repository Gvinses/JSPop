function create_UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

class PopUp {
    static allPopups = new Map()

    constructor(content, ...events) {
        this.content = content
        this.events = events
        this.id = create_UUID()
        this.parentId = null
        PopUp.allPopups.set(this.id, this)
    }

    createChild(content, ...events) {
        const child = new PopUp(content, ...events)
        child.parentId = this.id
        return child
    }

    postToParent(data) {
        if (!this.parentId) {
            console.warn('No parent set for:', this.id)
            return
        }

        const parent = PopUp.allPopups.get(this.parentId)
        if (parent) {
            parent.receiveData(data, this.id)
        } else {
            console.warn(`Parent ${this.parentId} not found for:`, this.id)
        }
    }

    receiveData(data, childId) {
        console.log(`[${this.id}] Received from ${childId}:`, data)
    }

    applyFunctions() {
        this.events.forEach((event) => {
            let HTML_element = document.querySelector(event.origin)
            HTML_element.addEventListener(event.event, event.func)
        })
    }

    load() {
        this.applyFunctions()
    }

    deleteFromHTML() {
        this.content.template.remove()
        PopUp.allPopups.delete(this.id)
    }



    show() {
        if (this.content.display !== undefined) {
            this.content.template.style.display = String(this.content.display)
        } else {
            this.content.template.style.display = 'flex'
        }
    }

    hide() {
        this.content.template.style.display = 'none'
    }
}

let body = document.querySelector('body')
let popup = document.querySelector('#testPopup')
let qweqwe = document.querySelector('#testChildPopup')

let testPopUp = new PopUp(
    {
        'origin': body,
        'template': popup,
        'display': 'grid'
    },
    {
        'origin': '#closePopupButton',
        'event': 'click',
        'func': (event) => {
            console.log(testPopUp)
            testPopUp.deleteFromHTML()
            console.log(PopUp.allPopups)
            popup.style.background = 'red'
        }
    },
    {
        'origin': '#secondPopupButton',
        'event': 'click',
        'func': (event) => {
            let child = testPopUp.createChild(
                {
                    'origin': body,
                    'template': qweqwe,
                }
            )
            child.events = [
                {
                    'origin': '#closeChilePopupButton',
                    'event': 'click',
                    'func': (event) => {
                        child.postToParent('Hello, world!', child.id)
                        popup.style.background = 'blue'
                    }
                },
                {
                    'origin': '#secondChildPopupButton',
                    'event': 'click',
                    'func': (event) => {
                        child.postToParent('Pickme meme', child.id)
                        popup.style.background = `pink`
                        setTimeout(() => {
                            child.hide()
                        }, 1500)
                    }
                },
            ]
            child.load()
            child.show()
            popup.style.background = `green`
        }
    },
)

testPopUp.load()

function showPopUp() {
    testPopUp.show()
}