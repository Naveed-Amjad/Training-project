// const handleFileInputChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       console.log('Selected file:', file);
//       setFileData(file);
//       const newBulkProducts = [];
//       fileReader.onload = function (event) {
//         const text = event.target.result;
//         const rows = text.split('\n');
//         console.log(text, rows);
//         if (rows.length > 0) {
//           for (let i = 0; i < rows.length - 1; i++) {
//             if (i === 0) {
//               const firstRow = rows[i].trim();
//               const header = firstRow.split(',');
//               console.log(header);
//             }
//             else {
//               const newData = rows[i].split(',');
//               newBulkProducts.push(newData);
//             }
//           }
//           setBulkProducts(newBulkProducts);
//         }
//       };
//       fileReader.readAsText(file);
//     }
//   };

//   const addBulkProducts = () =>{
//     dispatch(AddBulkProduct(bulkProducts));
//     handleBulkProduct();
//   };
