<?php 
date_default_timezone_set('America/New_York');
//This builds an html page from one string that is echoed at the end




//draw calendar
function drawCalendar(){
	$htmlString = "";

	//start with style tag to format tables
	$htmlString .= 	"<style>
						table {
						    font-family: arial, sans-serif;
						    border-collapse: collapse;
						    width: 100%;
						}

						th {
						    border: 1px solid #b3b3b3;
						    background-color: #e6e6e6;
						    text-align: center;
						    padding: 8px;
						}

						td {
							border: 1px solid #b3b3b3;
						    text-align: center;
						    padding: 8px;
						}
					</style>";
	//start with first day in this year
	$thisYear = date('Y', time());
	$thisMonth = date('m', time());
	$thisDay = date('j',time());
	//today in this sense is the day we follow when drawing the calendar
	$today = mktime(0,0,0,1,1,$thisYear);

	//for each month in the year
	for ($m=0; $m<12;$m++){
		//new table with month's header
		$htmlString .= "<table>";
		$monthName=date('F',$today);
		$htmlString .= "
						<thead>
							<th colspan = \"7\" >" . $monthName . " " .  $thisYear . "</th>
						</thead>
						<tr>
						<th>Sun</th>
						<th>Mon</th>
						<th>Tue</th>
						<th>Wed</th>
						<th>Thu</th>
						<th>Fri</th>
						<th>Sat</th>
						</tr>";
		
		$daysInMonth=date('t',$today);
		//for day in month
		for ($d=0;$d<$daysInMonth;$d++){
			//if it's the first, draw leading blank cells
			$drawn = false;
			if (date('j',$today) == 1){
				//start first row
				$htmlString .= "<tr>";
				for ($w=0;$w<date('w',$today);$w++){
					$htmlString .= "<td></td>";
				}
				//then draw today
				if ((date('j',$today)==$thisDay) && (date('m',$today) == $thisMonth)){
					$htmlString .= "<td bgcolor=\"#66ffef\">" . date('j',$today) . "</td>";
				}
				else{
					$htmlString .= "<td>" . date('j',$today) . "</td>";
				}

				$drawn = true;
			}
			if (!$drawn){
				if ((date('j',$today)==$thisDay) && (date('m',$today) == $thisMonth)){
					$htmlString .= "<td bgcolor=\"#66ffef\">" . date('j',$today) . "</td>";
				}
				else{
					$htmlString .= "<td>" . date('j',$today) . "</td>";
				}
			}
			//end row if it's Saturday
			if (date('w',$today) == 6 && (date('j',$today) != $daysInMonth)){
				$htmlString .= "</tr><tr>";
			}
			//increment today
			$today = mktime(0,0,0,date('m',$today),(date('j',$today) + 1),$thisYear);
		}
		//set day back to prevent off-by-one
		$daysLeftInWeek = (6-date('w',mktime(0,0,0,date('m',$today),(date('j',$today) - 1),$thisYear)));

		//fill out last week
		for ($daysLeftInWeek; $daysLeftInWeek>0;$daysLeftInWeek--){
			$htmlString .= "<td></td>";
		}
		//close week row
		$htmlString .= "</tr>";
		$htmlString .= "</table></br>";

		$today = mktime(0,0,0,date('m',$today),1,$thisYear);
	}
	return $htmlString;
}

$drawString = drawCalendar();
echo($drawString);

?>