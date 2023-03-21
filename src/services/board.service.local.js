
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board_db'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
}
window.cs = boardService


async function query(filterBy = { txt: '' }) {
    // TDOD: Add Filtering
    var boards = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        boards = boards.filter(board => regex.test(board.title))
    }
    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        // Later, owner is set by the backend
        board.createdBy = userService.getLoggedinUser()
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        archivedAt: '',
        createdBy: {},
        style: {},
    }
}


// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, { title: 'Board 1' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 2' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 3' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 4' })
// })()