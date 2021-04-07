<? 




$list = 'meshBSP.js
eventClick.js 	
calculationArea.js
crossWall.js
addPoint.js
addWD.js
mouseClick.js
changeCamera.js
cameraView.js
moveCamera.js
clickChangeWD.js
clickMovePoint.js
clickMoveWall.js
clickMoveWD.js
deleteObj.js
copyObj.js
floor.js
detectZone.js
inputWall.js
label.js  	   
saveLoad.js
script.js
floorWarm.js
clickMovePivot.js
clickObj.js
clickMoveGizmo.js
activePivotGizmo.js
scaleBox.js
loadObj.js
uiInterface_obj.js
uiInterface_wf.js
uiInterface_plane.js
uiInterface_list_obj.js
uiInterface_catalog.js
uiInterface_user_1.js
objCenterPoint.js
substrate.js
groupObj.js
clickMoveTube.js
alignPoint.js
mergeObjToGroup.js
planeHeight.js
createObj/radiator/st_radiator.js
createObj/radiator/al_radiator.js
createObj/st/sgon.js
createObj/st/nippel.js
createObj/st/zaglushka.js
createObj/st/troinik.js
createObj/st/ugol.js
createObj/st/mufta.js
createObj/st/krestovina.js
createObj/st/collector.js
createObj/pl/troinik.js
createObj/pl/ugol.js
createObj/pl/mufta.js
createObj/pl/krestovina.js
createObj/mpl/troinik.js
createObj/mpl/perehod.js
createObj/mpl/ugol.js
createObj/kran/shar_kran.js
createObj/kran/reg_kran.js
createObj/kotel/zr_nasos.js
createObj/kotel/rash_bak.js
createObj/kotel/gr_bez.js
createObj/kotel/filtr.js
createObj/kotel/kotel_1.js
createObj/calculation_1.js
createObj/calculation_2.js
ui/select_list_1.js
ui/slider_2mov.js
createObj/sborka/sbr_1.js
createObj/sborka/radiator/rad_1.js
createObj/sborka/radiator/niz_mp.js
createObj/sborka/radiator/verh_mp.js
createObj/sborka/radiator/bok_mp.js
';


$arrF = array();
$arr = explode(".js", $list);
$file2 = '';

for ($i = 0; $i < count($arr); $i++)
{
	$arr[$i] = trim($arr[$i]).'.js';
}



// объединяем все файлы в один test.js
for ($i = 0; $i < count($arr)-1; $i++)
{
	echo $arr[$i].'<br>';
	$file = file_get_contents($arr[$i]);
	
	$file = preg_replace("|console.log\((.*)\);|i","",$file);
	$file = preg_replace("|console.trace\((.*)\);|i","",$file);
	$file2 .= $file;


	preg_match_all('|function\s*(\w+)\s*\((.*)\)|Usi', $file, $arr2); 
	
	for ($i2 = 0; $i2 < count($arr2[1]); $i2++)
	{
		$arrF[] = $arr2[1][$i2];
	}	
}


$file2 = preg_replace('#(\/\/(.*?)(\n|$|\r|(\r\n)))|(\/\*(.*?)\*\/)#i','',$file2);	// удаляем комменты


echo "<br><br>-----------<br><br>";

$nameStop = [];
$nameStop[] = 'renderCamera';
$nameStop[] = 'blockKeyCode';
$nameStop[] = 'setImgCompSubstrate';
$nameStop[] = 'createTubeWF_1';
$nameStop[] = 'al_zagl_radiator_1';
$nameStop[] = 'rad_vozduhotvod_1';
$nameStop[] = 'al_radiator_1';
$nameStop[] = 'st_radiator_1';
$nameStop[] = 'reg_kran_primoy_1';
$nameStop[] = 'cr_zr_nasos_1';
$nameStop[] = 'cr_rash_bak_1';
$nameStop[] = 'cr_kotel_1';
$nameStop[] = 'gr_bez_1';
$nameStop[] = 'st_pol_sgon_1';
$nameStop[] = 'filtr_kosoy_1';
$nameStop[] = 'st_krestovina_1';
$nameStop[] = 'st_troinik_1';
$nameStop[] = 'st_ugol_90_1';
$nameStop[] = 'st_ugol_45_1';
$nameStop[] = 'st_nippel_1';
$nameStop[] = 'st_zagl_nr';
$nameStop[] = 'st_mufta_1';
$nameStop[] = 'pl_ugol_90_1';
$nameStop[] = 'pl_ugol_45_1';
$nameStop[] = 'pl_ugol_90_rezba_1';
$nameStop[] = 'pl_mufta_1';
$nameStop[] = 'pl_perehod_rezba_1';
$nameStop[] = 'pl_troinik_1';
$nameStop[] = 'pl_troinik_2';
$nameStop[] = 'pl_troinik_rezba_1';
$nameStop[] = 'pl_krestovina_1';
$nameStop[] = 'mpl_perehod_rezba_1';
$nameStop[] = 'mpl_perehod_1';
$nameStop[] = 'mpl_troinik_1';
$nameStop[] = 'mpl_troinik_rezba_1';
$nameStop[] = 'mpl_ugol_1';
$nameStop[] = 'mpl_ugol_rezba_1';
$nameStop[] = 'shar_kran_n_1';
$nameStop[] = 'shar_kran_v_1';
$nameStop[] = 'shar_kran_v_n_1';
$nameStop[] = 'shar_kran_sgon_1';
$nameStop[] = 'st_collector_1';



for ($i = 0; $i < count($arrF); $i++)
{	
	$rename = true;
	for ($i2 = 0; $i2 < count($nameStop); $i2++)
	{
		if (preg_match('#\b'.$arrF[$i].'\b#Us', $nameStop[$i2]))
		{
			$rename = false;
			echo "Пропускаем ". $arrF[$i]."<br>";
			break;
		}
	}
	
	if($rename)
	{
		$file2 = preg_replace('#\b'.$arrF[$i].'\b#Us','xdr_inf_0'.($i+1),$file2);	// 	\b - границы слова
	}	
}



$newFile = fopen('t/test.js', 'w');
fwrite($newFile, $file2);
fclose($newFile);


echo 11;


