const livePhotos = () => {


  const commandPhoto = document.querySelectorAll('.command__photo');

  commandPhoto.forEach((item) => {
    const lastImg = item.getAttribute('src');
    item.addEventListener('mouseenter', (event) => {

      const target = event.target;
      target.src = target.dataset.img;
      //event.target.src = event.target.dataset.img; // смена картинки
    });


    item.addEventListener('mouseleave', (event) => {

      const target = event.target;

      target.src = lastImg;
      //event.target.src = newImg; 
    });

  });
};

export default livePhotos;