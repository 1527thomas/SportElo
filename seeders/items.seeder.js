import { Seeder } from 'mongoose-data-seed';
import { Item } from '../models/itemsModel';

const data = [
  {
    name: "Water",
    msg: "worked"
  }
];

class ItemsSeeder extends Seeder {

  async shouldRun() {
    return Item.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Item.create(data);
  }
}

export default ItemsSeeder;
