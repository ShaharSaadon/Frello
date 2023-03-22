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
    },
    getters: {
        boards({ boards }) { return boards },
        watchedBoard({ boards, watchedBoardId }) {
            return boards.find(board => board._id === watchedBoardId)
        },
        watchedBoardId({ watchedBoardId }) { return watchedBoardId }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        addBoard(state, { board }) {
            state.boards.push(board)
        },
        updateBoard(state, { board }) {
            const idx = state.boards.findIndex(c => c._id === board._id)
            state.boards.splice(idx, 1, board)
        },
        removeBoard(state, { boardId }) {
            state.boards = state.boards.filter(board => board._id !== boardId)
        },
        setWatchedBoardId(state, { boardId }) {
            state.watchedBoardId = boardId
        },

        removeGroup(state, { boardId, groupId }) {
            var board = state.boards.find(board => board._id === boardId)
            const idx = board.groups.findIndex(group => group.id === groupId)
            board.groups.splice(idx, 1)
            // state.boards = state.boards.filter(board => board._id !== boardId)
        },
        addGroup(state, { boardId, group }) {
            var board = state.boards.find(board => board._id === boardId)
            // const idx = board.groups.findIndex(group => group.id === groupId)
            // board.groups.splice(idx, 1)
            // state.boards = state.boards.filter(board => board._id !== boardId)
            board.groups.push(group)
        },

        // tasks


    },
    actions: {
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
        async loadBoards(context) {
            try {
                const boards = await boardService.query()
                context.commit({ type: 'setBoards', boards })
            } catch (err) {
                console.log('boardStore: Error in loadBoards', err)
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


        // Group
        async updateGroup(context, { boardId, group }) {
            console.log("group: ", group);
            console.log("boardId: ", boardId);
            // try {
            //     board = await boardService.save(board)
            //     context.commit(getActionUpdateBoard(board))
            //     return board
            // } catch (err) {
            //     console.log('boardStore: Error in updateBoard', err)
            //     throw err
            // }
        },
        async addGroup(context, { boardId, group }) {
            console.log("group: ", group);
            console.log("boardId: ", boardId);
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
    }
}