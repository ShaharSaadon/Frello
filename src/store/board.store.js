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
            console.log("boards: ", boards);
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
            console.log("boardId: ", boardId);
            state.watchedBoardId = boardId
        },

        removeGroup(state, { boardId, groupId }) {
            console.log("groupId: ", groupId);
            console.log("boardId: ", boardId);
            // state.boards = state.boards.filter(board => board._id !== boardId)
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
        async addGroup(context, { boardId, group }) {
            console.log("group: ", group);
            console.log("boardId: ", boardId);
            // try {
            //     board = await boardService.save(board)
            //     context.commit(getActionAddBoard(board))
            //     return board
            // } catch (err) {
            //     console.log('boardStore: Error in addBoard', err)
            //     throw err
            // }
        },
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
        async removeGroup(context, { boardId, groupId }) {
            try {
                // var board = await boardService.removeGroup(boardId, groupId)

                context.commit(getActionRemoveBoard(boardId, groupId))
                // context.commit(getActionUpdateBoard(board))
            } catch (err) {
                console.log('boardStore: Error in removeGroup', err)
                throw err
            }
        },
    }
}