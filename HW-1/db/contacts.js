const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
// const contacts = require('./contacts.json');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateContacts = async (contacts)=> await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const list = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const get=async (contactId)=> {
  const contacts = await list();
  const strId = String(contactId);

  const result = contacts.find(contact => contact.id === strId);
  return result||null;
}

const remove = async (contactId) => {
  const contacts = await list();
  const strId = String(contactId);
  const index = contacts.findIndex(contact => contact.id === strId);  

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

const add = async(data)=> {
  const contacts = await list();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);

  await updateContacts(contacts);
  return newContact;
}

const update = async (id, body) => {
  const contacts = await list();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };

  await updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  list,
  get,
  remove,
  add,
  update
  // contacts,
};