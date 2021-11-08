<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT distinct refereeName, gameLocation, gameDate from assignment, game, referee 
        where (gameDate > "2021-10-11 00:00:00" AND gameDate < "2021-11-15 00:00:00") AND referee.id = assignment.refereeId';

$startDate = '2021-11-11 00:00:00';
$endDate = '2021-11-15 00:00:00';

$stmt = $db->prepare($sql);
//$stmt->bind_param("ss", $startDate, $endDate);
$stmt->execute();
$offers = $stmt->fetchAll();

// Step 4: Output

if (isset($_GET['format']) && $_GET['format'] == 'csv' ) {
    header('Content-Type: text/csv');
    //echo "Name,Username,\"Max Salary\",\"Count of Offers\"\r\n";

    foreach($offers as $o) {
        echo "";
    }

} else {
    $json = json_encode($offers, JSON_PRETTY_PRINT);

    header('Content-Type: application/json');
    echo $json;
}