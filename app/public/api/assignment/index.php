<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT assignment.id, assignment.gameId, assignment.refereeId, gameLocation, gameDate, refereeName, assignementStatus
FROM referee, game, assignment
WHERE game.id=assignment.gameId AND referee.id=refereeId';

$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$offers = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($offers, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;