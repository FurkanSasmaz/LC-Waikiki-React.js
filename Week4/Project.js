const image_Container = document.querySelector('.container');
//Using querySelector, we selected the 'container' class and assigned it to the image Container variable that we want to keep constant.


const image_URL = "https://source.unsplash.com/random/300*300";
//We have defined the URL where we can get images randomly with the size of 300x300.

const rows = 5; //We have 5 rows.

for(let i = 0; i < rows * 3; i++){ 
    //Let the total loop loop 3 times by using for-loop
    const image = document.createElement('img'); //By using createElement we created img         
    image.src = `${image_URL}${getRandomSize()}`;      
    image_Container.appendChild(image); //By using appendChil we added new image.
}
function getRandomSize(){  
    return `${getRandomNum()}x${getRandomNum()}`;// we got the matrix of the images.
}
function getRandomNum(){
    return Math.floor(Math.random() * 5); // We returned an integer between 0 and 5.
}
