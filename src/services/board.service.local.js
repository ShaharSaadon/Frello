
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
    getEmptyGroup,
    getEmptyTask,
    saveTask,
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

async function saveTask(boardId, groupId, task) {
    const board = await getById(boardId)
    const currGroup = board.groups.find(group => (group.id === groupId))
    if (!task.id) {
        task.id = utilService.makeId()
        currGroup.tasks.push(task)
    } else {
        currGroup.tasks.find(t => (t.id === task.id)) = task
    }

    return save(board)

    // board.activities.unshift(activity)
    // PUT /api/board/b123/task/t678
}

function getEmptyGroup() {
    return {
        "id": utilService.makeId(),
        "title": "",
        "archivedAt": 0,
        "tasks": [],
        "style": {}
    }
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        archivedAt: '',
        createdBy: {},
        style: {
            "background-image": `${_getRandomBackground()}`
        },
        groups: [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo"
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
                    }
                ],
                "style": {
                }
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "archivedAt": 1589983468418,
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress", // monday
                        "priority": "high",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "memberIds": ["u101"],
                        "labelIds": ["l101", "l102"],
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],

            }
        ],
    }
}

function getEmptyTask() {
    return {
        title: '',
        description: 'description...'
    }
}

function _getRandomBackground() {
    const backgrounds = ["gray", "green", "light-blue", "orenge", "perple", "pink"]
    const background = backgrounds[utilService.getRandomIntInclusive(0, 5)]
    const strHtml = `url(../src/assets/imgs/bgc-basic/${background}.svg)`
    return strHtml
}

// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, { title: 'Board 1' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 2' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 3' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 4' })
// })()