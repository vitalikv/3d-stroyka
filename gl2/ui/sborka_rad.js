

function settingSborkaRadiatorMenuUI_1(cdm)
{
	//var el = document.querySelector('[nameId="'+cdm.nameId+'"]');
	var el = document.createElement('div');
	
	var arr = [];
	arr[arr.length] = {value: 'left', text: 'подключение слева', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, side: 'left'}} }; 
	arr[arr.length] = {value: 'right', text: 'подключение справа', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, side: 'right'}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.side});


	var arr = [];
	arr[arr.length] = {value: 'none', text: 'без кранов', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, kran: 'none'}} }; 
	arr[arr.length] = {value: 'regulator', text: 'регулировочные краны', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, kran: 'regulator'}} };
	arr[arr.length] = {value: 'sharov', text: 'шаровые краны', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, kran: 'sharov'}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.kran});


	var arr = [];
	arr[arr.length] = {value: 1, text: '1 секция', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 1}} }; 
	arr[arr.length] = {value: 2, text: '2 секции', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 2}} };
	arr[arr.length] = {value: 3, text: '3 секции', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 3}} };
	arr[arr.length] = {value: 4, text: '4 секции', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 4}} }; 
	arr[arr.length] = {value: 5, text: '5 секций', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 5}} };
	arr[arr.length] = {value: 6, text: '6 секций', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 6}} };
	arr[arr.length] = {value: 7, text: '7 секций', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 7}} };
	arr[arr.length] = {value: 8, text: '8 секций', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 8}} };
	arr[arr.length] = {value: 9, text: '9 секций', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 9}} };
	arr[arr.length] = {value: 10, text: '10 секций', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, countRad: 10}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.countRad});


	var arr = [];
	arr[arr.length] = {value: 0.2, text: 'h 200', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, heightRad: 0.2}} }; 
	arr[arr.length] = {value: 0.35, text: 'h 350', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, heightRad: 0.35}} };
	arr[arr.length] = {value: 0.5, text: 'h 500', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, heightRad: 0.5}} };
	arr[arr.length] = {value: 0.6, text: 'h 600', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, heightRad: 0.6}} }; 
	arr[arr.length] = {value: 0.7, text: 'h 700', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, heightRad: 0.7}} };
	arr[arr.length] = {value: 0.8, text: 'h 800', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, heightRad: 0.8}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.heightRad});

	
	var arr = [];
	arr[arr.length] = {value: false, text: 'без терморегулятора', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, termoreg: false}} }; 
	arr[arr.length] = {value: true, text: 'с терморегулятором', fc: {name: 'activeCameraView', params: {sborka: true, typeV: cdm.typeV, termoreg: true}} };
	var idd = new SelectList_1(el, {arrList: arr, selectItem: cdm.inf.termoreg});
			
	
	//el.style.display = '';
	//el.style.display = 'none';			
	
	return { el: el };
}	



function showHideSettingsRadiator_1(cdm)
{
	if(!cdm) cdm = {};
	
	var arr = [];
		
	arr[arr.length] = infProject.list.sborka.radiator.odnotrub.verh.mp.ui.el;
	arr[arr.length] = infProject.list.sborka.radiator.odnotrub.verh_bay.mp.ui.el;
	arr[arr.length] = infProject.list.sborka.radiator.odnotrub.bok.mp.ui.el;
	arr[arr.length] = infProject.list.sborka.radiator.odnotrub.niz.mp.ui.el;
	arr[arr.length] = infProject.list.sborka.radiator.odnotrub.bok_bay.mp.ui.el;
	arr[arr.length] = infProject.list.sborka.radiator.odnotrub.niz_bay.mp.ui.el;
	
	arr[arr.length] = infProject.list.sborka.radiator.dvuhtrub.verh.mp.ui.el;
	arr[arr.length] = infProject.list.sborka.radiator.dvuhtrub.niz.mp.ui.el;
	arr[arr.length] = infProject.list.sborka.radiator.dvuhtrub.bok.mp.ui.el;
	
	var el = document.querySelector('[nameId="sborka_rad_1"]');
	el.innerHTML = '';
	
	
	for(var i = 0; i < arr.length; i++)
	{		
		//if(arr[i].style) arr[i].style.display = 'none'
		//arr[i].innerHTML = '';
	}

	if(cdm.inf)
	{
		var arr2 = [];
			
		arr2[arr2.length] = infProject.list.sborka.radiator.odnotrub.verh.mp.ui.el;
		arr2[arr2.length] = infProject.list.sborka.radiator.odnotrub.verh_bay.mp.ui.el;
		arr2[arr2.length] = infProject.list.sborka.radiator.odnotrub.bok.mp.ui.el;
		arr2[arr2.length] = infProject.list.sborka.radiator.odnotrub.niz.mp.ui.el;
		arr2[arr2.length] = infProject.list.sborka.radiator.odnotrub.bok_bay.mp.ui.el;
		arr2[arr2.length] = infProject.list.sborka.radiator.odnotrub.niz_bay.mp.ui.el;
		
		arr2[arr2.length] = infProject.list.sborka.radiator.dvuhtrub.verh.mp.ui.el;
		arr2[arr2.length] = infProject.list.sborka.radiator.dvuhtrub.niz.mp.ui.el;
		arr2[arr2.length] = infProject.list.sborka.radiator.dvuhtrub.bok.mp.ui.el;		
		
		for(var i = 0; i < arr2.length; i++)
		{		
			if(arr2[i] == cdm.inf) { console.log(2222222, cdm.inf); break; }
		}		
	}
	
	
	if(cdm.typeV)
	{
		arr[Number(cdm.typeV) - 1].style.display = '';
		el.append(arr[Number(cdm.typeV) - 1]);
	}
}










