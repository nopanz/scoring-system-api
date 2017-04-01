'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')
// Aut token
Route.post('/user/auth', 'UserController.index')
Route.post('/judge', 'JudgeController.index')

Route.group('authenticated', () => {
  Route.get('/user', 'UserController.getUser')
  Route.post('/pageant', 'PageantController.index')
  Route.get('/pageant/:pageantId', 'PageantController.getPageant')
  Route.get('/pageant', 'PageantController.getPageants')
  Route.post('/judge', 'JudgeController.index')
}).middleware('bearer')

