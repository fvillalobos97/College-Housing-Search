// Sherri Lin Felicia Villalobos
// create a variable to store the products 'database' in
var products;

// use fetch to retrieve it, and report any errors that occur in the fetch operation
// once the products have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
fetch('houses.json').then(function(response) {
  if(response.ok) {
    response.json().then(function(json) {
      products = json;
      initialize();
    });
  } else {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  }
});

// sets up the app logic, declares required variables, contains all the other functions
function initialize() {

  // grab the UI elements that we need to manipulate
  var area_campus = document.querySelector('#area_campus');
  var accessibility = document.querySelector('#accessibility');
  var elevator_house = document.querySelector('#elevator_house');
  var searchTerm = document.querySelector('#searchTerm');
  var searchBtn = document.querySelector('button');
  var main = document.querySelector('main');

  // keep a record of what the last category and search term entered were
  var last_area = area_campus.value;
  var last_access = accessibility.value;
  var last_elevator = elevator_house.value;
  var lastSearch = searchTerm.value;

  // these contain the results of filtering by category, and search term
  // finalGroup will contain the products that need to be displayed after
  // the searching has been done. Each will be an array containing objects.
  // Each object will represent a product
  var categoryGroupArea;
  var categoryGroupAccess;
  var categoryGroupElevator;
  var finalGroup;

  // To start with, set finalGroup to equal the entire products database
  // then run updateDisplay(), so ALL products are displayed initially.
  finalGroup = products;
  updateDisplay();

  // Set both to equal an empty array, in time for searches to be run
  categoryGroupArea = [];
  categoryGroupAccess = [];
  categoryGroupElevator = [];
  finalGroup = [];

  // when the search button is clicked, invoke selectCategory() to start
  // a search running to select the category of products we want to display
  searchBtn.onclick = selectCategory;

  function selectCategory(e) {

    // Use preventDefault() to stop the form submitting — that would ruin
    // the experience
    e.preventDefault();

    // Set these back to empty arrays, to clear out the previous search
    categoryGroupArea = [];
    categoryGroupAccess= [];
    categoryGroupElevator = [];
    finalGroup = [];


    // if the category and search term are the same as they were the last time a
    // search was run, the results will be the same, so there is no point running
    // it again — just return out of the function
    if(area_campus.value === last_area && searchTerm.value === lastSearch && accessibility.value === last_access && elevator_house.value === last_elevator) {
      return;
    }
    else {
      // update the record of last category and search term
      last_area = area_campus.value;
      last_access = accessibility.value;
      last_elevator = elevator_house.value;
      lastSearch = searchTerm.value;

      // In this case we want to select all products, then filter them by the search
      // term, so we just set categoryGroup to the entire JSON object, then run selectProducts()
      if(area_campus.value === 'All') {
        categoryGroupArea = products;
        selectProducts();
      // If a specific category is chosen, we need to filter out the products not in that
      // category, then put the remaining products inside categoryGroup, before running
      // selectProducts()
      }
      else {
        // the values in the <option> elements are uppercase, whereas the categories
        // store in the JSON (under "type") are lowercase. We therefore need to convert
        // to lower case before we do a comparison
        var lowerCaseType1 = area_campus.value.toLowerCase();

        for(var i = 0; i < products.length ; i++) {
          // If a product's type property is the same as the chosen category, we want to
          // dispay it, so we push it onto the categoryGroup array
          if(products[i].area.toLowerCase() === lowerCaseType1) {
            categoryGroupArea.push(products[i]);
          }
        }

        // Run selectProducts() after the filtering has bene done
        selectProducts();
      }

      if(accessibility.value === 'All') {
        categoryGroupAccess = products;
        selectProducts();
      // If a specific category is chosen, we need to filter out the products not in that
      // category, then put the remaining products inside categoryGroup, before running
      // selectProducts()
      }
        else {
        // the values in the <option> elements are uppercase, whereas the categories
        // store in the JSON (under "type") are lowercase. We therefore need to convert
        // to lower case before we do a comparison
        var lowerCaseType2 = accessibility.value.toLowerCase();
        for(var i = 0; i < products.length ; i++) {
          // If a product's type property is the same as the chosen category, we want to
          // dispay it, so we push it onto the categoryGroup array
          if(products[i].accessible === lowerCaseType2) {
            categoryGroupAccess.push(products[i]);
          }
        }


        // Run selectProducts() after the filtering has bene done
        selectProducts();
      }

      if(elevator_house.value === 'All') {
        categoryGroupElevator = products;

        selectProducts();
      // If a specific category is chosen, we need to filter out the products not in that
      // category, then put the remaining products inside categoryGroup, before running
      // selectProducts()
      }

      else {
        // the values in the <option> elements are uppercase, whereas the categories
        // store in the JSON (under "type") are lowercase. We therefore need to convert
        // to lower case before we do a comparison
        var lowerCaseType3 = elevator_house.value.toLowerCase();
        for(var i = 0; i < products.length ; i++) {
          // If a product's type property is the same as the chosen category, we want to
          // dispay it, so we push it onto the categoryGroup array

          if(products[i].elevator === lowerCaseType3) {
            categoryGroupElevator.push(products[i])
          }
        }

        // Run selectProducts() after the filtering has bene done
        selectProducts();
      }
    }
  }



  // selectProducts() Takes the group of products selected by selectCategory(), and further
  // filters them by the tnered search term (if one has bene entered)
  function selectProducts() {

    // If no search term has been entered, just make the finalGroup array equal to the categoryGroup
    // array — we don't want to filter the products further — then run updateDisplay().

    var group1group2 = [];
    var allGroups = [];

    if(categoryGroupArea.length > categoryGroupAccess.length) {

      for(var i = 0; i < categoryGroupArea.length; i++){
      if(categoryGroupAccess.indexOf(categoryGroupArea[i]) > -1) {
        group1group2.push(categoryGroupArea[i]);
      }
    }
    console.log(group1group2);
  }

    else{
      for(var i = 0; i < categoryGroupAccess.length; i++){
      if(categoryGroupArea.indexOf(categoryGroupAccess[i]) > -1) {
        group1group2.push(categoryGroupAccess[i]);
      }
    }
    }

    if(categoryGroupElevator.length > group1group2.length) {
      for(var i = 0; i < categoryGroupElevator.length; i++){
      if(group1group2.indexOf(categoryGroupElevator[i]) > -1) {
        allGroups.push(categoryGroupElevator[i]);
      }
    }
  }
    else{
      for(var i = 0; i < group1group2.length; i++){
      if(categoryGroupElevator.indexOf(group1group2[i]) > -1) {
        allGroups.push(group1group2[i]);
      }
    }

  }

    if(searchTerm.value === '') {

      finalGroup = allGroups;

      updateDisplay();

    } else {
      // Make sure the search term is converted to lower case before comparison. We've kept the
      // product names all lower case to keep things simple
      var lowerCaseSearchTerm = searchTerm.value.toLowerCase();
      // For each product in categoryGroup, see if the search term is contained inside the product name
      // (if the indexOf() result doesn't return -1, it means it is) — if it is, then push the product
      // onto the finalGroup array
      for(var i = 0; i < allGroups.length ; i++) {
        if(allGroups[i].name.toLowerCase().indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(allGroups[i]);

        }

      }

      // run updateDisplay() after this second round of filtering has been done

      updateDisplay();
    }


  }

  // start the process of updating the display with the new set of products
  function updateDisplay() {
    // remove the previous contents of the <main> element
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    // if no products match the search term, display a "No results to display" message
    if(finalGroup.length === 0) {
      var para = document.createElement('p');
      para.textContent = 'No results to display!';
      main.appendChild(para);
    // for each product we want to display, pass its product object to fetchBlob()
    } else {
      for(var i = 0; i < finalGroup.length; i++) {
        fetchBlob(finalGroup[i]);
      }
    }
  }

  // fetchBlob uses fetch to retrieve the image for that product, and then sends the
  // resulting image display URL and product object on to showProduct() to finally
  // display it
  function fetchBlob(product) {
    // construct the URL path to the image file from the product.image property
    var url = 'images/' + product.image;
    var houseName = "" + product.name;
    // Use fetch to fetch the image, and convert the resulting response to a blob
    // Again, if any errors occur we report them in the console.
    fetch(url).then(function(response) {
      if(response.ok) {
        response.blob().then(function(blob) {
          // Convert the blob to an object URL — this is basically an temporary internal URL
          // that points to an object stored inside the browser
          objectURL = URL.createObjectURL(blob);
          // invoke showProduct
          showProduct(objectURL, product);
        });
      } else {
        console.log('Network request for "' + product.name + '" image failed with response ' + response.status + ': ' + response.statusText);
      }
    });
  }

  // Display a product inside the <main> element
  function showProduct(objectURL, product) {
    // create <section>, <h2>, <p>, and <img> elements
    var section = document.createElement('section');
    var heading = document.createElement('h2');
    var para = document.createElement('p');
    var image = document.createElement('img');

    // give the <section> a classname equal to the product "type" property so it will display the correct icon
    section.setAttribute('class', product.type);

    // Give the <h2> textContent equal to the product "name" property, but with the first character
    // replaced with the uppercase version of the first character
    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
    para.textContent = 'Year Built: ' + product.year_built + ' Year Renovated: ' + product.year_renovated + ' Area: ' + product.area + ' Capacity: ' + product.capacity + ' Singles: ' +  product.singles + ' Doubles: ' + product.doubles + ' Triples: ' + product.triples + ' Num Sharing Bathroom ' + product.num_sharing_bathrm + ' Accessible: ' + product.accessible + ' Elevator: ' + product.elevator;

    // Give the <p> textContent equal to the product "price" property, with a $ sign in front
    // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
    // as 1.40, not 1.4.
    // para.textContent = '$' + product.price.toFixed(2);

    // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
    image.src = objectURL;
    image.alt = product.name;

    // append the elements to the DOM as appropriate, to add the product to the UI
    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
  }
}
