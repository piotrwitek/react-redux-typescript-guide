// Nominal Typing
// Usefull to model domain concepts that are using primitive data type for it's value

// Method 1: using "interface"
export interface Name extends String {
  _brand: 'Name';
}
const createName = (name: string): Name => {
  // validation of business rules
  return name as any;
};

// Method 2: using "type"
type Surname = string & { _brand: 'Surname' };
const createSurname = (surname: string): Surname => {
  // validation of business rules
  return surname as any;
};

type Person = {
  name: Name;
  surname: Surname;
};

const person: Person = {
  name: createName('Piotr'),
  surname: createSurname('Witek'),
};

// Type system will ensure that the domain objects can only contain correct data
// person.name = 'Karol'; // error
// person.name = person.surname; // error
person.name = createName('Karol'); // OK!
// person.surname = 'Mate'; // error
// person.surname = person.name; // error
person.surname = createSurname('Mate'); // OK!

// easy casting to supertype
export let str: string;
str = person.name.toString(); // Method 1 & Method 2
str = person.surname; // Method 2 only
