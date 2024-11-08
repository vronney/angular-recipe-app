import { Recipe } from './../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Classic Tomato Soup',
            'Homemade tomato soup with simple, fresh ingredients. Perfect comfort food!',
            'assets/images/Classic_tomotoe_soup.png',
            [
                new Ingredient('Roma Tomatoes', 3),
                new Ingredient('Yellow Onion', 1),
                new Ingredient('Carrots', 2),
                new Ingredient('Celery Stalks', 2),
                new Ingredient('Garlic Cloves', 3),
                new Ingredient('Chicken Stock', 4),
                new Ingredient('Heavy Cream', 1),
                new Ingredient('Fresh Basil', 1)
            ],
            `1. Saute vegetables: Heat olive oil in a pot over medium heat. Add chopped onion, carrots, and celery. Cook until softened (8-10 mins).
                2. Add aromatics: Add minced garlic and cook for 1 minute until fragrant.
                3. Add tomatoes: Add diced tomatoes with their juice. Cook 8-10 mins until tomatoes soften.
                4. Add liquids: Pour in chicken stock and bring to a boil. Reduce heat, cover and simmer 20-25 mins.
                5. Blend: Use an immersion blender to puree until smooth.
                6. Finish: Stir in heavy cream and chopped fresh basil. Season with salt and pepper to taste.`
        )
        // ... you can keep or remove other existing recipes ...
    ];

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
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}
