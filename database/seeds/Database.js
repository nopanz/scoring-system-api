'use strict'

/*
|--------------------------------------------------------------------------
| Database Seeder
|--------------------------------------------------------------------------
| Database Seeder can be used to seed dummy data to your application
| database. Here you can make use of Factories to create records.
|
| make use of Ace to generate a new seed
|   ./ace make:seed [name]
|
*/

// const Factory = use('Factory')
const User = use('App/Model/User')
const Role = use('App/Model/Role')

class DatabaseSeeder {

  * run () {
    // yield Factory.model('App/Model/User').create(5)
    const roles = yield Role.createMany([{role: 'administrator'}, {role: 'judge'}])

    const user = yield User.create({
      firstName: 'Rey',
      lastName: 'Aleonar',
      email: 'reyaleonar@gmail.com',
      password: 'aleonarpogi28'
    })

    const adminRole = yield Role.query().where({role: 'administrator'}).first()

    yield adminRole.user().save(user)
  }

}

module.exports = DatabaseSeeder
