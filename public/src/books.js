function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);

}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {

  const  hats=books.filter(book => book.borrows.some(borrow=>borrow.returned==false));
  const  hat2=books.filter(book => book.borrows.every(borrow=>borrow.returned==true));

  return [hats, hat2]
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  
  const borrowersInfo = borrows.map(borrow => {
    const account = accounts.find(acc => acc.id === borrow.id);
    return {
      ...borrow,
      ...account,
    };
  });

  const limitedBorrowers = borrowersInfo.slice(0, 10);

  return limitedBorrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
