# About

This is an application that allows you to interact with a toy robot on a 5x5 table top.
The valid commands are `PLACE X,Y,F`, where X and Y are coordinates and F is a compass direction i.e NORTH, SOUTH, EAST and WEST.
`RIGHT` will rotate robot clockwise 90 degrees.
`LEFT` will rotate robot anti-clockwise 90 degrees.
`MOVE` will move the robot forward one square.
`REPORT` will print the position and the direction the robot is facing on the table.

### How to run application

To run the application using console as input run `npm run start`
To run the application using a file as input run `npm run start <path-to-input-file>`
