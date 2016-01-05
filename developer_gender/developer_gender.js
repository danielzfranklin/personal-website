google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function google_packages_loaded(){
    var data_section = document.getElementById("data-section");

    Object.keys(data)
        .map(function(key){
            return {
                "name": key,
                "value": data[key]
            };
        })
        .forEach(function(item){
            // this is a category such as 'By Country'
            var new_section = document.createElement("div");
            new_section.classList.add("category");
            var header = document.createElement("h2");
            header.innerText = item.name;
            new_section.appendChild(header);
            data_section.appendChild(new_section);

            Object.keys(item.value)
                .sort()
                .forEach(function(category_item_name){
                    // if category is 'By County' category_item_name is 'United States'
                    var chart_elem = document.createElement("div");
                    chart_elem.classList.add("chart");
                    new_section.appendChild(chart_elem);

                    var as_array = [["Gender", "Category"]]
                        .concat(Object.keys(item.value[category_item_name])
                            .map(function(gender_name){
                                return [gender_name, item.value[category_item_name][gender_name]];
                            })
                        );
                    data = google.visualization.arrayToDataTable(as_array);
                    var chart = new google.visualization.PieChart(chart_elem);
                    chart.draw(data, {
                        title: category_item_name,
                        legend: {
                            position: "none"
                        },
                        pieSliceText: "label"
                    });
                });
        });
});
