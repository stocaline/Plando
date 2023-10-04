export function dateFormat(date: string) {
    const year = date.slice(0, 4)
    const mouth = date.slice(5, 7)
    const day = date.slice(8, 10)
    const dateFormated = `${day}/${mouth}/${year}`
    return dateFormated
}