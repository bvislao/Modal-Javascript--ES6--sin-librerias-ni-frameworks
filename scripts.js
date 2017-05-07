// Se obtiene el código
//let ExpresRegulars = /\?.*v=([_a-z0-9-]+)/i;
const getYoutubeVideoCode = url => {
	// let parts = url.match(ExpresRegulars);
	//console.log(parts !== null ? parts[1] : 'notfound');
    let inicio = url.indexOf("?") + 3,
		final = url.indexOf("&",inicio),
        code = final === -1 ? url.slice(inicio) : url.slice(inicio,final),
        params = url.slice(final+1);
    return final === -1 ?  `${code}?` : `${code}?${params}&`;
	//console.log(final === -1 ?  `${code}?` : `${code}?${params}&`);
};


const drawYoutubeModal = YoutubeVideoCode => {
	let modal = document.createElement('div');
	modal.id='dvModal';
	modal.classList.add('yt-modal');
	modal.innerHTML = `
	<div class="modalContent">
		<!-- Bóton Cerrar -->
		<div id="closeModal" class="yt-closeModal">X</div>
		 <!-- Modal-->
		<div class="video">
			<iframe src="https://www.youtube.com/embed/${YoutubeVideoCode}autoplay=1" frameborder="0"
			allowfullscreen></iframe>
		</div>
		
	</div>	
	`;
	document.body.appendChild(modal);
	closeModal(modal);
};

const closeModal = modalElement => {
	modalElement.querySelector("#closeModal").addEventListener('click',() =>
	{
		document.body.removeChild(modalElement);
	});
	window.addEventListener('keyup', e=>{
		if(e.key === 'Escape') modalElement.querySelector("#closeModal").click();
	});
	
};

const openYoutubeModal = selector => {
	let linksElements = [...document.querySelectorAll(selector)],
		links = linksElements.map(link=> link.href);
	linksElements.forEach((el,i) => {
		el.addEventListener('click',e =>
		{
			e.preventDefault();
			drawYoutubeModal(getYoutubeVideoCode(links[i]));
		});
	});	
	
};

openYoutubeModal('.video-yt');