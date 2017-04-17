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

Route.group('authenticated', () => {
  Route.get('/user', 'UserController.getUser')
  Route.post('/pageant', 'PageantController.index')
  Route.get('/pageant/:pageantId', 'PageantController.getPageant')
  Route.get('/pageant', 'PageantController.getPageants')
  Route.post('/pageant/:pageantId/judge', 'JudgeController.index')
  Route.get('/pageant/:pageantId/judges', 'JudgeController.getJudges')
  Route.post('/pageant/:pageantId/contestant', 'ContestantController.index')
  Route.get('/pageant/:pageantId/contestant', 'ContestantController.getContestants')
  Route.put('/score/:pageantId/:contestantId', 'ScoreController.index')
}).middleware('bearer')

