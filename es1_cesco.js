let array = [
    "pippo",
    "chuck",
    "elvis",
    "arnold",
    false,
    12.5,
    { name: "pluto", age: 2640, foo: { n: 3476, b: 1873 } },
    [1758, 2, 3],
    100,
    514,
];

let max = -Infinity
array.forEach(e => {
    max = find_max(e)
})

function find_max(e) {
    let tmp
    switch (typeof(e)) {
        case 'string':
            tmp = Number.parseFloat(e)
            if (tmp > max) {
                max = tmp
            }
            break
        case 'number':
            if (e > max) {
                max = e
            }
            break
        case 'object':
            if (Array.isArray(e)) {
                e.forEach(e_ => {
                    let max_ = find_max(e_)
                    if (max_ > max) {
                        max = max_
                    }
                })
            } else {
                Object.values(e).forEach(e_ => {
                    max_ = find_max(e_)
                    if (max_ > max) {
                        max = max_
                    }
                })
            }
            break
        case 'boolean':
            if (e > max) {
                max = Number(e)
            }
            break
    }
    return max
}
console.log("max: " + max)