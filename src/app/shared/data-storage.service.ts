import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient, private receipeService: RecipeService, private authService: AuthService) {}

    storeRecipes() {
        const recipes = this.receipeService.getRecipes();

        this.http.put('https://angular-recipes-app-vronney.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(recipes);
            });
    }

    fetchRecipes() {
            return this.http.get<Recipe[]>('https://angular-recipes-app-vronney.firebaseio.com/recipes.json',)
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }), tap(receipes => {
                    this.receipeService.setRecipes(receipes);
                })
            );
    }
}
