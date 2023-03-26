import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board_db'
const USER_KEY = 'user_db'
_createUsers()

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
    boards = boards.filter((board) => regex.test(board.title))
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
  task = JSON.parse(JSON.stringify(task))
  const board = await getById(boardId)
  const group = board.groups.find((group) => group.id === groupId)
  if (!task.id) {
    task.id = utilService.makeId()
    group.tasks.push(task)
  } else {
    task.groupId = groupId
    const idx = group.tasks.findIndex((t) => t.id === task.id)
    group.tasks.splice(idx, 1, task)
  }
  save(board)
  return task

  // board.activities.unshift(activity)
  // PUT /api/board/b123/task/t678
}

function getEmptyGroup() {
  return {
    id: utilService.makeId(),
    title: '',
    archivedAt: 0,
    tasks: [],
    style: {},
  }
}

function getEmptyBoard() {
  return {
    title: '',
    appHeaderBgc: '',
    isStarred: false,
    archivedAt: '',
    createdBy: {},
    labels: [
      {
        id: utilService.makeId(),
        color: 'light-green',
        title: '',
      },
      {
        id: utilService.makeId(),
        color: 'light-blue',
        title: '',
      },
      {
        id: utilService.makeId(),
        color: 'light-orange',
        title: '',
      },
      {
        id: utilService.makeId(),
        color: 'light-red',
        title: '',
      },
      {
        id: utilService.makeId(),
        color: 'light-purple',
        title: '',
      },
      {
        id: utilService.makeId(),
        color: 'light-sky',
        title: '',
      },
    ],
    style: {
      'background-image': `${_getRandomBackground()}`,
    },
    groups: [
      {
        id: 'g101',
        title: 'Group 1',
        archivedAt: 1589983468418,
        tasks: [
          {
            id: 'c101',
            title: 'Replace logo',
            isWatch: false,
            members: [],
            labels: [],
            dueDate: null,
            checklists: [],
          },
          {
            id: 'c102',
            title: 'Add Samples',
            isWatch: false,
            members: [],
            labels: [],
            dueDate: null,
            checklists: [],
          },
        ],
        style: {},
      },
      {
        id: 'g102',
        title: 'Group 2',
        tasks: [
          {
            id: 'c103',
            title: 'Do that',
            isWatch: false,
            archivedAt: 1589983468418,
            members: [],
            labels: [],
            dueDate: null,
            checklists: [],
          },
          {
            id: 'c104',
            title: 'Help me',
            isWatch: false,
            status: 'in-progress', // monday
            priority: 'high',
            description: 'description',
            members: [],
            labels: [],
            checklists: [],
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            memberIds: ['u101'],
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl: 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              bgColor: '#26de81',
            },
          },
        ],
      },
    ],
    members: _createUsers(),
  }
}

function getEmptyTask() {
  return {
    title: '',
    description: 'description...',
    members: [],
    labels: [],
    checklists: [],
    isWatch: false,
    dueDate: 0,
  }
}

function _getRandomBackground() {
  const backgrounds = ['gray', 'green', 'light-blue', 'orenge', 'perple', 'pink']
  const background = backgrounds[utilService.getRandomIntInclusive(0, 5)]
  const strHtml = `url(../src/assets/imgs/bgc-basic/${background}.svg)`
  return strHtml
}

function _createUsers() {
  let users = JSON.parse(localStorage.getItem(USER_KEY))
  if (!users || !users.length) {
    users = [
      {
        _id: 'u100',
        fullname: 'Shahar Saadon',
        username: 'ShaharSaadon1',
        imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png',
      },
      {
        _id: 'u101',
        fullname: 'עידו פרי',
        username: 'idoperi104',
        imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png',
      },
      {
        _id: 'u102',
        fullname: 'Tomer Huberman',
        username: 'user15656051',
        imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png',
      },
    ]
    localStorage.setItem(USER_KEY, JSON.stringify(users))
  }
  return users
}

// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, { title: 'Board 1' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 2' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 3' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 4' })
// })()
