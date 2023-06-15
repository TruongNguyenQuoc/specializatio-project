import { EVENT_KEYDOWN_ENTER } from 'ultil/constants'

export const saveContentAfterEnter = (event) => {
    if (event.key === EVENT_KEYDOWN_ENTER) {
        event.preventDefault()
        event.target.blur()
    }
}

export const selectFocusText = (event) => {
    event.target.focus()
}

export const selectAllText = (event) => {
    event.target.focus()
    event.target.select()
}
