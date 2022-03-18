const DEFAULT_OPTION = {
    position : 'top-right',
    text: 'This is a toast',
    autoClose: 5000,
    canClose: true,
}

export default class Toast {
    #toastElem;
    #autoSetTimeOut;
    constructor(options) {
        this.#toastElem = document.createElement('div');
        this.#toastElem.classList.add('toast')
        requestAnimationFrame(() => {
            this.#toastElem.classList.add('show')
        })
        this.update(options)

    }

    set position(value) {
        const selector = `.toast-container[data-position=${value}]`;
        const container = document.querySelector(selector) || createToastContainer(value)
        container.append(this.#toastElem)
    }

    set text(value){
        this.#toastElem.textContent = value
    }

    set autoClose(value){
        if(value == false) return false;
        if(this.#autoSetTimeOut !== null) clearTimeout(this.#autoSetTimeOut);
        this.#autoSetTimeOut = setTimeout(() => this.remove(), value)
    }

    set canClose(value){
        console.log('here')
        this.#toastElem.classList.toggle('can-show',value)
        if(value){
            this.#toastElem.addEventListener('click' , () => this.remove())
        }else{
            this.#toastElem.removeEventListener('click')
        }
    }

    remove(){
        const container = this.#toastElem.parentElement;
        this.#toastElem.remove()
        if(container.hasChildNodes()) return;
        container.remove()
    }

    update(options){
        Object.entries({...DEFAULT_OPTION,...options}).forEach(([key, value]) => {
            this[key] = value
        })
    }

}

function createToastContainer(position){
    let container = document.createElement('div');
    container.classList.add('toast-container');
    container.dataset.position = position;
    document.body.append(container);
    return container
}
