import InventoryItem from '../models/inventoryItem.js'

async function index(res, next) {
  try {
    // ? get shared inventory items of all users
    const listOfAllSharedInventoryItemsOfAllUsers = await InventoryItem.find({ isShared: true })
      .populate('user')
      .populate('item')
    console.log('listOfAllSharedInventoryItemsOfAllUsers',listOfAllSharedInventoryItemsOfAllUsers)

    // ? filter for unique userIds within listOfAllSharedInventoryItemsOfAllUsers
    const listOfSharingUsersItems = listOfAllSharedInventoryItemsOfAllUsers.filter((item, index) => {
      if (index === 0) {
        return item
      } else {
        return item.user._id !== listOfAllSharedInventoryItemsOfAllUsers[index - 1].user._id
      }
    })

    const listOfItemslistPerUser = []
    for (let i = 0; i < listOfSharingUsersItems.length; i++) {
      // ? create array
      // ? fill it with inventory items of that user
      const listOfUserItems = listOfAllSharedInventoryItemsOfAllUsers.filter((item) => {
        return item.user._id === listOfSharingUsersItems[i].user._id
      })
      // ? add it to new array
      listOfItemslistPerUser.push(listOfUserItems)
    }

    res.status(200).json(listOfItemslistPerUser)
  } catch (error) {
    next(error)
  }
}

export default {
  index,
}