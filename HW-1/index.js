const { program } = require('commander');
const contacts = require('./db/contacts');

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.list();
      console.log(allContacts);
      break;

    case "get":
      const oneContact = await contacts.get(id);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.add({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.remove(id);
      console.log(deleteContact);
      break;
  
    case "update":
      const updateContact = await contacts.update(id, {name, email, phone });
      console.log(updateContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
.option('-a, --action <type>')
.option('-i, --id <type>')
.option('-n, --name <type>')
.option('-e, --email <type>')
.option('-p, --phone <type>')

program.parse();

const options = program.opts(); 

invokeAction(options);