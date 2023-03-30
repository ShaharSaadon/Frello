// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { socketService, SOCKET_EMIT_UPDATE_BOARD } from './socket.service'

const STORAGE_KEY = 'board'

export const boardService = {
  query,
  getById,
  save,
  saveTask,
  remove,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  getEmptyActivity,
  getEmptyComment,
}
window.cs = boardService

async function query(filterBy = { txt: '', memberId: '' }) {
  return httpService.get(STORAGE_KEY, filterBy)

  // var boards = await storageService.query(STORAGE_KEY)
  // if (filterBy.txt) {
  //     const regex = new RegExp(filterBy.txt, 'i')
  //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
  // }
  // if (filterBy.price) {
  //     boards = boards.filter(board => board.price <= filterBy.price)
  // }
  // return boards
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
  return httpService.delete(`board/${boardId}`)
}

async function save(board) {
  var savedBoard
  if (board._id) {
    socketService.emit(SOCKET_EMIT_UPDATE_BOARD, board)
    savedBoard = await httpService.put(`board/${board._id}`, board)
  } else {
    board.createdBy = userService.getLoggedinUser()
    board.members.push(userService.getLoggedinUser())
    savedBoard = await httpService.post('board', board)
  }
  return savedBoard
}

async function saveTask(boardId, groupId, task, activity) {
  task = JSON.parse(JSON.stringify(task))

  const board = await getById(boardId)
  board.activities = [activity, ...board.activities]
  console.log('activity:', activity)

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
//   return _getDemoDataBoard()
   return _getEmptyBoard()
}

function getEmptyTask() {
  return {
    title: '',
    description: '',
    members: [],
    labels: [],
    checklists: [],
    attachments: [],
    isWatch: false,
    dueDate: null,
    isComplete: false,
    comments: [],
  }
}

function getEmptyActivity() {
  return _getEmptyEntity()
}

function getEmptyComment() {
  return _getEmptyEntity()
}

function _getEmptyEntity() {
  return {
    id: utilService.makeId(),
    txt: '',
    createdAt: Date.now(),
    byMember: userService.getLoggedinUser(),
  }
}

function _getRandomBackground() {
  const backgrounds = ['gray', 'green', 'light-blue', 'orenge', 'perple', 'pink']
  const background = backgrounds[utilService.getRandomIntInclusive(0, 5)]
  const strHtml = `url(../src/assets/imgs/bgc-basic/${background}.svg)`
  return strHtml
}

function _getEmptyBoard() {
  return {
    title: '',
    appHeaderBgc: '',
    isStarred: false,
    archivedAt: '',
    createdBy: {},
    isLabelFullDisplay: false,
    labels: [
      {
        id: 'BD8j2P',
        color: 'light-green',
        title: '',
      },
      {
        id: 'OuYRj8',
        color: 'light-blue',
        title: '',
      },
      {
        id: 'MMgK4L',
        color: 'light-orange',
        title: '',
      },
      {
        id: 'S88O4M',
        color: 'light-red',
        title: '',
      },
      {
        id: 'OFCdQO',
        color: 'light-purple',
        title: '',
      },
      {
        id: '97LqwY',
        color: 'light-sky',
        title: '',
      },
    ],
    groups: [
      {
        id: 'g101',
        title: 'Group 1',
        archivedAt: 1589983468418,
        tasks: [
          {
            title: 'task 1',
            description: '',
            members: [],
            labels: [],
            checklists: [],
            attachments: [],
            isWatch: false,
            dueDate: null,
            isComplete: false,
            comments: [],
            id: 'fSL3MC',
          },
          {
            title: 'task 2',
            description: '',
            members: [],
            labels: [],
            checklists: [],
            attachments: [],
            isWatch: false,
            dueDate: null,
            isComplete: false,
            comments: [],
            id: 't3iXuK',
          },
          {
            title: 'task 3',
            description: '',
            members: [],
            labels: [],
            checklists: [],
            attachments: [],
            isWatch: false,
            dueDate: null,
            isComplete: false,
            comments: [],
            id: '7baW59',
          },
        ],
        style: {},
      },
      {
        id: 'g102',
        title: 'Group 2',
        tasks: [
          {
            title: 'task A',
            description: '',
            members: [],
            labels: [],
            checklists: [],
            attachments: [],
            isWatch: false,
            dueDate: null,
            isComplete: false,
            comments: [],
            id: 'bqvHlK',
          },
          {
            title: 'task B',
            description: '',
            members: [],
            labels: [],
            checklists: [],
            attachments: [],
            isWatch: false,
            dueDate: null,
            isComplete: false,
            comments: [],
            id: 'YdpBiN',
          },
          {
            title: 'task C',
            description: '',
            members: [],
            labels: [],
            checklists: [],
            attachments: [],
            isWatch: false,
            dueDate: null,
            isComplete: false,
            comments: [],
            id: 'd4cqNw',
          },
        ],
      },
      {
        id: '8ci1LS',
        title: 'Group 3',
        archivedAt: 0,
        tasks: [
          {
            title: 'task 1',
            description: '',
            members: [],
            labels: [],
            checklists: [],
            attachments: [],
            isWatch: false,
            dueDate: null,
            isComplete: false,
            comments: [],
            id: 'FqQ7b4',
          },
          {
            title: 'task 2',
            description: '',
            members: [],
            labels: [],
            checklists: [],
            attachments: [],
            isWatch: false,
            dueDate: null,
            isComplete: false,
            comments: [],
            id: '8OqVpH',
          },
          {
            title: 'task 3',
            description: '',
            members: [],
            labels: [],
            checklists: [],
            attachments: [],
            isWatch: false,
            dueDate: null,
            isComplete: false,
            comments: [],
            id: 'mHUVI4',
          },
        ],
        style: {},
      },
    ],
    members: [],
    style: {
      backgroundImage: 'url(https://a.trellocdn.com/prgb/assets/707f35bc691220846678.svg)',
    },
    activities: [],
  }
}
