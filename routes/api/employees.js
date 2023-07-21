const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        });
    })
    .delete((req, res) => {
        res.json({ "id": req.body.id })
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ "id": req.params.id });
    });

module.exports = router;

// let pets: string[] = ['sameer', 'khizer'];
// let per: Array<string> = ['yes', 'loop'];

// let wizard: object = {
//     a: 'john',
// };

// //*tuple defines the exact number of elements we can have and their types as well
// let basket: [string, number];
// basket = ['wamee', 23];

// //we can use the differenet dsa and kinds usefull if we have the fixed numbe rof
// enum size {
//     smal = 1,
//     larger = 2,
// }

// let szieName: string = size[2];
// let signature: number = size.larger;

// console.log(szieName, signature);

// let sing = (): void => { };

// let nevers = (): never => {
//     throw new Error('Not implemented');
// };

// //interface
// interface RobotFace {
//     count: number;
//     type: string;
//     magic?: string;
// }

// let fightArmy = (robot: RobotFace) => {
//     console.log('sameer');
// };

// fightArmy({ count: 23, type: 'sameer' });
// //*we can override this
// interface catArmy {
//     name: string;
//     books: number;
// }

// let cat = {} as catArmy;
// cat.books = 23;

// class Aimal {
//     private sing: string;

//     constructor(sound: string) {
//         this.sing = sound;
//     }

//     greet(): string {
//         return `hello ${this.sing}`;
//     }
// }

// const obj = new Aimal('llllllllooooopppp');
// obj.greet();