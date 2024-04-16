const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];

// binary search function
function binarySearch(list, target) {
  let left = 0;
  let right = list.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (list[mid] === target) {
      return mid;
    } else if (list[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// find odd numbers
function findOddNumber(list) {
  const oddNumbers = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i] % 2 === 1) {
      oddNumbers.push(list[i]);
    }
  }
  return oddNumbers;
}

// find odd numbers with binary search
function findOddNumberWithBinarySearch(list) {
  const oddNumbers = [];
  for (let i = 0; i < list.length; i++) {
    if (binarySearch(list, list[i]) !== -1) {
      oddNumbers.push(list[i]);
    }
  }
  return oddNumbers;
}

// test findOddNumber function
test('findOddNumber should return an array of odd numbers', () => {
  const result = findOddNumber(numbers);
  expect(result).toEqual([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25]);
});

// test findOddNumberWithBinarySearch function
test('findOddNumberWithBinarySearch should return an array of odd numbers', () => {
  const result = findOddNumberWithBinarySearch(numbers);
  expect(result).toEqual([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25]);
});