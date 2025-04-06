function create_UUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

export class PopUp {
    constructor(content, ...events) {
        this.content = content
        this.events = events[0]
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

export class ErrorPopUp extends PopUp {
    savedStylesOfTemplate = ''
    panel = document.createElement('div')

    protectivePanelCreator() {

        this.panel.style.margin = '-100px'
        this.panel.style.padding = '0'
        this.panel.style.boxSizing = 'border-box'

        this.panel.style.display = 'flex'
        this.panel.style.position = 'fixed'
        this.panel.style.width = '150vw'
        this.panel.style.height = '150vh'
        this.panel.style.zIndex = '100'

        if (this.content.errorStyle === undefined) {
            this.panel.style.background = 'rgba(78, 74, 83, 0.5);'
        } else {
            this.panel.classList.add(this.content.errorStyle)
        }

        this.content.origin.appendChild(this.panel)
    }

    deleteProtectivePanel() {
        this.content.origin.removeChild(this.panel)
    }

    showZIndexStylesOfTemplates() {
        this.savedStylesOfTemplate = this.content.template.style.zIndex

        this.content.template.style.zIndex = '1000'
    }

    resetZIndexStyle() {
        this.content.template.style.zIndex = this.savedStylesOfTemplate
    }

    show() {
        super.show()
        this.protectivePanelCreator()
        this.showZIndexStylesOfTemplates()
    }

    hide() {
        this.resetZIndexStyle()
        this.deleteProtectivePanel()
        super.hide()
    }
}
