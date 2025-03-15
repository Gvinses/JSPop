function create_UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

class PopUp {
    constructor(content, ...events) {
        this.content = content
        this.events = events
        this.id = create_UUID()
        this.self = this.content.template
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
    }


    show() {
        if (this.content.animations !== undefined){
            this.content.template.classList.remove(this.content.animations.hide)
            this.content.template.classList.add(this.content.animations.show)
        } else {
            if (this.content.display !== undefined) {
                this.content.template.style.display = String(this.content.display)
            } else {
                this.content.template.style.display = 'flex'
            }
        }
    }

    hide() {
        if (this.content.animations !== undefined) {
            this.content.template.classList.remove(this.content.animations.show)
            this.content.template.classList.add(this.content.animations.hide)
        } else {
            this.content.template.style.display = 'none'
        }
    }
}