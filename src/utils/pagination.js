const paginateData = (items, currentPage) => {
    const ITEMS_PER_PAGE = 20

    const sliceEnd = currentPage * ITEMS_PER_PAGE
    const sliceStart = sliceEnd - ITEMS_PER_PAGE
    const itemsInCurrentPages = items.slice(sliceStart, sliceEnd)

    const lastPage = Math.ceil(items.length / ITEMS_PER_PAGE)

    const PAGES_PER_BLOCK = 5
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    const PagesInCurrentBlock = []
    const maxPage = actualBlock * PAGES_PER_BLOCK
    const minPage = (maxPage - PAGES_PER_BLOCK) + 1 
    for (let i = minPage; i <= maxPage; i++) {
        if(i <= lastPage) {
            PagesInCurrentBlock.push(i)
        }
    }

    return {
        itemsInCurrentPages,
        PagesInCurrentBlock,
        lastPage
    }
}

export {
    paginateData
}