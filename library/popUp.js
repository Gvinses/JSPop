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

    checkObjectsCorrect() {
        if (this.content.animations.show === undefined || this.content.animations.hide === undefined) {
            let notFound = []
            if (this.content.animations.show === undefined) {
                notFound.push('show')
            }
            if (this.content.animations.hide === undefined) {
                notFound.push('hide')
            }

            throw new ReferenceError('Not all animations correct, expected: ' + notFound.join(' '))
        }
    }

    load() {
        this.applyFunctions()
        if (this.content.animations !== undefined) {
            this.checkObjectsCorrect()
        }
    }

    deleteFromHTML() {
        this.content.template.remove()
    }


    clearTemplateClasses() {
        this.content.template.classList.remove(this.content.animations.show)
        this.content.template.classList.remove(this.content.animations.hide)
        this.content.template.classList.remove(this.content.animations.error)
    }


    show() {
        if (this.content.animations !== undefined) {
            this.clearTemplateClasses()
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
            this.clearTemplateClasses()
            this.content.template.classList.add(this.content.animations.hide)
        } else {
            this.content.template.style.display = 'none'
        }
    }
}