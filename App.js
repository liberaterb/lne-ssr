const {ref} = require("vue");
module.exports = {
    setup() {
        let name = ref('name')
        return {
            name
        }
    },
    template: `<div>{{ name }}</div>`
}
