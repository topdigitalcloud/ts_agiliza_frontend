import { passiveSupport } from 'passive-events-support/src/utils'


const addPassiveSupport = (touchstart = false, wheel = false, mousewheel = false, touchmove = false) => {

    if (touchstart) {
        passiveSupport({
            //...
            listeners: [
                {
                    element: 'div',
                    event: 'touchstart',
                    prevented: true
                }
            ]
        })
    }

    if (wheel) {
        passiveSupport({
            //...
            listeners: [
                {
                    element: 'div',
                    event: 'wheel',
                    prevented: true
                }
            ]
        })
    }

    if (mousewheel) {
        passiveSupport({
            //...
            listeners: [
                {
                    element: 'div',
                    event: 'mousewheel',
                    prevented: true
                }
            ]
        })
    }

    if (touchmove) {
        passiveSupport({
            //...
            listeners: [
                {
                    element: 'div',
                    event: 'touchmove',
                    prevented: true
                }
            ]
        })
    }

    

}

export default addPassiveSupport