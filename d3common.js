function packData(p) {
    var data = p;
    var result = {
        title: data.datasets[0].label,
        data: []
    };

    data.labels.forEach(function (v) {
        result.data.push({
            label: v
        });
    });

    result.data.forEach(function (v, i) {
        v.value = data.datasets[0].data[i];

        if (data.datasets[0].backgroundColor) {
            v.backgroundColor = data.datasets[0].backgroundColor[i];
        }

        if (data.extras) {
            for (var attrname in data.extras[i]) {
                v[attrname] = data.extras[i][attrname];
            }
        }
    });

    return result;

}
