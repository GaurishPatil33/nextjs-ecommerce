
// export default function Filters() {
//   return (
//     <>
//       {/* <Stack gap="sm">
//         <Radio.Group name="discount" label="Discount %">
//           <Radio value="10" label="10% & up" styles={{ icon: { width: 0 } }} />
//           <Radio value="20" label="20% & up" />
//           <Radio value="30" label="30% & up" />
//         </Radio.Group>

//         <Checkbox value="p" label="checkboxx" />
//       </Stack> */}

//       {/* Categories */}
//       {/* <div>
//             <h3 className="font-semibold mb-2">CATEGORIES</h3>
//             {categories.map((cat) => (
//               <label key={cat} className="block text-sm">
//               <input
//               type="checkbox"
//               className="mr-2"
//               checked={selectedCats.has(cat)}
//               onChange={() => {
//                 updateParam("cat", selectedCats.has(cat) ? undefined : cat);
//                 }}
//                 />
//                 {cat}
//                 </label>
//             ))}
//             </div> */}

//       {/* Brands */}
//       {/* <div>
//             <h3 className="font-semibold mb-2">BRANDS</h3>
//             {brands.map((b, i) =>
//             b ? (
//               <label key={`${b}-${i}`} className="block text-sm">
//               <input
//               type="checkbox"
//               value={b}
//               checked={searchParams.getAll("brand").includes(b)}
//               onChange={() =>
//               updateMultiParam(
//                 "brand",
//                 Array.from(selectedBrands.has(b) ? "" : b)
//                 )
//                 }
//                 className="mr-2"
//                 />
//                 {b}
//                 </label>
//                 ) : null
//                 )}
//                 </div> */}

//       {/* Price Range */}
//       {/* <div>
//             <h3 className="font-semibold mb-2">PRICE</h3>
//             <div className="flex gap-1">
//             <input
//             type="number"
//             value={selectedMinPrice}
//             min={priceBounds.min}
//             max={priceBounds.max}
//             className="w-1/2 border px-2 py-1 rounded"
//             onBlur={(e) => updateParam("minPrice", e.target.value)}
//             onChange={() => {}}
//             />
//             <input
//             type="number"
//             value={selectedMaxPrice}
//             min={priceBounds.min}
//             max={priceBounds.max}
//             className="w-1/2 border px-2 py-1 rounded"
//             onBlur={(e) => updateParam("maxPrice", e.target.value)}
//             onChange={() => {}}
//               />
//               </div>
//               </div> */}

//       {/* Colors */}
//       {/* {colors.length > 0 && (
//             <div>
//             <h3 className="font-semibold mb-2">COLOR</h3>
//             {colors.map((col) => (
//               <label key={col} className="block text-sm">
//               <input
//               type="checkbox"
//               className="mr-2"
//               checked={selectedColors.has(col)}
//               onChange={() =>
//               updateParam(
//                 "color",
//                 selectedColors.has(col) ? undefined : col
//                 )
//                 }
//                 />
//                 {col}
//                 </label>
//                 ))}
//                 </div>
//                 )} */}

//       {/* Discount */}
//       {/* <div>
//             <h3 className="font-semibold mb-2">DISCOUNT %</h3>
//             {discountRanges.map((d) => (
//               <label key={d} className="block text-sm">
//               <input
//               type="radio"
//               name="discount"
//               className="mr-2"
//               checked={selectedDiscount === d}
//               onChange={() => updateParam("discount", d.toString())}
//               />
//               {d}% & up
//               </label>
//               ))}
//               </div> */}

//       {[...Array(4)].map((_,i) => (i+1)).reverse().map(a=>console.log(a))}
//     </>
//   );
// }
