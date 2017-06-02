export calcWords (allwords) => {
    let list = []
    for(w of allwords) {
        if (list.includes(w)) continue
        list.push(w)
    }
	return list
}
