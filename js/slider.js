$(document).ready(function(){
	var imgItems = $('.slider li').length; // Numero de Slides
	var imgPos = 1;

	// Agregando paginacion --
	for(i = 1; i <= imgItems; i++){
		$('.pagination_dot').append('<li><span class="fa fa-circle"></span></li>');
	}
	//------------------------

	$('.slider li').hide(); // Ocultanos todos los slides
	$('.slider li:first').show(); // Mostramos el primer slide
	$('.pagination_dot li:first').css({'color': '#FA4D67'}); // Damos estilos al primer item de la paginacion

	// Ejecutamos todas las funciones
	$('.pagination_dot li').click(pagination);
	$('.right span').click(nextSlider);
	$('.left span').click(prevSlider);


	setInterval(function(){
		nextSlider();
	}, 8000);

	// FUNCIONES =========================================================

	function pagination(){
		var paginationPos = $(this).index() + 1; // Posicion de la paginacion seleccionada

		$('.slider li').hide(); // Ocultamos todos los slides
		$('.slider li:nth-child('+ paginationPos +')').fadeIn(); // Mostramos el Slide seleccionado

		// Dandole estilos a la paginacion seleccionada
		$('.pagination_dot li').css({'color': 'rgba(44,44,51,.8)'});
		$(this).css({'color': '#FA4D67'});

		imgPos = paginationPos;

	}

	function nextSlider(){
		if( imgPos >= imgItems){imgPos = 1;}
		else {imgPos++;}

		$('.pagination_dot li').css({'color': 'rgba(44,44,51,.8)'});
		$('.pagination_dot li:nth-child(' + imgPos +')').css({'color': '#FA4D67'});

		$('.slider li').hide(); // Ocultamos todos los slides
		$('.slider li:nth-child('+ imgPos +')').fadeIn(); // Mostramos el Slide seleccionado

	}

	function prevSlider(){
		if( imgPos <= 1){imgPos = imgItems;}
		else {imgPos--;}

		$('.pagination_dot li').css({'color': 'rgba(44,44,51,.8)'});
		$('.pagination_dot li:nth-child(' + imgPos +')').css({'color': '#FA4D67'});

		$('.slider li').hide(); // Ocultamos todos los slides
		$('.slider li:nth-child('+ imgPos +')').fadeIn(); // Mostramos el Slide seleccionado
	}

});


// Collapsible boxes

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
