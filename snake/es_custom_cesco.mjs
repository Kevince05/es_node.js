import chalk from "chalk";

const cell_type = {
    MAP: chalk.bgBlack.black("0 "),
    EDGE: chalk.bgWhite.white("  ")
}


function map_to_cli(map) {
    let out = ""
    map.forEach(e => {
        e.forEach(e_ => {
            out += e_
        })
        out += "\n\r"
    });
    console.log(out)
}

function map_init(map, size_x, size_y) {
    for (let i = 0; i < size_x + 2; i++) {
        map.push([])
        for (let j = 0; j < size_y + 2; j++) {
            if (j == 0 || j == size_y + 1 || i == 0 || i == size_x + 1) {
                map[i].push(cell_type.EDGE)
            } else {
                map[i].push(cell_type.MAP)
            }
        }
    }
}


let map = [[]]
map_init(map, 10, 10)
map_to_cli(map)