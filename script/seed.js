'use strict'

const db = require('../server/db')

const {
  User,
  Address,
  Product,
  Reviews,
  Category
} = require('../server/db/models')

const users = [
  {
    firstName: 'Keyairra',
    lastName: 'Wright',
    email: 'kwright@email.com',
    password: 'keyairra123',
    adminStatus: true
  }
]
const products = [
  {
    title: 'Cook a Duck',
    price: 45.5,
    imgUrl: 'https://i.ibb.co/sq0Zv68/cook-a-duck.jpg',
    description:
      'Learn how to cook a duck in the french style.  Impress your friends and neighbors.  Even the neighbors who are not your friends.',
    quantity: 6
  },
  {
    title: 'Addictive Seaseme Chicken',
    price: 35.0,
    imgUrl: 'https://i.ibb.co/qnmmJSK/addictive-seaseme.jpg',
    description:
      "This chicken is incredible. It is so tender, that you're partner will eat double the amount and break his gym diet goals!",
    quantity: 10
  },
  {
    title: 'General Tao Chicken',
    price: 45.0,
    imgUrl: 'https://i.ibb.co/6NByHzt/general-tao.jpg',
    description:
      "You may not be in the military, but this recipe's general's oyster sauce will command your dinner plate for the night!",
    quantity: 10
  },
  {
    title: 'Pan-Fried Chinese Pancakes',
    price: 30.0,
    imgUrl: 'https://i.ibb.co/2YhCShT/pan-fried-pancakes.jpg',
    description:
      "A savory dough is sprinkled with green onions and seasame oil. Even Grace Hopper instructors can't resist this recipe!",
    quantity: 10
  },
  {
    title: 'Slow Cooker Chicken Mole',
    price: 35.0,
    imgUrl: 'https://i.ibb.co/8KXk3hf/slow-cooker-chicken-mole.jpg',
    description:
      "Shred the chicken so it will soak up all the yummy mole! Your friends will think you're a better chef with this recipe!",
    quantity: 10
  },
  {
    title: 'Chicken Tortilla Soup',
    price: 40.0,
    imgUrl: 'https://i.ibb.co/8KXk3hf/slow-cooker-chicken-mole.jpg',
    description:
      'This soups is quick to make, flavorful, and filling - a great meal for computer programmers on the go!',
    quantity: 10
  },
  {
    title: 'Enchiladas Suizas',
    price: 32.75,
    imgUrl: 'https://i.ibb.co/2jnpMVT/enchiladas-suizas.jpg',
    description:
      "Following this recipe will be great for data night! Just don't spill any of the cheese on your pants. No one likes cheese pants.",
    quantity: 10
  },
  {
    title: 'Southern Shrimp and Grits',
    price: 37.95,
    imgUrl: 'https://i.ibb.co/ZxgYXHJ/southern-shrimp-grits.jpg',
    description:
      'A southern specialty, sometimes called breakfast shrimp. This dish tastes better than passing the senior checkpoint!',
    quantity: 10
  },
  {
    title: 'Chicken Okra Gumbo',
    price: 42.55,
    imgUrl: 'https://i.ibb.co/JpbnS8N/chicken-okra-gumbo.jpg" ',
    description:
      "This recipe's creator used to live in New Orleans. But your taste buds won't ever know about the move. Get this recipe today!",
    quantity: 10
  },
  {
    title: 'Jalapeno Buttermilk Cornbread',
    price: 25.99,
    imgUrl: 'https://i.ibb.co/2gW5TxY/jalapeno-buttermilk-cornbread.jpg',
    description:
      "If you are from the South, then you probably have a good cornbread recipe. For everyone else, we've got you covered!",
    quantity: 10
  },
  {
    title: 'React Expertise',
    price: 500,
    imgUrl: 'https://i.ibb.co/8YWDqnc/react-expertise.png',
    description: 'Instantly become an expert at React.  Redux costs extra',
    quantity: 1
  },
  {
    title: 'Language',
    price: 25.0,
    imgUrl: 'https://i.ibb.co/8mG1G0Y/languages.png',
    description:
      'It may seem obvious, but in order to write code, you’ll have to learn at least one programming or scripting language. ',
    quantity: 10
  },
  {
    title: 'Self-Reliance',
    price: 25.0,
    imgUrl: 'https://i.ibb.co/M2LNrgJ/self-reliance.png',
    description:
      'This one is huge. When you start out coding, it can feel completely overwhelming. Should you focus on front end or back end? What programming languages should you use? Get a dose of self-reliance, and you will be able to answer these questions.',
    quantity: 10
  },
  {
    title: 'Logic',
    price: 55.0,
    imgUrl: 'https://i.ibb.co/27TTyVd/logic.jpg',
    description:
      'Love proofs? Live to assess the facts at hand and come to useful conclusions for problem solving? You may have a skeleton in one of the most important skills for coders.',
    quantity: 10
  },
  {
    title: 'Attention to Detail',
    price: 20.05,
    imgUrl: 'https://i.ibb.co/M6ksvwN/attention-to-detail.png',
    description:
      "Get up off that thang. Dance 'til you feel better! Did you notice that this was a song lyric? If not, get some attention to detail in order to improve your coding skills today! We believe in you.",
    quantity: 10
  },
  {
    title: 'Recognition of Stupidity',
    price: 19.95,
    imgUrl: 'https://i.ibb.co/HCKGV1v/recognition-of-stupidity.jpg',
    description:
      'Computers are dumb, and ruthless. Their strength is their processing power, not independent or creative thought. Learn all about that with this discounted item!',
    quantity: 10
  },
  {
    title: 'Abstract Thinking',
    price: 35.75,
    imgUrl: 'https://i.ibb.co/6b49dHB/abstract-thinking.jpg',
    description:
      'Abstract thinking is thinking done without the object of the thought present, or even physical. It’s a foundation of coding.',
    quantity: 10
  },
  {
    title: 'Patience',
    price: 45.0,
    imgUrl: 'https://i.ibb.co/84rr5JP/patience.jpg',
    description: 'Patience. You need it. Trust us.',
    quantity: 10
  },
  {
    title: 'Memory',
    price: 40.0,
    imgUrl: 'https://i.ibb.co/sRwr6bB/memory.jpg',
    description:
      'There are some many docs! Where will you look for your coding challenges? Put as much as you can into your own memory, and you will code along for miles!',
    quantity: 10
  },
  {
    title: 'Communication',
    price: 55.0,
    imgUrl: 'https://i.ibb.co/Bg0n2nr/communication.jpg',
    description:
      'Programmers need to be able to communicate well. Just try making a group project like grace-shopper without it!',
    quantity: 10
  },
  {
    title: 'Intermediate Piano',
    price: 75.0,
    imgUrl: 'https://i.ibb.co/7tB2J3j/intermediate-piano.jpg',
    description:
      'Tired of playing Heart & Soul? Up your piano skills to include Fur Elise, Elvin Dance, and the Spinning Song',
    quantity: 12
  },
  {
    title: 'Beginner Piano',
    price: 100.0,
    imgUrl: 'https://i.ibb.co/9V7F9xb/beginner-piano.jpg',
    description:
      'If you do not know how to play the piano, no worries. Spend money on this item and be a pro of Mary Had a Little Lamb in no time!',
    quantity: 10
  },
  {
    title: 'Guitar Lessons',
    price: 95.0,
    imgUrl: 'https://i.ibb.co/1LvpV7K/guitar-lessons.jpg',
    description:
      'Jimi Hendrick said "Music doesn\'t lie. If there is something that needs to be changed in this world, then it can only happen through music."',
    quantity: 10
  },
  {
    title: 'Saxophone Jazzy Times',
    price: 85.99,
    imgUrl: 'https://i.ibb.co/1GT5FQ2/saxophone-lessons.jpg',
    description:
      'The potential for the saxophone is unlimited. If you like an instrument that sings, play the saxophone.',
    quantity: 10
  },
  {
    title: 'Toot Toot Flute Lessons',
    price: 75.0,
    imgUrl: 'https://i.ibb.co/b59fyZ9/flute-lesson.jpg',
    description:
      "The flute of the infinite is played without ceasing, and it's sound is love. ",
    quantity: 10
  },
  {
    title: 'Singing Lessons',
    price: 200.99,
    imgUrl: 'https://i.ibb.co/gvw0mbv/singing-lesson.jpg',
    description:
      'The late Aretha Franklin beleived that politics were not her arena. Music was. Be like Aretha and learn to sing with this fine item!',
    quantity: 10
  },
  {
    title: 'Violin Lessons',
    price: 50.95,
    imgUrl: 'https://i.ibb.co/nR03yJZ/violin-lesson.jpg',
    description:
      'The soul is like a violin string: it makes music only when it is stretched.',
    quantity: 10
  }
]
const addresses = [
  {
    street: '123 M Ave',
    city: 'Cityville',
    state: 'OK',
    zipCode: 12345,
    userId: 1
  }
]
const reviews = [
  {
    title: 'great product',
    text:
      'I love this product so much, it makes my heart soar and my eyes fill with tears of joy',
    stars: 4,
    userId: 1,
    productId: 1
  },
  {
    title: 'eh',
    text: 'this was a nice skill, but it did not save my marriage',
    stars: 3,
    userId: 1,
    productId: 2
  },
  {
    title: 'I think I ordered the wrong thing',
    text:
      'I thought I was ordering a meal for delivery, but instead now I know how to cook it?? Very weird, but cool',
    stars: 5,
    userId: 1,
    productId: 3
  },
  {
    title: 'Tres Bien!',
    text: 'I love this product! I feel so french!',
    stars: 5,
    userId: 1,
    productId: 1
  }
]
const categories = [{title: 'Cooking'}, {title: 'Coding'}, {title: 'Inspiration'}]

let createdProducts
let createdCategories

function seed() {
  return Promise.all(users.map(user => User.create(user)))
    .then(() => Promise.all(products.map(product => Product.create(product))))
    .then(newProducts => {
      createdProducts = newProducts
      return Promise.all(addresses.map(address => Address.create(address)))
    })
    .then(() => Promise.all(reviews.map(review => Reviews.create(review))))
    .then(() =>
      Promise.all(categories.map(category => Category.create(category)))
    )
    .then(newCategories => {
      createdCategories = newCategories
      const newOne = createdProducts[0].addCategories(createdCategories[0])
      const newTwo = createdProducts[1].addCategories(createdCategories[0])
      const newThree = createdProducts[2].addCategories(createdCategories[0])
      const newFour = createdProducts[3].addCategories(createdCategories[0])
      const newFive = createdProducts[4].addCategories(createdCategories[0])
      const newSix = createdProducts[5].addCategories(createdCategories[0])
      const newSeven = createdProducts[6].addCategories(createdCategories[0])
      const newEight = createdProducts[7].addCategories(createdCategories[0])
      const newNine = createdProducts[8].addCategories(createdCategories[0])
      const newTen = createdProducts[9].addCategories(createdCategories[0])

      const newEleven = createdProducts[10].addCategories(createdCategories[1])
      const newTwelve = createdProducts[11].addCategories(createdCategories[1])
      const newThirteen = createdProducts[12].addCategories(createdCategories[1])
      const newFourteen = createdProducts[13].addCategories(createdCategories[1])
      const newFifteen = createdProducts[14].addCategories(createdCategories[1])
      const newSixteen = createdProducts[15].addCategories(createdCategories[1])
      const newSeventeen = createdProducts[16].addCategories(createdCategories[1])
      const newEighteen = createdProducts[17].addCategories(createdCategories[1])
      const newNineteen = createdProducts[18].addCategories(createdCategories[1])
      const newTwenty = createdProducts[19].addCategories(createdCategories[1])

      const newTwentyOne = createdProducts[20].addCategories(createdCategories[2])
      const newTwentyTwo = createdProducts[21].addCategories(createdCategories[2])
      const newTwentyThree = createdProducts[22].addCategories(createdCategories[2])
      const newTwentyFour = createdProducts[23].addCategories(createdCategories[2])
      const newTwentyFive = createdProducts[24].addCategories(createdCategories[2])
      const newTwentySix = createdProducts[25].addCategories(createdCategories[2])
      const newTwentySeven = createdProducts[26].addCategories(createdCategories[2])
     
      return newOne, newTwo, newThree, newFour, newFive, newSix, newSeven, newEight, newNine, newTen,
      newEleven, newTwelve, newThirteen, newFourteen, newFifteen, newSixteen, newSeventeen,
      newEighteen, newNineteen, newTwenty, newTwentyOne, newTwentyTwo, newTwentyThree, newTwentyFour, 
      newTwentyFive, newTwentySix, newTwentySeven
    })
    .catch(error => console.error(error))
}

async function runSeed() {
  console.log('seeding...')
  await db.sync({force: true})
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
