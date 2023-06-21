// export const fetchCards = async (page) => {
//     try {
//       const response = await fetch('./data/cards.json');
//       if (!response.ok) {
//         throw new Error('Failed to fetch card data');
//       }
//       const data = await response.json();
//       return data.data;
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };
// import cardsData from '../data/cards.json';

// export const fetchCards = async (page) => {
//   try {
//     // Simulate an asynchronous operation
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     // Pagination logic
//     const pageSize = 10;
//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const cards = cardsData.slice(startIndex, endIndex);

//     return cards;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };
