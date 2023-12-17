function getTotalBooksCount(books) {
return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const borrowedCount = books.reduce((total, book) =>
    total + (book.borrows.some((borrow) => !borrow.returned) ? 1 : 0), 0);

  return borrowedCount;
}





function helper(array, comparator) {
  return array.sort(comparator);
}

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});
  
  const sortedGenres = helper(
    Object.entries(genreCounts),
    (genreA, genreB) => genreB[1] - genreA[1]
  )
    .slice(0, 5)
    .map(([name, count]) => ({name, count}));

  return sortedGenres;
}





function getMostPopularBooks(books) {
  const sortedBooks = helper(
    books,
    (bookA, bookB) => bookB.borrows.length - bookA.borrows.length
  )
    .slice(0, 5)
    .map(({ title, borrows }) => ({ name: title, count: borrows.length }));

  return sortedBooks;
}





function getMostPopularAuthors(books, authors) {
  const authorBorrows = authors.map((author) => {
    const authorBooks = books.filter((book) => book.authorId === author.id);
    const authorBorrowCount = authorBooks.reduce(
      (acc, book) => acc + book.borrows.length,
      0
    );
    return { ...author, borrowCount: authorBorrowCount };
  });

  const sortedAuthors = helper(
    authorBorrows,
    (authorA, authorB) => authorB.borrowCount - authorA.borrowCount
  )
    .slice(0, 5)
    .map(({ name, borrowCount }) => ({
      name: `${name.first} ${name.last}`,
      count: borrowCount,
    }));

  return sortedAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
