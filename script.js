document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById("pieChart");
    var ctx = canvas.getContext("2d");
    var likeButton = document.getElementById("likeButton");
    var messageDiv = document.getElementById("message");

    // Sample data for the pie chart
    var sampleData = {
        "hot": 20,
        "beautiful": 40,
        "cute": 40
    };

    // Colors for the pie chart segments
    var colors = {
        "hot": "#ff4d4d",
        "beautiful": "#ffb380",
        "cute": "#80b3ff"
    };

    // Draw the pie chart with sample data
    drawPieChart(ctx, canvas.width / 2, canvas.height / 2, canvas.width / 3, sampleData, colors);

    // Event listener for the like button
    likeButton.addEventListener("click", function() {
        var response = confirm("Do you like my compliment?");
        if (response) {
            messageDiv.textContent = "I knew you love me!";
        }
        else {
            messageDiv.textContent = "I like you regardless!";
        }
    });
});

function drawPieChart(ctx, x, y, radius, data, colors) {
    var total = Object.values(data).reduce((acc, val) => acc + val, 0);
    var startAngle = 0;
    var endAngle;

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var percentage = data[key];
            var color = colors[key];
            endAngle = startAngle + (percentage / total) * (Math.PI * 2);

            // Calculate label position
            var midAngle = (startAngle + endAngle) / 2;
            var textX = x + (radius * Math.cos(midAngle));
            var textY = y + (radius * Math.sin(midAngle));

            // Draw pie segment
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.arc(x, y, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();

            // Draw label
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.fillText(key, textX, textY);

            startAngle = endAngle;
        }
    }
}
