// import React from 'react'

function formatName(fullName) {
  // Convert the full name to lowercase to standardize comparison
  const lowercaseName = fullName.toLowerCase()
  const nameArray = lowercaseName.split(' ') // Split the name into an array of words
  const firstWord = nameArray[0] // Get the first word
  if (nameArray.length === 3) {
    // If the name has three words, capitalize the first and last words
    const middleWord = nameArray[1] // Get the middle word
    return (
      firstWord.charAt(0).toUpperCase() +
      firstWord.slice(1) +
      ' ' +
      middleWord.charAt(0).toUpperCase() +
      middleWord.slice(1) +
      ' ' +
      nameArray[2].charAt(0).toUpperCase() +
      nameArray[2].slice(1)
    )
  }
  if (nameArray.length === 4) {
    // If the name has three words, capitalize the first and last words
    // const middleWord = nameArray[1] // Get the middle word
    return (
      nameArray[0].charAt(0).toUpperCase() +
      nameArray[0].slice(1) +
      ' ' +
      nameArray[1].charAt(0).toUpperCase() +
      nameArray[1].slice(1) +
      ' ' +
      nameArray[2].charAt(0).toUpperCase() +
      nameArray[2].slice(1) +
      ' ' +
      nameArray[3].charAt(0).toUpperCase() +
      nameArray[3].slice(1)
    )
  }
  if (nameArray.length === 5) {
    // If the name has three words, capitalize the first and last words
    // const middleWord = nameArray[1] // Get the middle word
    return (
      nameArray[0].charAt(0).toUpperCase() +
      nameArray[0].slice(1) +
      ' ' +
      nameArray[1].charAt(0).toUpperCase() +
      nameArray[1].slice(1) +
      ' ' +
      nameArray[2].charAt(0).toUpperCase() +
      nameArray[2].slice(1) +
      ' ' +
      nameArray[3].charAt(0).toUpperCase() +
      nameArray[3].slice(1) +
      ' ' +
      nameArray[4].charAt(0).toUpperCase() +
      nameArray[4].slice(1)
    )
  }
  if (nameArray.length === 6) {
    // If the name has three words, capitalize the first and last words
    // const middleWord = nameArray[1] // Get the middle word
    return (
      nameArray[0].charAt(0).toUpperCase() +
      nameArray[0].slice(1) +
      ' ' +
      nameArray[1].charAt(0).toUpperCase() +
      nameArray[1].slice(1) +
      ' ' +
      nameArray[2].charAt(0).toUpperCase() +
      nameArray[2].slice(1) +
      ' ' +
      nameArray[3].charAt(0).toUpperCase() +
      nameArray[3].slice(1) +
      ' ' +
      nameArray[4].charAt(0).toUpperCase() +
      nameArray[4].slice(1) +
      ' ' +
      nameArray[5].charAt(0).toUpperCase() +
      nameArray[5].slice(1)
    )
  }
  if (nameArray.length === 7) {
    // If the name has three words, capitalize the first and last words
    // const middleWord = nameArray[1] // Get the middle word
    return (
      nameArray[0].charAt(0).toUpperCase() +
      nameArray[0].slice(1) +
      ' ' +
      nameArray[1].charAt(0).toUpperCase() +
      nameArray[1].slice(1) +
      ' ' +
      nameArray[2].charAt(0).toUpperCase() +
      nameArray[2].slice(1) +
      ' ' +
      nameArray[3].charAt(0).toUpperCase() +
      nameArray[3].slice(1) +
      ' ' +
      nameArray[4].charAt(0).toUpperCase() +
      nameArray[4].slice(1) +
      ' ' +
      nameArray[5].charAt(0).toUpperCase() +
      nameArray[5].slice(1) +
      ' ' +
      nameArray[5].charAt(0).toUpperCase() +
      nameArray[5].slice(1)
    )
  }

  if (nameArray.length === 2) {
    return (
      firstWord.charAt(0).toUpperCase() +
      firstWord.slice(1) +
      ' ' +
      nameArray[1].charAt(0).toUpperCase() +
      nameArray[1].slice(1)
    )
  }
  // const lastWord = nameArray[nameArray.length - 1]; // Get the last word

  // If the name is already all uppercase, make it all uppercase
//   if (fullName === fullName.toUpperCase()) {
//     return fullName.toUpperCase()
//   }

  // If the name is all lowercase, capitalize each word
  else if (fullName === fullName.toLowerCase()) {
    return fullName.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  // If the name has mixed capitalization, make it all uppercase
  else {
    return fullName.toUpperCase()
  }
}

export function NameFormatter({ fullName }) {
  const formattedName = formatName(fullName)
  return <div>{formattedName}</div>
}
