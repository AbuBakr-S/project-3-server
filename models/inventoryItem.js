// ? Tell mongoose what a valid inventoryItem should be
import mongoose from 'mongoose'

const InventoryItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.ObjectId, ref: 'Item', required: true },
  quantity: { 
    type: Number, 
    required: true,
    validate: [
      { validator: (type) => (type > 0) }
    ], 
  },
  expiryDate: { 
    type: Date, 
    required: true,
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  // ? This will indicate whether an inventory item has been shared
  // ? Default to false for all items in the user's inventory
  isShared: {
    type: Boolean,
    default: false,
    required: false,
  },
})

// ? Export the model as an Item
export default mongoose.model('InventoryItem', InventoryItemSchema)


