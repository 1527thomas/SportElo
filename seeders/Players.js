import { Seeder } from 'mongoose-data-seed';
import  Player  from '../models/playerModel';
 
const data = [
  {
    name: 'Random Player',
    twitter: 'Random',
    sport: 'basketball',
    picture: 'https://image-cdn.essentiallysports.com/wp-content/uploads/20200725130552/stephen-curry-gsw-2-scaled.jpg'
  },
];
 
class PlayersSeeder extends Seeder {
  async shouldRun() {
    return Player.countDocuments()
      .exec()
      .then(count => count === 0);
  }
 
  async run() {
    return Player.create(data);
  }
}
 
export default PlayersSeeder;