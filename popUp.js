function create_UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r)
        return v.toString(16);
    });
}


class PopUp {
    constructor(content, ...events) {
        this.content = content
        this.events = events
        this.id = create_UUID()
    }
    applyFunctions() {
        this.events.forEach((event) => {
            let HTML_element = document.querySelector(event.origin)
            HTML_element.addEventListener(event.event, event.func)
        })
    }

    setTemplateStyles() {
        if (this.content.display !== undefined) {
            this.content.template.style.display = String(this.content.display)
        } else {
            this.content.template.style.display = 'flex'
        }
    }

    render() {
        this.applyFunctions()
        this.setTemplateStyles()
    }

    show() {

    }

    getKey() {
        return this.id
    }

    getDataFromChild() {}

    postDataToParent() {}

}

let body = document.querySelector('body')
let popup = document.querySelector('#testPopup')

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
            console.log(event)
            popup.style.background = 'red'
        }
    },
    {
        'origin': '#secondPopupButton',
        'event': 'click',
        'func': (event) => {
            console.log(event)
            popup.style.background = `green`
        }
    },
)

testPopUp.render()