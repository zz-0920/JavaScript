import fs from 'fs'

export default {
    sum({ a, b }) {
        return a + b
    },
    createFile({ filename, content }) {
        try {
            fs.writeFileSync(filename, content)
            return true
        } catch (error) {
            return false
        }
    }
}
