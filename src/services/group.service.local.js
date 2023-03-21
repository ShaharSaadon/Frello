
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'group_db'

export const groupService = {
    query,
    getById,
    save,
    remove,
    getEmptyGroup,
}
window.cs = groupService


async function query(filterBy = { txt: ''}) {
    var groups = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        groups = groups.filter(group => regex.test(group.title))
    }
    return groups
}

function getById(groupId) {
    return storageService.get(STORAGE_KEY, groupId)
}

async function remove(groupId) {
    await storageService.remove(STORAGE_KEY, groupId)
}

async function save(group) {
    var savedGroup
    if (group._id) {
        savedGroup = await storageService.put(STORAGE_KEY, group)
    } else {
        // Later, owner is set by the backend
        group.creator = userService.getLoggedinUser()
        savedGroup = await storageService.post(STORAGE_KEY, group)
    }
    return savedGroup
}

function getEmptyGroup() {
    return {
        title: '',
        tasks: [],
        style: {}
        // price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Karov 1', price: 180})
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
// })()