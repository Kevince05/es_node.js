let obj = {
    name: "pippo",
    surname: "chuck",
    nickname: "elvis",
    married: false,
    age: 16,
    bestfriend: { name: "pluto", age: 26, mah: [5, 4, 3, "pippo", true] },
    num: [1, 2, 5],
    foo: [
        101,
        102,
        { name: "pluto", age: 26, mah: [5, 4, 3, "pippo", true] },
        ["elvis", "richie", "marvin"],
        104,
        105,
    ],
};

let max = -Infinity

function find_max(e) {
    let tmp
    switch (typeof (e)) {
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

function print_arr(e) {
    if (typeof e == "object") {
        if (Array.isArray(e)) {
            tmp = "["
            e.forEach(e_ => {
                tmp += e_ + ", "
            });
            console.log(tmp.substring(0, tmp.length - 2) + "]")
        } else {
            Object.values(e).forEach(e_ => {
                print_arr(e_)
            });
        }
    }
}

print_arr(obj)
console.log("max: " + find_max(obj))