import { boardService } from '../services/board.service.local'
// import { boardService } from '../services/board.service'

export function getActionRemoveBoard(boardId) {
    return {
        type: 'removeBoard',
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: 'addBoard',
        board
    }
}
export function getActionUpdateBoard(board) {
    return {
        type: 'updateBoard',
        board
    }
}
export function getActionRemoveGroup(boardId, groupId) {
    return {
        type: 'removeGroup',
        boardId, groupId
    }
}
export function getActionAddGroup(boardId, group) {
    return {
        type: 'addGroup',
        boardId, group
    }
}
export function getActionUpdateGroup(boardId, group) {
    return {
        type: 'updateGroup',
        boardId, group
    }
}


export const boardStore = {
    state: {
        boards: [],
        watchedBoardId: null,
        currTask : null
    },
    getters: {
        boards({ boards }) { return boards },
        watchedBoard({ boards, watchedBoardId }) {
            return boards.find(board => board._id === watchedBoardId)
        },
        watchedBoardId({ watchedBoardId }) { return watchedBoardId },
        currTask({ currTask }) { return currTask },
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        setWatchedBoardId(state, { boardId }) {
            state.watchedBoardId = boardId
        },
        setCurrTask(state, { boardId,groupId,taskId }) {
            var board = state.boards.find(board => board._id === boardId)
            var group = board.groups.find(group => group.id === groupId)
            var task = group.tasks.find(task => task.id === taskId)
            state.currTask = task
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(c => c._id === board._id)
            state.boards.splice(idx, 1, board)
        },
        updateBoardEntity(state, { key, val }) {
            const board = state.boards.find(board => board._id === state.watchedBoardId)
            board[key] = val 
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },

        updateGroups(state, { boardId, groups }) {
            var board = state.boards.find(board => board._id === boardId)
            board.groups = groups
        },
        removeGroup(state, { boardId, groupId }) {
            var board = state.boards.find(board => board._id === boardId)
            const idx = board.groups.findIndex(group => group.id === groupId)
            board.groups.splice(idx, 1)
        },
        addGroup(state, { boardId, group }) {
            var board = state.boards.find(board => board._id === boardId)
            board.groups.push(group)
        },
        updateGroup(state, { boardId, group }) {
            var board = state.boards.find(board => board._id === boardId)
            const idx = board.groups.findIndex(g => g.id === group.id)
            board.groups.splice(idx, 1, group)
        },
        updateTasksPos(state, { groupId, tasks }){
            const board = state.boards.find(board => board._id === state.watchedBoardId)
            const group = board.groups.find(group => group.id === groupId)
            group.tasks = tasks
        }



    },
    actions: {
        async loadBoards(context) {
            try {
                const boards = await boardService.query()
                context.commit({ type: 'setBoards', boards })
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
                throw err
            }
        },
        async addBoard(context, { board }) {
            try {
                board = await boardService.save(board)
                context.commit(getActionAddBoard(board))
                return board
            } catch (err) {
                console.log('boardStore: Error in addBoard', err)
                throw err
            }
        },
        async updateBoard(context, { board }) {
            try {
                board = await boardService.save(board)
                context.commit(getActionUpdateBoard(board))
                return board
            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },
        async updateBoardEntity(context, { key, val }) {
            try {
                context.commit({ type: 'updateBoardEntity', key, val })
                context.dispatch(getActionUpdateBoard(context.getters.watchedBoard))
            } catch (err) {
                console.log('boardStore: Error in updateBoard', err)
                throw err
            }
        },  
        async removeBoard(context, { boardId }) {
            try {
                await boardService.remove(boardId)
                context.commit(getActionRemoveBoard(boardId))
            } catch (err) {
                console.log('boardStore: Error in removeBoard', err)
                throw err
            }
        },
        async updateGroups(context, { boardId, groups }) {
            try {
                context.commit({ type: 'updateGroups', boardId, groups })
                context.dispatch(getActionUpdateBoard(context.getters.watchedBoard))
            } catch (err) {
                console.log('boardStore: Error in removeGroup', err)
                throw err
            }
        },



        // Group
        async updateGroup(context, { boardId, group }) {
            try {
                context.commit(getActionUpdateGroup(boardId, group))
                context.dispatch(getActionUpdateBoard(context.getters.watchedBoard))
            } catch (err) {
                console.log('boardStore: Error in removeGroup', err)
                throw err
            }
        },
        async addGroup(context, { boardId, group }) {
            try {
                context.commit(getActionAddGroup(boardId, group))
                context.dispatch(getActionUpdateBoard(context.getters.watchedBoard))
            } catch (err) {
                console.log('boardStore: Error in removeGroup', err)
                throw err
            }
        },
        async removeGroup(context, { boardId, groupId }) {
            try {
                context.commit(getActionRemoveGroup(boardId, groupId))
                context.dispatch(getActionUpdateBoard(context.getters.watchedBoard))
            } catch (err) {
                console.log('boardStore: Error in removeGroup', err)
                throw err
            }
        },

        // Task
        async saveTask({state, commit}, { groupId, task }) {
            const boardId = state.watchedBoardId
            try {
                const savedBoard = await boardService.saveTask(boardId, groupId, task)
                commit(getActionUpdateBoard(savedBoard))
                commit({type:'setCurrTask', boardId, groupId, taskId: task.id })
                return savedBoard
            } catch (err) {
                console.log('boardStore: Error in add Task', err)
                throw err
            }

        },
        async removeTask({commit,getters}, { groupId, taskId }) {
            const savedBoard = JSON.parse(JSON.stringify(getters.watchedBoard))
            const currGroup = savedBoard.groups.find(g => (g.id === groupId))
            const taskIdx = currGroup.tasks.findIndex(task => (task.id = taskId))
            currGroup.tasks.splice(taskIdx, 1)
            try {
                const board = await boardService.save(savedBoard)
                commit(getActionUpdateBoard(board))
                return board
            } catch (err) {
                console.log('boardStore: Error in delete Task', err)
                throw err
            }
        },
        async updateTasksPos(context, { groupId, tasks }){
            try {
                context.commit({ type: 'updateTasksPos', groupId, tasks })
                context.dispatch(getActionUpdateBoard(context.getters.watchedBoard))
            } catch (err) {
                console.log('boardStore: Error in', err)
                throw err
            }
        }

    }
}