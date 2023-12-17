function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountsA, accountsB) => (accountsA.name.last > accountsB.name.last ? 1 : -1));
  return accounts
}

function getTotalNumberOfBorrows(accounts, books) {
  let final = 0;

  for (let i = 0; i < books.length; i++) {
    const borrows = books[i].borrows;

    for (let j = 0; j < borrows.length; j++) {
      if (borrows[j].id === accounts.id) {
        ++final;
      }
    }
  }

  return final;
}

function getBooksPossessedByAccount(account, books, authors) {
  let final = [];

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const author = authors.find((author) => author.id === book.authorId);

    if (author) {
      const borrows = book.borrows;

      for (let j = 0; j < borrows.length; j++) {
        if (borrows[j].id === account.id && !borrows[j].returned) {
          final.push({ ...book, author });
        }
      }
    }
  }

  return final;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
