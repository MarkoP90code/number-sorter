

//1.
const sortButton = document.getElementById("sort");

//2.
const sortInputArray = (event) => {
    event.preventDefault();             //Step 3. - You will be using this as an event listener for the sortButton. Because buttons associated with a form element submit by default, you need to prevent that behavior. Call event.preventDefault() in your function to do this.
    const inputValues = [...document.getElementsByClassName("values-dropdown")].map((dropdown) => Number(dropdown.value));     //* objanjenje dole. Procitati sve. Step 5. - Back in your sortInputArray function, you need to get the values from your select elements. Since they all have the class values-dropdown, you can query them all at once. Use document.getElementsByClassName() to get all the elements with the class values-dropdown. Assign that to an inputValues variable.    Step 6. - Remember that .getElementsByClassName() returns an array-like object. You can use the spread operator to convert it into an array. Convert the document.getElementsByClassName() call to an array with the spread operator and assign it to a variable called inputValues.
    const sortedValues = inputValues.sort((a, b) => {            //U 5. koraku imam bubbleSort, a u 6. selectionSort funkciju, a u 7. insertionSort. Mogu bilo koju od te tri opcije da pozovem ovde. Ovako npr insertionSort(inputValues);. A mogu i da koristim sort(). Samo sort() radi u ovom slucaju ali za vece brojeve se gubi. Zato sam dodao i ovo u zagradi, to resva problem ako su brojevi ja vise cifara. Da sam recimo umesto 1 imao 10 i dalje bi ga stavio na pocetak jer sort pretvara froj u string i onda 10 vidi kao manji od 2.
        return a - b;
      });                  
    updateUI(sortedValues);          //U 4. koraku.
};

//3.
sortButton.addEventListener("click", sortInputArray);

//4.
const updateUI = (array = []) => {                                          //Step 8. - ou need a function to update the display with the sorted numbers. Start by using arrow syntax to declare an updateUI function that takes a single array parameter. Because you will be writing algorithms that won't immediately have a return value, set a fallback value for array to be an empty array. Here is an example of a function that has a fallback value:
    array.forEach((num, i) => {                                             //Step 9. - To perform an action on each element in the array, use the method that is meant for iterating over arrays. Use the forEach() method, and pass it an empty callback which takes num and i as the parameters.
        const outputValueNode = document.getElementById(`output-value-${i}`);   //Ovde izgleda za i uzima index of the current element. https://www.w3schools.com/jsref/jsref_foreach.asp
        outputValueNode.innerText = num;
    })               
};   

//5.   OVO JE FUNKCIJA KOJA SORTIRA BROJEVE OD NAJMANJEG DO NAJVECEG.    mogu console.log() da ubacujem da vidim sta se desava.
const bubbleSort = (array) => {                 //Now you need to actually sort the array. The first sorting algorithm you will implement is the bubble sort, which starts at the beginning of the array and 'bubbles up' unsorted values towards the end, iterating through the array until it is completely sorted. Begin by declaring a bubbleSort variable and assigning it an arrow function that takes an array parameter.
    for (let i = 0; i < array.length; i++){                 //Step 14. - You'll need to iterate through the array. For simplicity, use a for loop to do so.
        for (let j = 0; j < array.length - 1; j++) {        //Step 15. Because you need to compare elements, you'll need to use a nested for loop. This loop should iterate through every element in the array except the last one. Use j as your inner loop's iterator variable.
            if (array[j] > array[j + 1]){           //When your if condition is true, you need to swap the two elements, "bubbling" the larger element up toward the end of the array. To do this, declare a temp variable and assign it the value of array[j]. Then assign array[j] the value of array[j + 1]. Finally, assign array[j + 1] the value of temp.
                const temp = array[j];          //a=1 b=2;  c=a   Ovo je objasnjenje. Samo sam im zamenuo mesta.
                array[j] = array[j + 1];                  //a=b
                array[j + 1] = temp;                      //b=c
            }
        }
    }
    return array;       //Vraca uredjen array.
};


//6. - DRUGI NACIN - Time to implement another sorting algorithm. This time, you'll be implementing a selection sort. Selection sort works by finding the smallest value in the array, then swapping it with the first value in the array. Then, it finds the next smallest value in the array, and swaps it with the second value in the array. It continues iterating through the array until it is completely sorted. Start by declaring a selectionSort variable and assigning it an arrow function that takes an array parameter.
const selectionSort = (array) => {                          
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        
        for (let j = i+1; j < array.length; j++) {
        if ( array[j] < array[minIndex] ) {
            minIndex = j;
          }
        }
        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
    return array;
}


//7. - TRECI NACIN - The last sorting algorithm you will implement is the insertion sort. This algorithm works by building up a sorted array at the beginning of the list. It begins the sorted array with the first element. Then it inspects the next element and swaps it backward into the sorted array until it is in a sorted position, and so on. Start by declaring an insertionSort variable and assigning it an arrow function which takes an array parameter.
const insertionSort = (array) => {              //**OBJASNJENJE DOLE.
    for (let i = 1; i < array.length; i++) {        //Objasnjenje zasto i pocinje od 1. An insertion sort algorithm starts the sort at the beginning of the list, meaning the first element is already sorted. With this in mind, create a for loop that starts at the second element in the array - it should still iterate through the rest of the array.
        const currValue = array[i];
        let j = i - 1;
        while ( j >= 0 && array[j] > currValue) {
            array[j + 1] = array[j];
            j--;
            //console.log(array);
          }
          array[j + 1] = currValue;
            //console.log((j+1), array[j + 1], array);
    }
    return array;
}



// * prvo uradim ovo document.getElementsByClassName("values-dropdown") ali to nije pravi array pa zato
// uradim ovo [...document.getElementsByClassName("values-dropdown")]. tri tacke su spread.
// Onda uradim map i izbaci mi array. Ovo Number(dropdown.value) znaci da ce mi izbaciti number, a
// ne string.

// ** i pocinje od jedan (znaci drugi clan array-a). j je i-1 sto je u prvom slucaju 1-1=0.
// Posto while uslov zadovoljava onda array[j + 1] = array[j]; (drugi clan array-a = prvi clan).
// Posle toga j-- sto znaci da je u tom slucaju j=-1 i while loop vise ne vazi.
// Znaci izlazimo iz while loop-a i onda je array[j+1](j je -1, tako da je ovo array[0]) jednak currValue.