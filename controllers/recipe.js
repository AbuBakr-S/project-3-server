// ? get all recipes
// ? for every recipe, 
// ? check if you can find
// ? item of ingredients.listOfRecipeItem
// ? in the list of inventoryItem

// ? if (! listOfInventoryItems.contains(ingredients.listOfRecipeItem[index]) ) {
// return
// }

import InventoryItem from '../models/inventoryItem.js'
import Recipe from '../models/recipe.js'

async function checkForRecipe(req, res, next) {
  try {
    // ? get all inventoryItems
    const currentUserId = req.currentUser._id
    const inventoryItemList = await InventoryItem.find({ user: `${currentUserId}` }).populate('item')

    // ? get all recipes
    const recipeList = await Recipe.find()
    // ? either found recipe or false
    let foundRecipe
    // ? always the current recipe looked at
    let recipe

    // ! recode the logic with array.filter()
    for (let index = 0; index < recipeList.length; index++) {
      recipe = recipeList[index]
      for (let index = 0; index < recipe.ingredients.length; index++) {
        if (
          (inventoryItemList.find(inventoryItem => inventoryItem.item.name === recipe.ingredients[index].name)) === undefined
        ) {
          foundRecipe = false
          return
        } else {
          foundRecipe = recipe
        }
      }
    }

    if (foundRecipe) {
      return res.status(401).json({ message: 'No recipe found' })
    }

    res.status(200).json(foundRecipe)
  } catch (error) {
    next(error)
  }
}



async function index(req,res,next){
  try {
    const recipeList = await Recipe.find()

    res.status(200).json(recipeList)
  } catch (e){
    next(e)
  }
}

async function show(req, res,next) {
  try   {
    const id = (req.params.recipeId)
    const recipe = await  Recipe.findById(id)
    
    if (!recipe){
      console.log('No recipe found')
    }

    res.status(200).json(recipe)
  } catch (e) {
    next(e)
  }
}


export default {
  checkForRecipe,
  index,
  show,
}



