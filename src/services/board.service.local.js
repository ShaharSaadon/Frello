import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board_db'
const USER_KEY = 'user_db'
// _createUsers()

export const boardService = {
  query,
  getById,
  save,
  remove,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
  saveTask,
  getEmptyActivity,
  getEmptyComment,
}
window.cs = boardService

async function query(filterBy = { txt: '', memberId: '' }) {
  // TDOD: Add Filtering
  var boards = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    boards = boards.filter((board) => regex.test(board.title))
  }
  if (filterBy.memberId) {
    boards = boards.filter((board) => board.members.find((member) => member._id === filterBy.memberId))
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
    console.log('board.createdBy: ', board.createdBy)
    board.members.push(userService.getLoggedinUser())
    console.log('board.members: ', board.members)
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
  _getDemoDataBoard()
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

function _getDemoDataBoard() {
  return {
    "title": "g",
    "appHeaderBgc": "#45536A",
    "isStarred": false,
    "archivedAt": "",
    "createdBy": {
      "_id": "SfMA8",
      "fullname": "Ido Da",
      "username": "da",
      "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
      "score": 10000
    },
    "isLabelFullDisplay": false,
    "labels": [
      {
        "id": "Pnegl7",
        "color": "light-green",
        "title": ""
      },
      {
        "id": "w21tuQ",
        "color": "light-blue",
        "title": ""
      },
      {
        "id": "aB2KfD",
        "color": "light-orange",
        "title": ""
      },
      {
        "id": "fRLWUW",
        "color": "light-red",
        "title": "Critical"
      },
      {
        "id": "c2JLEI",
        "color": "light-purple",
        "title": "coding issues"
      },
      {
        "id": "TpP0tB",
        "color": "light-sky",
        "title": ""
      },
      {
        "title": "special event",
        "color": "dark-black",
        "id": "NK8eMe"
      }
    ],
    "groups": [
      {
        "id": "g101",
        "title": "To do - Must!",
        "archivedAt": 1589983468418,
        "tasks": [
          {
            "title": "refactor scss: including when possible, move everything to variables",
            "description": "",
            "members": [
              "SfMA8",
              "CnKGh",
              "d3FXM"
            ],
            "labels": [
              "fRLWUW"
            ],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "C3C1ia"
          },
          {
            "title": "Home Page Refactors (list inside)",
            "description": "",
            "members": [
              "d3FXM"
            ],
            "labels": [
              "aB2KfD"
            ],
            "checklists": [
              {
                "title": "Things to do",
                "checklist": [
                  {
                    "isChecked": true,
                    "title": "navbar (remove extras)"
                  },
                  {
                    "isChecked": true,
                    "title": "change icon to merllo"
                  },
                  {
                    "isChecked": true,
                    "title": "remove watch video"
                  },
                  {
                    "isChecked": true,
                    "title": "change sign up to -> start demo"
                  },
                  {
                    "isChecked": false,
                    "title": "header shadow"
                  },
                  {
                    "isChecked": true,
                    "title": "login to log in"
                  }
                ],
                "id": "OsT0Kh"
              }
            ],
            "attachments": [],
            "isWatch": false,
            "dueDate": "2023-03-27T21:00:00.000Z",
            "isComplete": false,
            "comments": [],
            "id": "Ipw0vg"
          },
          {
            "title": "Login and Signup Pages",
            "description": "",
            "members": [
              "SfMA8"
            ],
            "labels": [
              "fRLWUW"
            ],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "KmLgj3",
            "cover": {
              "color": "dark-pink",
              "isFull": false,
              "url": null
            }
          },
          {
            "title": "cover to task",
            "description": "",
            "members": [
              "CnKGh"
            ],
            "labels": [
              "w21tuQ"
            ],
            "checklists": [
              {
                "title": "To do's",
                "checklist": [
                  {
                    "isChecked": true,
                    "title": "basic colors"
                  },
                  {
                    "isChecked": true,
                    "title": "display on card preview"
                  },
                  {
                    "isChecked": true,
                    "title": "attachments"
                  },
                  {
                    "isChecked": false,
                    "title": "unsplash"
                  }
                ],
                "id": "VokhE3"
              }
            ],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "iYxAB0"
          },
          {
            "title": "attachments",
            "description": "",
            "members": [
              "CnKGh"
            ],
            "labels": [],
            "checklists": [
              {
                "title": "Checklist",
                "checklist": [
                  {
                    "isChecked": true,
                    "title": "DnD"
                  },
                  {
                    "isChecked": true,
                    "title": "link"
                  },
                  {
                    "isChecked": false,
                    "title": "preview on card"
                  },
                  {
                    "isChecked": true,
                    "title": "preview on details"
                  }
                ],
                "id": "C8I7OV"
              }
            ],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "n8rX2j"
          },
          {
            "title": "activities, relate to all actions",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "1r3vX9"
          },
          {
            "title": "comments",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "ftnjl7"
          },
          {
            "title": "SideBar - about ",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "Cfa1fi"
          }
        ],
        "style": {}
      },
      {
        "id": "g102",
        "title": "To do - Extra's features",
        "tasks": [
          {
            "title": "description - extra feature's",
            "description": "",
            "members": [],
            "labels": [
              "NK8eMe",
              "aB2KfD",
              "c2JLEI"
            ],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": "2023-03-30T21:00:00.000Z",
            "isComplete": false,
            "comments": [],
            "id": "plXGsy"
          },
          {
            "title": "signup with google and facebook",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "xTOh2Z"
          },
          {
            "title": "maps/canvas attribute in task details",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "ogIE4M",
            "cover": {
              "color": "dark-yellow",
              "isFull": false,
              "url": null
            }
          },
          {
            "title": "recording option in task details",
            "description": "",
            "members": [
              "SfMA8"
            ],
            "labels": [
              "w21tuQ",
              "aB2KfD"
            ],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "JbTo9u"
          },
          {
            "title": "invite member",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [
              {
                "url": "http://res.cloudinary.com/dviyyjlac/image/upload/v1680037292/v1cazlaprhlwjtup9lli.png",
                "id": "gfzB8B",
                "type": "png",
                "bgc": "#e0e2e4ff"
              }
            ],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "HySJIk",
            "cover": {
              "color": "#e0e2e4ff",
              "isFull": true,
              "url": "http://res.cloudinary.com/dviyyjlac/image/upload/v1680037292/v1cazlaprhlwjtup9lli.png"
            }
          },
          {
            "title": "add AI API",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": "2023-03-14T22:00:00.000Z",
            "isComplete": false,
            "comments": [],
            "id": "fI9OmN"
          },
          {
            "title": "dsd",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "ALdW1f"
          }
        ]
      },
      {
        "id": "kqY7IM",
        "title": "QA",
        "archivedAt": 0,
        "tasks": [
          {
            "title": "Date Picker",
            "description": "",
            "members": [
              "d3FXM",
              "CnKGh"
            ],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": "2023-03-29T14:00:00.000Z",
            "isComplete": false,
            "comments": [],
            "id": "yNgqdm",
            "groupId": "kqY7IM"
          },
          {
            "title": "show on task preview : Labels",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": "2023-03-27T21:00:00.000Z",
            "isComplete": false,
            "comments": [],
            "id": "gytM2k"
          }
        ],
        "style": {}
      },
      {
        "id": "vGP5NT",
        "title": "Check Pixel Perfect",
        "archivedAt": 0,
        "tasks": [
          {
            "title": "TaskDetails",
            "description": "super important mis amigos\n",
            "members": [
              "SfMA8",
              "CnKGh",
              "d3FXM"
            ],
            "labels": [
              "Pnegl7",
              "w21tuQ",
              "aB2KfD",
              "c2JLEI",
              "TpP0tB",
              "fRLWUW"
            ],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": "2023-03-27T21:00:00.000Z",
            "isComplete": false,
            "comments": [],
            "id": "RhQ24D"
          },
          {
            "title": "Label Picker & Label Edit",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "Ax6lHA"
          },
          {
            "title": "card preview",
            "description": "you must take a look as soon as possible\n",
            "members": [
              "SfMA8"
            ],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": true,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "Vabhey",
            "cover": {
              "color": "dark-orange",
              "isFull": true,
              "url": null
            }
          }
        ],
        "style": {}
      },
      {
        "id": "bkEorc",
        "title": "🐛Bugs🐛",
        "archivedAt": 0,
        "tasks": [
          {
            "title": "Drag and drope opacity",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [
              {
                "url": "http://res.cloudinary.com/dviyyjlac/image/upload/v1680036659/irr0chvy2gsizzdblczt.png",
                "id": "yHZVI9",
                "type": "png",
                "bgc": "#969ca7ff"
              }
            ],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "xctKl6",
            "cover": {
              "color": "#969ca7ff",
              "isFull": false,
              "url": "http://res.cloudinary.com/dviyyjlac/image/upload/v1680036659/irr0chvy2gsizzdblczt.png"
            }
          },
          {
            "title": "add card need to close when blur",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "um1TWf"
          }
        ],
        "style": {}
      },
      {
        "id": "xRsDza",
        "title": "Done",
        "archivedAt": 0,
        "tasks": [
          {
            "title": "AppHeader - color matching",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "Fm2OrY"
          },
          {
            "title": "login, signup",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "rsEraM"
          },
          {
            "title": "rendering after update is acoring only on the next update",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "GetNzv"
          },
          {
            "title": "Home Page MQ",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "ndhXlr"
          },
          {
            "title": "left side bar - \"shadow star only when hover\"",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "QUQUf6"
          },
          {
            "title": "Left Side Bar - Design finishes",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "gqBKRS"
          },
          {
            "title": "bgOpts - move to store",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "fhLaCw"
          },
          {
            "title": "checklist!!!!",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "kNDrAH"
          },
          {
            "title": "Users: Board Header Task Preview",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "6yU8C1"
          },
          {
            "title": "singup free to white",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "xMD7ct"
          },
          {
            "title": "textare auto high",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "PhXbn4"
          },
          {
            "title": "fixing add task to optimisty method",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "uyLRkq"
          },
          {
            "title": "drag item styling",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "OsFhFL"
          },
          {
            "title": "fix onToggleStarred() on BoardPreview",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "5BNKbp"
          },
          {
            "title": "center \"add a card\" + hover",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "FabcYr"
          }
        ],
        "style": {}
      },
      {
        "id": "imnXLn",
        "title": "שאלות לאסי",
        "archivedAt": 0,
        "tasks": [
          {
            "title": "ASI MONDAY 15:30: arcitecture, bugs, opinions, how to break libraries, tips, how to do it in mobile",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "7KAn3t"
          },
          {
            "title": "Drag and drop opacity",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "igfP0m"
          },
          {
            "title": "modal picker location",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "18i9uB"
          },
          {
            "title": "Break libraries",
            "description": "",
            "members": [],
            "labels": [],
            "checklists": [],
            "attachments": [],
            "isWatch": false,
            "dueDate": null,
            "isComplete": false,
            "comments": [],
            "id": "HAgtQu"
          }
        ],
        "style": {}
      }
    ],
    "members": [
      {
        "_id": "SfMA8",
        "fullname": "Ido Da",
        "username": "da",
        "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
        "score": 10000
      },
      {
        "_id": "CnKGh",
        "fullname": "Tomer Huberman",
        "username": "tomer",
        "password": "tomer",
        "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png",
        "score": 10000
      },
      {
        "_id": "d3FXM",
        "fullname": "Shahar Saadon",
        "username": "shahar",
        "password": "shahar",
        "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png",
        "score": 10000
      }
    ],
    "style": {
      "backgrounImage": "",
      "backgroundImage": "url(https://a.trellocdn.com/prgb/assets/941e9fef7b1b1129b904.svg)"
    },
    "activities": [
      {
        "id": "nXlqmv",
        "txt": "added cover from invite member ",
        "createdAt": 1680037538176,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "voFFmX",
        "txt": "added cover from invite member ",
        "createdAt": 1680037531296,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "9GOtcH",
        "txt": "added cover from invite member ",
        "createdAt": 1680037530289,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "dgKqjO",
        "txt": "added cover from invite member ",
        "createdAt": 1680037529093,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "fKnjBe",
        "txt": "added cover from invite member ",
        "createdAt": 1680037528146,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "ikluKa",
        "txt": "added cover from invite member ",
        "createdAt": 1680037525840,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "h4y9kr",
        "txt": "added dsd to To do - Extra's features ",
        "createdAt": 1680037489627,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "Vl5fKL",
        "txt": "added cover from invite member ",
        "createdAt": 1680037317918,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "lQnfQq",
        "txt": "added cover from invite member ",
        "createdAt": 1680037317093,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "jy9iSu",
        "txt": "added cover from invite member ",
        "createdAt": 1680037306774,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "m53qpp",
        "txt": "added cover from invite member ",
        "createdAt": 1680037305439,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "BDOcL1",
        "txt": "added cover from invite member ",
        "createdAt": 1680037302954,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "LwGYgN",
        "txt": "added cover from invite member ",
        "createdAt": 1680037301878,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "hwz8UD",
        "txt": "added cover from invite member ",
        "createdAt": 1680037299168,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "22TH6x",
        "txt": "added cover from invite member ",
        "createdAt": 1680037298268,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "zaz2rM",
        "txt": "added attachment to invite member ",
        "createdAt": 1680037293261,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HySJIk"
      },
      {
        "id": "qwDDJl",
        "txt": "added label to description - extra feature's ",
        "createdAt": 1680037223059,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "plXGsy"
      },
      {
        "id": "1b7gsu",
        "txt": "removed label from description - extra feature's ",
        "createdAt": 1680037220672,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "plXGsy"
      },
      {
        "id": "jNc5j8",
        "txt": "added label to description - extra feature's ",
        "createdAt": 1680037219895,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "plXGsy"
      },
      {
        "id": "HwmF7O",
        "txt": "added label to description - extra feature's ",
        "createdAt": 1680037206180,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "plXGsy"
      },
      {
        "id": "UueOZZ",
        "txt": "added label to description - extra feature's ",
        "createdAt": 1680037201154,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "plXGsy"
      },
      {
        "id": "afZGtX",
        "txt": "removed label from description - extra feature's ",
        "createdAt": 1680037199449,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "plXGsy"
      },
      {
        "id": "ESk6Jl",
        "txt": "added label to description - extra feature's ",
        "createdAt": 1680037198547,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "plXGsy"
      },
      {
        "id": "dNA9Qy",
        "txt": "added due date from description - extra feature's ",
        "createdAt": 1680037182245,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "plXGsy"
      },
      {
        "id": "DxBvCZ",
        "txt": "added due date from add AI API ",
        "createdAt": 1680037174555,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "fI9OmN"
      },
      {
        "id": "YKgieQ",
        "txt": "added cover from card preview ",
        "createdAt": 1680037155283,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Vabhey"
      },
      {
        "id": "QifsY0",
        "txt": "added cover from card preview ",
        "createdAt": 1680037153777,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Vabhey"
      },
      {
        "id": "r8hF9J",
        "txt": "added member to recording option in task details ",
        "createdAt": 1680037147235,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "JbTo9u"
      },
      {
        "id": "BQLc0K",
        "txt": "added label to recording option in task details ",
        "createdAt": 1680037143557,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "JbTo9u"
      },
      {
        "id": "4ngKkL",
        "txt": "added label to recording option in task details ",
        "createdAt": 1680037142817,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "JbTo9u"
      },
      {
        "id": "Qo1KIL",
        "txt": "added  from Break libraries ",
        "createdAt": 1680037133583,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "HAgtQu"
      },
      {
        "id": "jWkOQ0",
        "txt": "added  from modal picker location ",
        "createdAt": 1680037126065,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "18i9uB"
      },
      {
        "id": "s9Z6vN",
        "txt": "added  from Drag and drop opacity ",
        "createdAt": 1680037114343,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "igfP0m"
      },
      {
        "id": "0oyBaK",
        "txt": "added שבירת ספריות to שאלות לאסי ",
        "createdAt": 1680037094506,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "elKLFQ",
        "txt": "added מיקום הMODAL PICKER to שאלות לאסי ",
        "createdAt": 1680037084388,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "u1yKa8",
        "txt": "added שקיפות בDND to שאלות לאסי ",
        "createdAt": 1680037078536,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "lNpWfs",
        "txt": "added ASI MONDAY 15:30: arcitecture, bugs, opinions, how to break libraries, tips, how to do it in mobile to שאלות לאסי ",
        "createdAt": 1680037069788,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "1Y1NlT",
        "txt": "added center \"add a card\" + hover to Done ",
        "createdAt": 1680037035695,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "BmUTRj",
        "txt": "added fix onToggleStarred() on BoardPreview to Done ",
        "createdAt": 1680037023322,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "ZiQpXB",
        "txt": "added drag item styling to Done ",
        "createdAt": 1680037011547,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "JDKJHC",
        "txt": "added  from fixing add task to optimisty method ",
        "createdAt": 1680037002757,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "uyLRkq"
      },
      {
        "id": "XQTzcZ",
        "txt": "added fixing add task to ptimisty method to Done ",
        "createdAt": 1680036996829,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "lwRAXP",
        "txt": "added textare auto high to Done ",
        "createdAt": 1680036989490,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "VtNZ4Y",
        "txt": "added singup free to white to Done ",
        "createdAt": 1680036984394,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "csEXGf",
        "txt": "added  from Users: Board Header Task Preview ",
        "createdAt": 1680036975816,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "6yU8C1"
      },
      {
        "id": "odaNWL",
        "txt": "added Users: Board Header Task to Done ",
        "createdAt": 1680036947743,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "DXCDx7",
        "txt": "added checklist!!!! to Done ",
        "createdAt": 1680036936724,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "xagBKa",
        "txt": "added  from bgOpts - move to store ",
        "createdAt": 1680036927043,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "fhLaCw"
      },
      {
        "id": "t0grYS",
        "txt": "added  from bgOpts - in the store ",
        "createdAt": 1680036918199,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "fhLaCw"
      },
      {
        "id": "e8dzOr",
        "txt": "added bgOpts - to Done ",
        "createdAt": 1680036907932,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "LVE0Wb",
        "txt": "added Left Side Bar - Design finishes to Done ",
        "createdAt": 1680036904292,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "Whbix8",
        "txt": "added left side bar - \"shadow star only when hover\" to Done ",
        "createdAt": 1680036892789,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "CoMpyy",
        "txt": "added Home Page MQ to Done ",
        "createdAt": 1680036883796,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "0C0CKr",
        "txt": "added rendering after update is acoring only on the next update to Done ",
        "createdAt": 1680036877947,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "58Z7UV",
        "txt": "added login, signup to Done ",
        "createdAt": 1680036851690,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "Mxib7a",
        "txt": "added AppHeader - color matching to Done ",
        "createdAt": 1680036847007,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "R9Z3tV",
        "txt": "added add card need to close when blur to 🐛Bugs🐛 ",
        "createdAt": 1680036825192,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "ldF7k2",
        "txt": "joined to   card preview task ",
        "createdAt": 1680036720471,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Vabhey"
      },
      {
        "id": "KJY51b",
        "txt": "added member to card preview ",
        "createdAt": 1680036715693,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Vabhey"
      },
      {
        "id": "6mciDW",
        "txt": "added  from Drag and drope opacity ",
        "createdAt": 1680036689172,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "xctKl6"
      },
      {
        "id": "Ipkg3d",
        "txt": "added cover from Capacity of DND ",
        "createdAt": 1680036666018,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "xctKl6"
      },
      {
        "id": "MXvNGa",
        "txt": "added attachment to Capacity of DND ",
        "createdAt": 1680036660577,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "xctKl6"
      },
      {
        "id": "V55Qoa",
        "txt": "added Capacity of DND to 🐛Bugs🐛 ",
        "createdAt": 1680036567067,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "YS4Vef",
        "txt": "updated card preview's description  ",
        "createdAt": 1680036537620,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Vabhey"
      },
      {
        "id": "q71oAQ",
        "txt": "added  from card preview ",
        "createdAt": 1680036527511,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Vabhey"
      },
      {
        "id": "AlMax3",
        "txt": "added card prevuew to Check Pixel Perfect ",
        "createdAt": 1680036517848,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "moHUyQ",
        "txt": "added Label Picker & Label Edit to Check Pixel Perfect ",
        "createdAt": 1680036513298,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "iMVJeA",
        "txt": "added due date from TaskDetails ",
        "createdAt": 1680036493737,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "tvKjrw",
        "txt": "updated TaskDetails's description  ",
        "createdAt": 1680036469283,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "el80O7",
        "txt": "added due date from TaskDetails ",
        "createdAt": 1680036446180,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "LoGrSK",
        "txt": "added label to TaskDetails ",
        "createdAt": 1680036432046,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "x2LZ1Q",
        "txt": "removed label from TaskDetails ",
        "createdAt": 1680036431108,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "0mFH2q",
        "txt": "added label to TaskDetails ",
        "createdAt": 1680036426711,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "S5XcF6",
        "txt": "added label to TaskDetails ",
        "createdAt": 1680036424406,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "RhfrzT",
        "txt": "added label to TaskDetails ",
        "createdAt": 1680036423566,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "XPTJSB",
        "txt": "added label to TaskDetails ",
        "createdAt": 1680036422634,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "FnJDIj",
        "txt": "added label to TaskDetails ",
        "createdAt": 1680036422019,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "uGs38D",
        "txt": "added label to TaskDetails ",
        "createdAt": 1680036421331,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "VWvM1L",
        "txt": "added member to TaskDetails ",
        "createdAt": 1680036416382,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "Smhgoh",
        "txt": "added member to TaskDetails ",
        "createdAt": 1680036415955,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "IibuV2",
        "txt": "added member to TaskDetails ",
        "createdAt": 1680036415624,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "RhQ24D"
      },
      {
        "id": "akDsYH",
        "txt": "added TaskDetails to Check Pixel Perfect ",
        "createdAt": 1680036410588,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "WsN3Nv",
        "txt": "added cover from Login and Signup Pages ",
        "createdAt": 1680036364304,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "KmLgj3"
      },
      {
        "id": "sEpjV9",
        "txt": "added cover from Login and Signup Pages ",
        "createdAt": 1680036361975,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "KmLgj3"
      },
      {
        "id": "oQiFsT",
        "txt": "added cover from Login and Signup Pages ",
        "createdAt": 1680036361295,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "KmLgj3"
      },
      {
        "id": "S7Ya2a",
        "txt": "added cover from Login and Signup Pages ",
        "createdAt": 1680036335732,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "KmLgj3"
      },
      {
        "id": "PsJ5OQ",
        "txt": "added cover from Login and Signup Pages ",
        "createdAt": 1680036335357,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "KmLgj3"
      },
      {
        "id": "FsxUIV",
        "txt": "added cover from maps/canvas attribute in task details ",
        "createdAt": 1680036322527,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "ogIE4M"
      },
      {
        "id": "mqiM14",
        "txt": "added due date from Home Page Refactors (list inside) ",
        "createdAt": 1680036315005,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "mm6tur",
        "txt": "added due date from show on task preview : Labels ",
        "createdAt": 1680036303537,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "gytM2k"
      },
      {
        "id": "oIxgdG",
        "txt": "added due date from show on task preview : Labels ",
        "createdAt": 1680036295539,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "gytM2k"
      },
      {
        "id": "UhH2eT",
        "txt": "added show on task preview : Labels to QA ",
        "createdAt": 1680036284067,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "5g2myw",
        "txt": "added due date from Date Picker ",
        "createdAt": 1680036265943,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "yNgqdm"
      },
      {
        "id": "TtMs1k",
        "txt": "added member to Date Picker ",
        "createdAt": 1680036193982,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "yNgqdm"
      },
      {
        "id": "zfnV5Q",
        "txt": "added Date Picker to QA ",
        "createdAt": 1680036187849,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "605x09",
        "txt": "added label to cover to task ",
        "createdAt": 1680036168573,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "XVtdZ9",
        "txt": "removed label from cover to task ",
        "createdAt": 1680036168176,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "i7XzwK",
        "txt": "added label to cover to task ",
        "createdAt": 1680036167236,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "ik1T87",
        "txt": "added label to Login and Signup Pages ",
        "createdAt": 1680036159092,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "KmLgj3"
      },
      {
        "id": "QQMpUJ",
        "txt": "added label to Home Page Refactors (list inside) ",
        "createdAt": 1680036144248,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "m9wnM6",
        "txt": "added member to Home Page Refactors (list inside) ",
        "createdAt": 1680036138850,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "aiYchE",
        "txt": "added comments to To do - Must! ",
        "createdAt": 1680036132732,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "34xv53",
        "txt": "added member to refactor scss: including when possible, move everything to variables ",
        "createdAt": 1680036113428,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "C3C1ia"
      },
      {
        "id": "gisZYc",
        "txt": "added member to refactor scss: including when possible, move everything to variables ",
        "createdAt": 1680036113108,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "C3C1ia"
      },
      {
        "id": "KYLhkG",
        "txt": "added member to refactor scss: including when possible, move everything to variables ",
        "createdAt": 1680036112808,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "C3C1ia"
      },
      {
        "id": "Dt2WOF",
        "txt": "added add AI API to To do - Extra's features ",
        "createdAt": 1680036091019,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "VI0aGW",
        "txt": "added invite member to To do - Extra's features ",
        "createdAt": 1680036046793,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "nwQLji",
        "txt": "added recording option in task details to To do - Extra's features ",
        "createdAt": 1680036041052,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "Ak2hUm",
        "txt": "added maps/canvas attribute in task details to To do - Extra's features ",
        "createdAt": 1680036030238,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "LjJlpr",
        "txt": "added signup with google and facebook to To do - Extra's features ",
        "createdAt": 1680036012717,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "yIjRzT",
        "txt": "added description - extra feature's to To do - Extra's features ",
        "createdAt": 1680036006626,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "Xj44R4",
        "txt": "added activities, relate to all actions to Group 1 ",
        "createdAt": 1680035941820,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "Y64faA",
        "txt": "added  from SideBar - about  ",
        "createdAt": 1680035922292,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Cfa1fi"
      },
      {
        "id": "be5z2l",
        "txt": "added member to cover to task ",
        "createdAt": 1680035902766,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "Knp0UN",
        "txt": "added member to attachments ",
        "createdAt": 1680035894734,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "n8rX2j"
      },
      {
        "id": "yERxnE",
        "txt": "added checklists from attachments ",
        "createdAt": 1680035888891,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "n8rX2j"
      },
      {
        "id": "Zqk6di",
        "txt": "added checklists from attachments ",
        "createdAt": 1680035888534,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "n8rX2j"
      },
      {
        "id": "zLYOog",
        "txt": "added checklists from attachments ",
        "createdAt": 1680035887819,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "n8rX2j"
      },
      {
        "id": "SeczFv",
        "txt": "added checklists from attachments ",
        "createdAt": 1680035883673,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "n8rX2j"
      },
      {
        "id": "iBCozO",
        "txt": "added checklists from attachments ",
        "createdAt": 1680035880580,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "n8rX2j"
      },
      {
        "id": "zuEZRm",
        "txt": "added checklists from attachments ",
        "createdAt": 1680035876438,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "n8rX2j"
      },
      {
        "id": "7zNCRh",
        "txt": "added checklists from attachments ",
        "createdAt": 1680035873019,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "n8rX2j"
      },
      {
        "id": "kc4wLc",
        "txt": "added checklists to attachments ",
        "createdAt": 1680035869434,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "n8rX2j"
      },
      {
        "id": "n4wpPB",
        "txt": "added attachments to Group 1 ",
        "createdAt": 1680035852488,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "CdsKiF",
        "txt": "added checklists from cover to task ",
        "createdAt": 1680035816827,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "SdrREo",
        "txt": "added checklists from cover to task ",
        "createdAt": 1680035815751,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "pbNomU",
        "txt": "added checklists from cover to task ",
        "createdAt": 1680035814881,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "e8KWlw",
        "txt": "added checklists from cover to task ",
        "createdAt": 1680035813415,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "XnAvGA",
        "txt": "added checklists from cover to task ",
        "createdAt": 1680035808227,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "ReHDOZ",
        "txt": "added checklists from cover to task ",
        "createdAt": 1680035805524,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "LWmMNG",
        "txt": "added checklists from cover to task ",
        "createdAt": 1680035800396,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "7YB0fG",
        "txt": "added checklists to cover to task ",
        "createdAt": 1680035794692,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "iYxAB0"
      },
      {
        "id": "Jf3azC",
        "txt": "added cover to task to Group 1 ",
        "createdAt": 1680035771868,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "AF1ecB",
        "txt": "added member to Login and Signup Pages ",
        "createdAt": 1680035762211,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "KmLgj3"
      },
      {
        "id": "B3EqNS",
        "txt": "added Login and Signup Pages to Group 1 ",
        "createdAt": 1680035756180,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "vxMXHM",
        "txt": "added SideBar - about this board to Group 1 ",
        "createdAt": 1680035735816,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "O8lfHu",
        "txt": "updated Home Page Refactors (list inside)'s description  ",
        "createdAt": 1680035685524,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "UBJsFF",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035668253,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "3mHOYK",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035667815,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "fDCYwO",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035667307,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "fBZRjX",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035666842,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "vrHve9",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035666012,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "EadRoS",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035662548,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "kyqy90",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035657054,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "2iEoRK",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035653019,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "uIHPJq",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035641140,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "qxOseV",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035635960,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "DJ7iYE",
        "txt": "added checklists from Home Page Refactors (list inside) ",
        "createdAt": 1680035629180,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "hGDI6y",
        "txt": "added checklists to Home Page Refactors (list inside) ",
        "createdAt": 1680035611984,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "Ipw0vg"
      },
      {
        "id": "J7kUeC",
        "txt": "added Home Page Refactors (list inside) to Group 1 ",
        "createdAt": 1680035599296,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "9zbtOC",
        "txt": "added label to refactor scss: including when possible, move everything to variables ",
        "createdAt": 1680035559657,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "C3C1ia"
      },
      {
        "id": "wucK0B",
        "txt": "added  from refactor scss: including when possible, move everything to variables ",
        "createdAt": 1680035555932,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "C3C1ia"
      },
      {
        "id": "EFPoKs",
        "txt": "added a to Group 1 ",
        "createdAt": 1680035467988,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "VHB93U",
        "txt": "added comment to dg ",
        "createdAt": 1680035430485,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        },
        "taskId": "LOX2PE"
      },
      {
        "id": "CGdHbb",
        "txt": "added dg to Group 2 ",
        "createdAt": 1680035424429,
        "byMember": {
          "_id": "SfMA8",
          "fullname": "Ido Da",
          "username": "da",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
          "score": 10000
        }
      },
      {
        "id": "100",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
          "_id": "u100",
          "fullname": "Shahar Saadon",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png"
        },
        "task": {
          "id": "c100",
          "title": "Replace Logo"
        }
      },
      {
        "id": "101",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
          "_id": "u101",
          "fullname": "Ido Peri",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png"
        },
        "task": {
          "id": "c101",
          "title": "Replace Logo"
        }
      },
      {
        "id": "102",
        "txt": "Changed Color",
        "createdAt": 154514,
        "byMember": {
          "_id": "u102",
          "fullname": "Tomer Huberman",
          "imgUrl": "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png"
        },
        "task": {
          "id": "c102",
          "title": "Replace Logo"
        }
      }
    ],
    "LeftSideBarBgc": "hsla(218,20.4%,39.4%,0.9)",
    "_id": "CyjmB"
  }
}

function _getEmptyBoard() {
 // return {
  //   title: '',
  //   appHeaderBgc: '',
  //   isStarred: false,
  //   archivedAt: '',
  //   createdBy: {},
  //   isLabelFullDisplay: false,
  //   labels: [
  //     {
  //       id: utilService.makeId(),
  //       color: 'light-green',
  //       title: '',
  //     },
  //     {
  //       id: utilService.makeId(),
  //       color: 'light-blue',
  //       title: '',
  //     },
  //     {
  //       id: utilService.makeId(),
  //       color: 'light-orange',
  //       title: '',
  //     },
  //     {
  //       id: utilService.makeId(),
  //       color: 'light-red',
  //       title: '',
  //     },
  //     {
  //       id: utilService.makeId(),
  //       color: 'light-purple',
  //       title: '',
  //     },
  //     {
  //       id: utilService.makeId(),
  //       color: 'light-sky',
  //       title: '',
  //     },
  //   ],
  //   groups: [
  //     {
  //       id: 'g101',
  //       title: 'Group 1',
  //       archivedAt: 1589983468418,
  //       tasks: [
  //         {
  //           id: 'c101',
  //           title: 'Replace logo',
  //           isWatch: false,
  //           members: [],
  //           labels: [],
  //           attachments: [],
  //           cover: null,
  //           dueDate: null,
  //           checklists: [],
  //           dueDate: 0,
  //           isComplete: false,
  //         },
  //         {
  //           id: 'c102',
  //           title: 'Add Samples',
  //           isWatch: false,
  //           members: [],
  //           labels: [],
  //           attachments: [],
  //           cover: null,
  //           dueDate: undefined,
  //           checklists: [],
  //           dueDate: 0,
  //           isComplete: false,
  //         },
  //       ],
  //       style: {},
  //     },
  //     {
  //       id: 'g102',
  //       title: 'Group 2',
  //       tasks: [
  //         {
  //           id: 'c103',
  //           title: 'Do that',
  //           isWatch: false,
  //           archivedAt: 1589983468418,
  //           members: [],
  //           labels: [],
  //           attachments: [],
  //           cover: null,
  //           dueDate: null,
  //           checklists: [],
  //           dueDate: 0,
  //           isComplete: false,
  //         },
  //         {
  //           id: 'c104',
  //           title: 'Help me',
  //           isWatch: false,
  //           status: 'in-progress', // monday
  //           priority: 'high',
  //           description: 'description',
  //           members: [],
  //           labels: [],
  //           attachments: [],
  //           cover: null,
  //           checklists: [],
  //           dueDate: 0,
  //           isComplete: false,
  //           comments: [
  //             {
  //               id: 'ZdPnm',
  //               txt: 'also @yaronb please CR this',
  //               createdAt: 1590999817436,
  //               byMember: {
  //                 _id: "SfMA8",
  //                 fullname: "Ido Da",
  //                 username: "da",
  //                 imgUrl: "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
  //                 score: 10000
  //               }
  //             },
  //           ],

  //           dueDate: 3467436734,
  //           isComplete: false,
  //           byMember: {
  //             _id: "SfMA8",
  //             fullname: "Ido Da",
  //             username: "da",
  //             imgUrl: "https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png",
  //             score: 10000
  //           },
  //           style: {
  //             bgColor: '#26de81',
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   members: [],
  //   style: {
  //     backgrounImage: '',
  //   },
  //   activities: [
  //     {
  //       id: '100',
  //       txt: 'Changed Color',
  //       createdAt: 154514,
  //       byMember: {
  //         _id: 'u100',
  //         fullname: 'Shahar Saadon',
  //         imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png',
  //       },
  //       task: {
  //         id: 'c100',
  //         title: 'Replace Logo',
  //       },
  //     },
  //     {
  //       id: '101',
  //       txt: 'Changed Color',
  //       createdAt: 154514,
  //       byMember: {
  //         _id: 'u101',
  //         fullname: 'Ido Peri',
  //         imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png',
  //       },
  //       task: {
  //         id: 'c101',
  //         title: 'Replace Logo',
  //       },
  //     },
  //     {
  //       id: '102',
  //       txt: 'Changed Color',
  //       createdAt: 154514,
  //       byMember: {
  //         _id: 'u102',
  //         fullname: 'Tomer Huberman',
  //         imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png',
  //       },
  //       task: {
  //         id: 'c102',
  //         title: 'Replace Logo',
  //       },
  //     },
  //   ],
  // }
}

// function _createUsers() {
//   let users = JSON.parse(localStorage.getItem(USER_KEY))
//   if (!users || !users.length) {
//     users = [
//       {
//         _id: 'u100',
//         fullname: 'Shahar Saadon',
//         username: 'ShaharSaadon1',
//         imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png',
//       },
//       {
//         _id: 'u101',
//         fullname: 'עידו פרי',
//         username: 'idoperi104',
//         imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png',
//       },
//       {
//         _id: 'u102',
//         fullname: 'Tomer Huberman',
//         username: 'user15656051',
//         imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png',
//       },
//     ]
//     localStorage.setItem(USER_KEY, JSON.stringify(users))
//   }
// }

// function _createUsers() {
//   let users = JSON.parse(localStorage.getItem(USER_KEY))
//   if (!users || !users.length) {
//     users = [
//       {
//         _id: 'u100',
//         fullname: 'Shahar Saadon',
//         username: 'ShaharSaadon1',
//         imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588778/shahar_wnnnux.png',
//       },
//       {
//         _id: 'u101',
//         fullname: 'עידו פרי',
//         username: 'idoperi104',
//         imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588729/ido_wqplye.png',
//       },
//       {
//         _id: 'u102',
//         fullname: 'Tomer Huberman',
//         username: 'user15656051',
//         imgUrl: 'https://res.cloudinary.com/dbf0uxszt/image/upload/v1679588803/tomer_wm04gf.png',
//       },
//     ]
//     localStorage.setItem(USER_KEY, JSON.stringify(users))
//   }
//   return users
// }

// TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, { title: 'Board 1' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 2' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 3' })
//     await storageService.post(STORAGE_KEY, { title: 'Board 4' })
// })()
