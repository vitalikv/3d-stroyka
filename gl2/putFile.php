<? 




$list = 'meshBSP.js 	
calculationArea.js
crossWall.js
addPoint.js
addWD.js
mouseClick.js
changeCamera.js
moveCamera.js
clickChangeWD.js
clickMovePoint.js
clickMoveWall.js
clickMoveWD.js
deleteObj.js
floor.js
detectZone.js
inputWall.js
label.js  	
clickActiveObj.js    
saveLoad.js
script.js
floorWarm.js
eventClick.js
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
objCenterPoint.js
substrate.js
groupObj.js
clickMoveTube.js
alignPoint.js
mergeObjToGroup.js
planeHeight.js
createObj/st_radiator.js
createObj/al_radiator.js
createObj/helpT.js
createObj/calculation_1.js
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




for ($i = 0; $i < count($arrF); $i++)
{	
	if (preg_match('#\b'.$arrF[$i].'\b#Us', 'renderCamera')) 
	{
		echo "Пропускаем <br>". $arrF[$i]."<br><br>";
	}
	else if (preg_match('#\b'.$arrF[$i].'\b#Us', 'showHideLabelSizeWall')) 
	{
		echo "Пропускаем <br>". $arrF[$i]."<br><br>";
	}
	else if (preg_match('#\b'.$arrF[$i].'\b#Us', 'blockKeyCode')) 
	{
		echo "Пропускаем <br>". $arrF[$i]."<br><br>";
	}		
	else 
	{
		$file2 = preg_replace('#\b'.$arrF[$i].'\b#Us','fname_s_0'.($i+1),$file2);	// 	\b - границы слова	
	}	
}



$newFile = fopen('t/test.js', 'w');
fwrite($newFile, $file2);
fclose($newFile);


echo 11;


