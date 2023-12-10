function create_basic_skeleton(bicycle) {
    const main_block = document.createElement('div')
    main_block.className = 'main-block'

    const left = document.createElement('div')
    left.className = 'left-column'
    left.innerHTML = `<img src="images/${bicycle.image}" alt="${bicycle.name}"/>`
    main_block.appendChild(left)

    const right = document.createElement('div')
    right.className = 'right-column'
    main_block.appendChild(right)

    return main_block
}

function create_rental_points_select(rental_points) {
    const select = document.createElement('select')
    select.name = "rental-point"
    for (let i in rental_points) {

        const rental_point = rental_points[i]
        const cur_option = document.createElement('option')
        cur_option.value = rental_point.id
        cur_option.innerText = rental_point.address
        select.appendChild(cur_option)
    }
    return select
}

export {create_basic_skeleton, create_rental_points_select}