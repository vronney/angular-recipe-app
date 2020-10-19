import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Tasty Schnitzal',
    //         'A super-tasty Scnitzal - just awesome!',
    //         'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('French Fries', 20),
    //             new Ingredient('Lemons', 2)
    //         ]),
    //     new Recipe(
    //         'Big Fat Burger',
    //         'What else you need to say?',
    //         'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //         [
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Lettuce', 1),
    //             new Ingredient('Tomato', 3),
    //             new Ingredient('Pickles', 4)
    //         ]),
    //     new Recipe(
    //         'Yummy French Toast',
    //         'Perfect in the morning or at any time!',
    //         './../../assets/images/french_toast.jpeg',
    //         [
    //             new Ingredient('Bread', 2),
    //             new Ingredient('banana', 1),
    //             new Ingredient('Blue Berries', 10),
    //             new Ingredient('Syrup', 10),
    //             new Ingredient('Powdered Sugar', 1)
    //         ]),
    //     new Recipe(
    //         'Slurpee Spaghetti',
    //         'Enjoy a tasty of Italy',
    //         './../../assets/images/spaghetti.jpeg',
    //         [
    //             new Ingredient('Spaghetti', 4),
    //             new Ingredient('Spaghetti Sauce', 1),
    //             new Ingredient('Italian Meat Balls', 4),
    //             new Ingredient('Garlic Bread', 2)
    //         ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
