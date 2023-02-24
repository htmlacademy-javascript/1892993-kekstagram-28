// Функция для проверки длины строки
const isMaxLenght = (string, length) => string.length <= length;

isMaxLenght('проверяемая строка', 20); // true
// isMaxLenght('проверяемая строка', 18); // true
// isMaxLenght('проверяемая строка', 10); // false

// Функция для проверки, является ли строка палиндромом
const isPalindrom = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');
  let reverseString = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  return tempString === reverseString;
};

isPalindrom('Лёша на полке клопа нашёл '); // Строка является палиндромом
//isPalindrom('топот'); // true Строка является палиндромом
//isPalindrom('ДовОд'); // true Несмотря на разный регистр, тоже палиндром
//isPalindrom('Кекс');  // false Это не палиндром

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого
// положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
const returnNumber = (string) => {
  if (typeof string === 'number') {
    string = String(string);
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};

returnNumber('2023 год'); //2023
//returnNumber('ECMAScript 2022');     // 2022
//returnNumber('1 кефир, 0.5 батона'); // 105
//returnNumber('агент 007');           // 7
//returnNumber('а я томат');           // NaN
//returnNumber(2023); // 2023
//returnNumber(-1);   // 1
//returnNumber(1.5);  // 15

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами
//  — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало
// строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная,
// она обрезается с конца.
const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;
  if (actualPad <= 0) {
    return string;
  }
  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};

myPadStart('1', 2, '0'); // '01'
//myPadStart('1', 4, '0');      // '0001' Добавочный символ использован три раза
//myPadStart('q', 4, 'werty');  // 'werq' Добавочные символы обрезаны с конца
//myPadStart('q', 4, 'we');     // 'wweq' Добавочные символы использованы полтора раза
//myPadStart('qwerty', 4, '0'); // 'qwerty' Добавочные символы не использованы, исходная строка не изменена
